#!/usr/bin/env python3
"""Verify the portable suite and optional source mapping without running app tests."""
import argparse,json,re
from pathlib import Path
from kit_utils import safe,digest,root_default,load
from check_screen_coverage import check

def verify(kit,project=None):
    root=Path(kit).absolute();r=check(root,project);errors=r['errors']
    registry=load(root,'.agent/skill-registry.json');names=set();count=0
    for row in registry['skills']:
        p=safe(root,row['project_path']+'/SKILL.md')
        if not p.is_file():errors.append('Missing skill '+row['chatgpt_name']);continue
        data=p.read_text(encoding='utf-8');m=re.search(r'^name:\s*([a-z0-9-]+)\s*$',data,re.M)
        if not m or m[1]!=row['local_name']:errors.append('Bad skill name '+str(p));continue
        if m[1] in names:errors.append('Duplicate local skill '+m[1])
        names.add(m[1]);count+=1
        y=safe(root,row['project_path']+'/agents/openai.yaml')
        if not y.is_file() or '$'+m[1] not in y.read_text(encoding='utf-8'):errors.append('Missing explicit default_prompt '+m[1])
    actual=[p for p in safe(root,'.agent/skills').rglob('SKILL.md') if '__pycache__' not in p.parts]
    if count!=42 or len(actual)!=42:errors.append('Expected exactly 42 registered skills')
    for p in root.rglob('*'):
        if '__pycache__' in p.parts or '.git' in p.parts:continue
        if p.is_symlink():errors.append('Symlink in bundle '+str(p));continue
        if not p.is_file() or p.suffix!='.md':continue
        for dest in re.findall(r'(?<!!)\[[^\]]*\]\(([^)]+)\)',p.read_text(encoding='utf-8')):
            if dest.startswith(('http:','https:','app:','sandbox:','#','mailto:')) or '<' in dest:continue
            dest=dest.split('#',1)[0]
            # Path-like code placeholders are explanatory rather than file links.
            if not dest:continue
            target=(p.parent/dest).resolve()
            if not target.is_relative_to(root) or not target.exists():errors.append('Broken local link '+p.relative_to(root).as_posix()+' -> '+dest)
    manifest=root/'bundle-manifest.json'
    if manifest.is_file():
        for row in load(root,'bundle-manifest.json')['files']:
            p=safe(root,row['path'])
            if not p.is_file() or digest(p)!=row['sha256']:errors.append('Manifest mismatch '+row['path'])
    r.update({'skills':count,'workflows':len(list(safe(root,'.agent/workflows').glob('*.md'))),
              'templates':len(list(safe(root,'.agent/templates').glob('*.md'))),'errors':sorted(set(errors))})
    return r

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--kit',default=str(root_default()));p.add_argument('--project')
    a=p.parse_args()
    try:r=verify(a.kit,a.project)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:p.error(str(e))
    print(json.dumps(r,ensure_ascii=False,indent=2))
    if r['errors']:raise SystemExit(1)
if __name__=='__main__':main()
