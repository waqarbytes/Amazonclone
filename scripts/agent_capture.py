#!/usr/bin/env python3
import sys
import json
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from capture_sync import sync_all
except ImportError:
    sync_all = lambda: None

try:
    input_data = sys.stdin.read()
    payload = json.loads(input_data) if input_data.strip() else {}
except Exception:
    payload = {}

# Execute sync
try:
    sync_all()
except Exception:
    pass

response = {}
if "toolCall" in payload:
    response = {"decision": "allow"}
elif "executionNum" in payload: # Stop hook
    response = {"decision": "allow"}
elif "invocationNum" in payload: # Pre/PostInvocation
    response = {"injectSteps": []}

print(json.dumps(response))
sys.stdout.flush()
