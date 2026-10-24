#!/usr/bin/env python3
"""Archive current context intact; optionally replace it with sanitized notes."""
import argparse,json,re
from datetime import datetime,timezone
from pathlib import Path
from kit_utils import safe,root_default,atomic,digest

def checkpoint(kit,notes=None,apply=False):
    current=safe(kit,'.docs/CONTEXT.md')
    if not current.is_file():raise ValueError('CONTEXT.md missing')
    text=None
    if notes:
        n=Path(notes).absolute()
        if n.is_symlink() or n.name.startswith('.env') or n.suffix.lower() not in ['.md','.txt']:raise ValueError('Use sanitized markdown/text notes')
        text=n.read_text(encoding='utf-8')
        if re.search(r'-----BEGIN .*PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]+\.|(?:password|access_token|refresh_token)\s*[:=]\s*[\"\x27]?[^\s<]{8,}',text,re.I):
            raise ValueError('Notes appear to contain a credential value; redact before saving')
    sha=digest(current);stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    rel=f'.docs/archive/{stamp}-{sha[:8]}/CONTEXT.md';target=safe(kit,rel)
    if apply:
        atomic(target,current.read_bytes())
        if digest(target)!=sha:raise ValueError('Archive integrity check failed')
        line=json.dumps({'at':stamp,'context_sha256':sha,'archive':rel,'replaced':text is not None},ensure_ascii=False)+'\n'
        index=safe(kit,'.docs/archive/index.jsonl')
        old=index.read_text() if index.exists() else ''
        atomic(index,old+line,replace=index.exists())
        if text is not None:atomic(current,text+'\n\nArchive trước phiên: `'+rel+'`\n',replace=True)
    return {'archive':rel,'context_sha256':sha,'replaced':text is not None,'applied':apply}

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--kit',default=str(root_default()));p.add_argument('--notes');p.add_argument('--apply',action='store_true')
    a=p.parse_args()
    try:r=checkpoint(a.kit,a.notes,a.apply)
    except (ValueError,OSError) as e:p.error(str(e))
    print(json.dumps(r,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
