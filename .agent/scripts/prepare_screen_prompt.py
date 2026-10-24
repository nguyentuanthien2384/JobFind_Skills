#!/usr/bin/env python3
"""Prepare a prompt from an exact screen; no generation or writes by default."""
import argparse,json
from pathlib import Path
from kit_utils import load,safe,root_default,atomic

def prepare(kit,screen,device=None,mode='match-reference'):
    rows=load(kit,'.docs/ui-mockups/screen-map.json');s=next((x for x in rows if x['id']==screen),None)
    if not s:raise ValueError('Unknown local screen ID '+screen)
    base=safe(kit,s['prompt']).read_text(encoding='utf-8')
    original=s['canvas']['device'];selected=device or original
    if mode not in ['match-reference','jobfind-normalized']:raise ValueError('Unknown design mode')
    text=base+'\n## Yêu cầu phiên hiện tại\n'
    text+=f'- Mode: {mode}. Actor: {", ".join(s["roles"])}. Feature: {s["feature_id"]}.\n'
    if selected!=original:
        text+=f'- Thiết kế variant {selected}, width '+('390' if selected=='MOBILE' else '1280')+'px. Đây là EXTENSION từ reference; chưa phải màn native đã có.\n'
        text+='- Giữ nội dung và hành động, xác định reflow/sidebar/filter/table/modal/keyboard; bổ sung trạng thái cần thiết với nhãn extension.\n'
    else:text+=f'- Giữ canvas {s["canvas"]["width"]} × {s["canvas"]["height"]} và section order trong ảnh.\n'
    if mode=='jobfind-normalized':text+='- Đổi nhãn thương hiệu thành JobFind theo yêu cầu; liệt kê mọi token/label đổi, giữ contract nghiệp vụ.\n'
    text+='- Chỉ ghi link/node ID sau khi công cụ dịch vụ trả và đã kiểm tra. Giữ code_status/test_status chưa xác minh khi chỉ vẽ.\n'
    return text

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--kit',default=str(root_default()));p.add_argument('--screen',required=True)
    p.add_argument('--device',choices=['DESKTOP','MOBILE']);p.add_argument('--mode',choices=['match-reference','jobfind-normalized'],default='match-reference');p.add_argument('--out')
    a=p.parse_args()
    try:
        value=prepare(a.kit,a.screen,a.device,a.mode)
        if a.out:atomic(Path(a.out),value);print(json.dumps({'out':str(Path(a.out).absolute()),'screen':a.screen,'generated_design':False}))
        else:print(value)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:p.error(str(e))
if __name__=='__main__':main()
