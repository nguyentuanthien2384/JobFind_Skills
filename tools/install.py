#!/usr/bin/env python3
import runpy,sys
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'.agent/scripts'
sys.path.insert(0,str(p))
runpy.run_path(str(p/'install_kit.py'),run_name='__main__')
