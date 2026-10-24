#!/usr/bin/env python3
"""Update one independent backlog status with evidence; default is dry-run."""
import argparse,json
from datetime import datetime,timezone
from pathlib import Path
from kit_utils import load,safe,root_default,atomic,json_text

ALLOWED={'design_status':['planned','in-progress','designed','reference-complete','blocked'],
         'code_status':['planned','in-progress','implemented','unverified','blocked'],
         'test_status':['not-run','passed','failed','skipped','blocked']}
def update(kit,task,field,value,evidence=None,next_task=None,apply=False):
    if field not in ALLOWED or value not in ALLOWED[field]:raise ValueError('Invalid status field/value')
    data=load(kit,'.stitch/backlog.json');row=next((x for x in data['tasks'] if x['id']==task),None)
    if not row:raise ValueError('Unknown task ID '+task)
    if value in ['designed','reference-complete','implemented','passed'] and not evidence:
        raise ValueError('Completion status requires evidence')
    if evidence:
        if evidence.startswith('https://'):
            if field!='design_status':raise ValueError('Code/test evidence must be a local artifact or log')
        elif not safe(kit,evidence).is_file():raise ValueError('Evidence path does not exist in project')
    if next_task and not any(x['id']==next_task for x in data['tasks']):raise ValueError('Unknown next-task ID')
    previous=row[field];row[field]=value
    row.setdefault('evidence',[]).append({'field':field,'from':previous,'to':value,'ref':evidence,
                                         'recorded_at':datetime.now(timezone.utc).isoformat()})
    if next_task:data['next_task_id']=next_task
    result={'task':task,'field':field,'from':previous,'to':value,'next_task_id':data['next_task_id'],'applied':apply}
    if apply:atomic(safe(kit,'.stitch/backlog.json'),json_text(data),replace=True)
    return result

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--kit',default=str(root_default()));p.add_argument('--task',required=True)
    p.add_argument('--field',choices=list(ALLOWED),required=True);p.add_argument('--value',required=True);p.add_argument('--evidence');p.add_argument('--next-task');p.add_argument('--apply',action='store_true')
    a=p.parse_args()
    try:r=update(a.kit,a.task,a.field,a.value,a.evidence,a.next_task,a.apply)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:p.error(str(e))
    print(json.dumps(r,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
