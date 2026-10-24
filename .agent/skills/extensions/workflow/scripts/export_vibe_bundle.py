#!/usr/bin/env python3
"""Export the complete 42-skill JobFind project kit to a new directory."""
import argparse,hashlib,json,os,tempfile,re
from pathlib import Path

def checked(path):
    path=Path(path).absolute()
    for p in (path,*path.parents):
        if p.is_symlink():raise ValueError('Symlink path refused: '+str(p))
    return path
def seed_root():
    own=Path(__file__).resolve().parents[1]
    embedded=own/'assets/vibe-project'
    if embedded.is_dir():return embedded
    for ancestor in Path(__file__).resolve().parents:
        if (ancestor/'.agent/skill-registry.json').is_file():return ancestor
    raise ValueError('Project kit assets/registry not found')
def assemble_resources(files,source):
    own=Path(__file__).resolve().parents[1]
    registry=json.loads(files['.agent/skill-registry.json'])
    missing=[row for row in registry['skills'] if row['project_path']+'/SKILL.md' not in files]
    manifest_path=own/'references/reference-packs.json'
    images=[]
    if manifest_path.is_file():
        images=json.loads(manifest_path.read_text())['images']
    missing_images=[row for row in images if row['output'] not in files]
    if not missing and not missing_images:return files
    peers={}
    for p in own.parent.glob('*/SKILL.md'):
        checked(p)
        match=re.search(r'^name:\s*([a-z0-9-]+)\s*$',p.read_text(),re.M)
        if match:
            if match[1] in peers:raise ValueError('Duplicate skill '+match[1])
            peers[match[1]]=p.parent
    aliases={row['chatgpt_name']:row['local_name'] for row in registry['skills']}
    def localize(value):
        for old,new in sorted(aliases.items(),key=lambda row:len(row[0]),reverse=True):
            value=re.sub(r'(?<![\w-])'+re.escape(old)+r'(?![\w-])',new,value)
        return value
    for row in missing:
        name=row['chatgpt_name']
        if name not in peers:raise ValueError('Install required peer skill before export: '+name)
        root=peers[name]
        for p in sorted(root.rglob('*')):
            rel=p.relative_to(root)
            if '__pycache__' in p.parts:continue
            # Original images are assembled once under .stitch, not duplicated
            # inside every exported skill or nested seed.
            if rel.parts[:2]==('assets','stitch-reference'):continue
            if name=='jobfind-workflow' and rel.parts[0]=='assets':continue
            checked(p)
            if not p.is_file():continue
            value=p.read_bytes()
            if p.suffix in ['.md','.yaml']:value=(localize(value.decode('utf-8')).rstrip()+'\n').encode('utf-8')
            files[row['project_path']+'/'+rel.as_posix()]=value
        if name=='jobfind-workflow':
            key=row['project_path']+'/SKILL.md'
            value=files[key].decode('utf-8').split('## Thiết lập bộ dự án đầy đủ')[0]
            value+='\n## Bộ trong source\nĐọc .agent/skill-registry.md, .docs/INDEX.md và .stitch/backlog.json ở root. Tài liệu đã bootstrap; không cần nạp seed lặp. Exporter có thể xuất resources project sang thư mục mới, không xuất application code. Công cụ kiểm tra ở .agent/scripts.\n'
            files[key]=value.encode('utf-8')
    for row in missing_images:
        if row['owner'] not in peers:raise ValueError('Missing reference owner '+row['owner'])
        p=checked(peers[row['owner']]/row['asset'])
        value=p.read_bytes()
        if hashlib.sha256(value).hexdigest()!=row['sha256']:raise ValueError('Original image integrity mismatch '+row['screen_id'])
        files[row['output']]=value
    return files

def build(out,apply=False,parent=None):
    # parent argument retained only for prior callers; current version exports a
    # consistent embedded snapshot rather than mixing partially updated skills.
    source=checked(seed_root());target=checked(out)
    if target.exists() and (not target.is_dir() or any(target.iterdir())):raise ValueError('Choose a new or empty output directory')
    files={}
    for prefix in ['.agent','.docs','.stitch','tools']:
        folder=source/prefix
        if not folder.exists():continue
        for p in sorted(folder.rglob('*')):
            if '__pycache__' in p.parts:continue
            checked(p)
            if p.is_file():files[p.relative_to(source).as_posix()]=p.read_bytes()
    for name in ['AGENTS.md','.aiignore','README.md','jobfind-kit.json']:
        p=source/name
        if p.is_file():files[name]=checked(p).read_bytes()
    if 'README.md' not in files and '.agent/PROJECT_KIT_README.md' in files:files['README.md']=files['.agent/PROJECT_KIT_README.md']
    for name in ['install','verify_bundle']:
        dest='tools/'+name+'.py'
        if dest not in files:
            script='install_kit' if name=='install' else name
            files[dest]=('#!/usr/bin/env python3\nimport runpy,sys\nfrom pathlib import Path\np=Path(__file__).resolve().parents[1]/".agent/scripts"\nsys.path.insert(0,str(p))\nrunpy.run_path(str(p/"'+script+'.py"),run_name="__main__")\n').encode()
    files=assemble_resources(files,source)
    registry=json.loads(files['.agent/skill-registry.json'])
    if len(registry['skills'])!=42:raise ValueError('Expected complete 42-skill snapshot')
    for row in registry['skills']:
        if row['project_path']+'/SKILL.md' not in files:raise ValueError('Missing skill '+row['chatgpt_name'])
    manifest={'format':3,'name':'JobFind-vibe-coding-complete','snapshot_date':'2026-10-05','skills':42,
              'files':[{'path':p,'bytes':len(d),'sha256':hashlib.sha256(d).hexdigest()} for p,d in sorted(files.items())]}
    files['bundle-manifest.json']=(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n').encode()
    if apply:
        target.mkdir(parents=True,exist_ok=True)
        for rel,data in files.items():
            p=checked(target/rel);p.parent.mkdir(parents=True,exist_ok=True)
            # Exclusive create; preserve anything concurrently created.
            with p.open('xb') as stream:stream.write(data)
    return {'out':str(target),'files':len(files),'skills':42,'bytes':sum(map(len,files.values())),'applied':apply}
def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--out',required=True);p.add_argument('--apply',action='store_true')
    a=p.parse_args()
    try:r=build(a.out,a.apply)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:p.error(str(e))
    print(json.dumps(r,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
