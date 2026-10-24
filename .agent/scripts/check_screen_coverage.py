#!/usr/bin/env python3
"""Validate design/catalog/document joins and optional current source paths."""
import argparse,json
from pathlib import Path
from kit_utils import load,safe,digest,root_default

DOCS=[('ideas','idea'),('design-briefs','brief'),('frontend-plans','plan'),('backend-plans','plan'),('endpoint-apis','endpoints'),('qa','qa')]
def check(kit,project=None):
    kit=Path(kit).absolute();screens=load(kit,'.docs/ui-mockups/screen-map.json');features=load(kit,'.docs/feature-catalog.json')
    routes=load(kit,'.docs/ui-mockups/route-coverage.json');api=load(kit,'.docs/api-catalog.json')
    keys={f['id'] for f in features};errors=[]
    if len(keys)!=len(features):errors.append('Duplicate feature ID')
    if len({s['id'] for s in screens})!=len(screens):errors.append('Duplicate screen ID')
    endpoints={(e['method'].upper(),e['path']) for e in api['legacy']}|{(e['method'].upper(),e['publicPath']) for e in api['modern']}
    for f in features:
        for folder,suffix in DOCS:
            p=f'.docs/{folder}/{f["id"]}-{suffix}.md'
            if not safe(kit,p).is_file():errors.append('Missing feature doc '+p)
        for endpoint in f['apis']:
            method,path=endpoint.split(' ',1)
            if (method,path) not in endpoints:errors.append('Uncatalogued endpoint '+endpoint)
        if project:
            for path in f['sources']:
                if not safe(project,path).is_file():errors.append('Missing current source '+path)
    for s in screens:
        if s['feature_id'] not in keys:errors.append('Unknown screen feature '+s['id'])
        for k in ['doc','prompt']:
            if not safe(kit,s[k]).is_file():errors.append('Missing '+s[k])
        for k,hashkey in [('html','html_sha256'),('image','image_sha256')]:
            p=safe(kit,s['assets'][k])
            if not p.is_file() or digest(p)!=s[hashkey]:errors.append('Reference hash mismatch '+s['id']+'/'+k)
        if project:
            for path in s['sources']:
                if not safe(project,path).is_file():errors.append('Missing current source '+path)
    for r in routes:
        if r['feature_id'] not in keys:errors.append('Unknown route feature '+r['path'])
        if project and not safe(project,r['source']).is_file():errors.append('Missing route owner '+r['source'])
        for p in r['planning_docs']:
            if not safe(kit,p).is_file():errors.append('Missing route planning doc '+p)
    return {'screens':len(screens),'features':len(features),'feature_documents':len(features)*6,'route_declarations':len(routes),
            'unique_route_patterns':len({r['path'] for r in routes}),'legacy_endpoints':len(api['legacy']),'modern_operations':len(api['modern']),
            'source_paths_checked':bool(project),'errors':sorted(set(errors)),
            'scope':'Static joins and reference integrity only; no application runtime or pixel-match assertion.'}

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--kit',default=str(root_default()));p.add_argument('--project')
    a=p.parse_args()
    try:r=check(a.kit,a.project)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:p.error(str(e))
    print(json.dumps(r,ensure_ascii=False,indent=2))
    if r['errors']:raise SystemExit(1)
if __name__=='__main__':main()
