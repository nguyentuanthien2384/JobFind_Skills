#!/usr/bin/env python3
"""Preview or install .agent/.docs/.stitch; conflicts stop before any write."""
import argparse,json,sys
from pathlib import Path
from kit_utils import safe,digest,atomic,root_default,load

def plan(source,project):
    source=Path(source).absolute();project=Path(project).absolute()
    for f in ['frontend/package.json','backend/package.json','microservices/package.json']:
        if not safe(project,f).is_file():raise ValueError('Not a JobFind source root: '+f)
    manifest=source/'bundle-manifest.json'
    if manifest.is_file():
        items=load(source,'bundle-manifest.json')['files']
        for row in items:
            p=safe(source,row['path'])
            if not p.is_file() or digest(p)!=row['sha256']:raise ValueError('Source manifest mismatch: '+row['path'])
    else:
        items=[]
        for prefix in ['.agent','.docs','.stitch']:
            for p in sorted(safe(source,prefix).rglob('*')):
                if '__pycache__' in p.parts:continue
                if p.is_symlink():raise ValueError('Source symlink refused')
                if p.is_file():items.append({'path':p.relative_to(source).as_posix(),'sha256':digest(p)})
        for n in ['AGENTS.md','.aiignore','jobfind-kit.json']:
            p=safe(source,n)
            if p.is_file():items.append({'path':n,'sha256':digest(p)})
    actions=[];conflicts=[]
    for row in items:
        rel=row['path']
        if not (rel.startswith(('.agent/','.docs/','.stitch/')) or rel in ['AGENTS.md','.aiignore','jobfind-kit.json']):continue
        src=safe(source,rel);dst=safe(project,rel)
        # Catch a file occupying any directory before changing the target.
        for parent in dst.parents:
            if parent==project.parent:break
            if parent.exists() and not parent.is_dir():raise ValueError('Parent is a file: '+str(parent))
        state='create'
        if dst.exists():
            state='identical' if dst.is_file() and digest(dst)==row['sha256'] else 'conflict'
        actions.append({'path':rel,'action':state})
        if state=='conflict':conflicts.append(rel)
    return {'source':str(source),'project':str(project),'create':sum(x['action']=='create' for x in actions),
            'identical':sum(x['action']=='identical' for x in actions),'conflicts':conflicts,'actions':actions}

def install(source,project,apply=False):
    result=plan(source,project)
    if apply and result['conflicts']:raise ValueError('Resolve conflicts before --apply: '+', '.join(result['conflicts']))
    if apply:
        for row in result['actions']:
            if row['action']=='create':atomic(safe(project,row['path']),safe(source,row['path']).read_bytes())
    result['applied']=apply
    return result

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--source',default=str(root_default()));p.add_argument('--project',required=True);p.add_argument('--apply',action='store_true')
    a=p.parse_args()
    try:r=install(a.source,a.project,a.apply)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:p.error(str(e))
    print(json.dumps({k:v for k,v in r.items() if k!='actions'},ensure_ascii=False,indent=2))
    if r['conflicts']:sys.exit(2)
if __name__=='__main__':main()
