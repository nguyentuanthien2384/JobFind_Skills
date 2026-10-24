#!/usr/bin/env python3
"""Path and evidence helpers; stdlib only, no network or environment file reads."""
from pathlib import Path, PurePosixPath
import hashlib,json,os,tempfile

def safe(root,relative):
    root=Path(root).absolute()
    for ancestor in (root,*root.parents):
        if ancestor.is_symlink():raise ValueError('Symlink root/ancestor refused: '+str(ancestor))
    value=PurePosixPath(str(relative))
    if value.is_absolute() or not value.parts or '..' in value.parts or '\\' in str(relative):
        raise ValueError('Unsafe relative path: '+str(relative))
    path=root
    for part in value.parts:
        path=path/part
        if path.is_symlink():raise ValueError('Symlink refused: '+str(path))
    if not path.is_relative_to(root):raise ValueError('Path escaped root')
    return path

def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def atomic(path,data,replace=False):
    path=Path(path).absolute()
    for p in (path,*path.parents):
        if p.is_symlink():raise ValueError('Symlink write refused')
    if path.exists() and not replace:raise ValueError('Output exists: '+str(path))
    path.parent.mkdir(parents=True,exist_ok=True)
    if isinstance(data,str):data=data.encode('utf-8')
    fd,temp=tempfile.mkstemp(prefix='.jobfind-write-',dir=path.parent)
    try:
        with os.fdopen(fd,'wb') as stream:stream.write(data)
        if replace:os.replace(temp,path)
        else:
            os.link(temp,path) # exclusive creation even if another process writes
            os.unlink(temp)
    finally:
        if os.path.exists(temp):os.unlink(temp)

def json_text(data):return json.dumps(data,ensure_ascii=False,indent=2)+'\n'
def load(root,relative):return json.loads(safe(root,relative).read_text(encoding='utf-8'))
def root_default():return Path(__file__).resolve().parents[2]
