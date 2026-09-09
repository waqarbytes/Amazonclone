#!/usr/bin/env python3
import os
import sys
import time

# Add current scripts directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from capture_sync import sync_all, BRAIN_DIR

def run_watcher():
    print(f"Starting agent capture log watcher on {BRAIN_DIR}...")
    last_mtimes = {}
    
    while True:
        try:
            changed = False
            if os.path.exists(BRAIN_DIR):
                for entry in os.listdir(BRAIN_DIR):
                    conv_logs = os.path.join(BRAIN_DIR, entry, ".system_generated", "logs")
                    if os.path.isdir(conv_logs):
                        for f in ("transcript_full.jsonl", "transcript.jsonl"):
                            fpath = os.path.join(conv_logs, f)
                            if os.path.exists(fpath):
                                mtime = os.path.getmtime(fpath)
                                if fpath not in last_mtimes or last_mtimes[fpath] < mtime:
                                    last_mtimes[fpath] = mtime
                                    changed = True
            if changed:
                sync_all()
        except Exception as e:
            print(f"Watcher error: {e}", file=sys.stderr)
        
        time.sleep(1)

if __name__ == "__main__":
    run_watcher()
