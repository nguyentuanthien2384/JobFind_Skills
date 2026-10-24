#!/usr/bin/env python3
"""Index reviewed source/config metadata only; never open .env, SQL dumps or CV files."""
from pathlib import Path
import argparse, hashlib, json, re, sys

def inspect(project):
    root=Path(project).resolve()
    packages=['package.json','frontend/package.json','backend/package.json','microservices/package.json']
    if not all((root/p).is_file() for p in packages):
        raise ValueError('Project root must contain root/frontend/backend/microservices package.json')
    result={'project_name':'JobFind','inventory_format':1,'scope':'static source metadata; no runtime/config values',
            'packages':{},'ui_routes':[],'legacy_endpoints':[],'models':[],'tests':[],'feature_flag_keys':[],'sha256':{}}
    def read(path):
        f=root/path
        if f.is_symlink():raise ValueError('Refuse symlink source: '+str(path))
        data=f.read_bytes();result['sha256'][str(path)]=hashlib.sha256(data).hexdigest()
        return data.decode('utf-8')
    for path in packages:
        d=json.loads(read(path));result['packages'][path]={k:d[k] for k in ['name','engines','scripts','dependencies','devDependencies','workspaces'] if k in d}
    for path,prefix in [('frontend/src/App.js',''),('frontend/src/container/Candidate/HomeCandidate.js','/candidate'),('frontend/src/container/system/HomeAdmin.js','/admin')]:
        source=read(path)
        matches=list(re.finditer(r'<Route\s+path="([^"]+)"',source))
        for i,m in enumerate(matches):
            block=source[m.start():matches[i+1].start() if i+1<len(matches) else len(source)]
            route=m[1]
            full=(prefix+'/*' if route=='*' and prefix else prefix+route)
            result['ui_routes'].append({'path':full,'declared_path':route,'source':path,
                'permissions_in_route_block':sorted(set(re.findall(r'PERMISSIONS\.([A-Z_]+)',block))),
                'components_in_route_block':list(dict.fromkeys(re.findall(r'<([A-Z][A-Za-z0-9_]*)[\s/>]',block)))})
    path='backend/src/routes/web.js';source=read(path)
    for line in source.splitlines():
        m=re.search(r"router\.(get|post|put|patch|delete)\(['\"]([^'\"]+)['\"]",line)
        if m:result['legacy_endpoints'].append({'method':m[1].upper(),'path':m[2],
             'permissions_in_declaration':re.findall(r'PERMISSIONS\.([A-Z_]+)',line)})
    result['parsing_note']='Static route blocks/declaration metadata only. Parent guards and multiline handlers require reading source; empty permission lists do not prove public access.'
    for p in sorted((root/'backend/src/models').glob('*.js')):
        if p.name=='index.js':continue
        s=read(p.relative_to(root))
        result['models'].append({'path':str(p.relative_to(root)),
            'model_names':re.findall(r"modelName:\s*['\"]([^'\"]+)",s),
            'fields_static':re.findall(r'(\w+)\s*:\s*DataTypes\.([A-Z]+)',s)})
    keys=set()
    for p in sorted((root/'frontend/src/service').glob('*.js')):
        if '.test.' in p.name:continue
        s=read(p.relative_to(root));keys.update(re.findall(r'process\.env\.(REACT_APP_[A-Z0-9_]+)',s))
    result['feature_flag_keys']=sorted(keys)
    for pattern in ['backend/tests/**/*test*','frontend/src/**/*test*','microservices/tests/**/*test*','scripts/*.test.mjs']:
        for p in root.glob(pattern):
            if p.is_file() and not p.is_symlink():result['tests'].append(str(p.relative_to(root)))
    result['tests']=sorted(set(result['tests']))
    return result

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--project',required=True);p.add_argument('--out')
    args=p.parse_args()
    try:data=inspect(args.project)
    except (ValueError,OSError,json.JSONDecodeError) as e:p.error(str(e))
    text=json.dumps(data,ensure_ascii=False,indent=2)+'\n'
    if args.out:
        target=Path(args.out)
        if target.exists():p.error('Output exists; choose a new path to preserve previous evidence')
        target.parent.mkdir(parents=True,exist_ok=True);target.write_text(text,encoding='utf-8')
        print(json.dumps({'out':str(target.resolve()),'routes':len(data['ui_routes']),'legacy_endpoints':len(data['legacy_endpoints']),'models':len(data['models']),'tests':len(data['tests'])}))
    else:print(text,end='')
if __name__=='__main__':main()
