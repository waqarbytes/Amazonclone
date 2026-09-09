#!/usr/bin/env python3
import os
import sys
import json
import re
import glob
from datetime import datetime, timezone

WORKSPACE_DIR = "/Users/mohdwaqar/Desktop/Amazon"
BRAIN_DIR = os.path.expanduser("~/.gemini/antigravity-ide/brain")
LOGS_OUTPUT_DIR = os.path.join(WORKSPACE_DIR, ".agent-logs")
AUTHOR = "waqarbytes"
PROJECT = "amazon"
DEFAULT_MODEL = "gemini-3.8-flash"

os.makedirs(LOGS_OUTPUT_DIR, exist_ok=True)

def extract_prompt_text(raw):
    if not raw:
        return ""
    m = re.search(r"<USER_REQUEST>(.*?)</USER_REQUEST>", raw, re.DOTALL)
    if m:
        return m.group(1).strip("\r\n")
    m = re.search(r"^(.*?)(?=<ADDITIONAL_METADATA>)", raw, re.DOTALL)
    if m:
        return m.group(1).strip("\r\n")
    return raw.strip("\r\n")

def parse_iso_time(ts_str):
    if not ts_str:
        return datetime.now(timezone.utc)
    try:
        # Handles 2026-09-09T12:35:33Z or +00:00
        clean = ts_str.replace("Z", "+00:00")
        return datetime.fromisoformat(clean)
    except Exception:
        return datetime.now(timezone.utc)

def format_iso_time(dt):
    # Output format e.g. 2026-08-28T09:14:02.118Z or 2026-08-28T09:14:02Z
    s = dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    return s + "Z"

def is_relevant_conversation(conv_dir):
    # Check if conversation is tied to our workspace
    transcript_path = os.path.join(conv_dir, ".system_generated", "logs", "transcript_full.jsonl")
    if not os.path.exists(transcript_path):
        transcript_path = os.path.join(conv_dir, ".system_generated", "logs", "transcript.jsonl")
    if not os.path.exists(transcript_path):
        return False
    
    # Check if current workspace path is referenced or if it's the active conversation
    conv_id = os.path.basename(conv_dir)
    if conv_id == "cc51ab3d-3fbb-4f7a-9e8f-cacd9c90a64b":
        return True
    
    try:
        with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
            # Read first 100 lines
            for _ in range(100):
                line = f.readline()
                if not line:
                    break
                if WORKSPACE_DIR in line or "Amazon" in line:
                    return True
    except Exception:
        pass
    return False

def process_transcript(conv_dir):
    conv_id = os.path.basename(conv_dir)
    short_id = conv_id[:8]
    transcript_path = os.path.join(conv_dir, ".system_generated", "logs", "transcript_full.jsonl")
    if not os.path.exists(transcript_path):
        transcript_path = os.path.join(conv_dir, ".system_generated", "logs", "transcript.jsonl")
    if not os.path.exists(transcript_path):
        return None

    turns = []
    current_user = None
    current_response = None
    current_model = DEFAULT_MODEL

    try:
        with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                except Exception:
                    continue

                stype = data.get("type")
                source = data.get("source")

                # Detect model selection if present
                content_str = data.get("content") or ""
                if "Model Selection" in content_str:
                    if "Gemini 3.8 Flash" in content_str:
                        current_model = "gemini-3.8-flash"
                    elif "Gemini 2.5 Pro" in content_str:
                        current_model = "gemini-2.5-pro"

                if stype == "USER_INPUT" and source == "USER_EXPLICIT":
                    if current_user is not None:
                        turns.append({
                            "user": current_user,
                            "response": current_response,
                            "model": current_model
                        })
                    current_user = data
                    current_response = None

                elif stype == "PLANNER_RESPONSE" and source == "MODEL":
                    content = data.get("content")
                    tool_calls = data.get("tool_calls")
                    if content and not tool_calls:
                        current_response = data

        if current_user is not None:
            turns.append({
                "user": current_user,
                "response": current_response,
                "model": current_model
            })
    except Exception as e:
        print(f"Error reading transcript for {conv_id}: {e}", file=sys.stderr)
        return None

    if not turns:
        return None

    # Filter out turns that don't have a response yet if this is the active turn
    # BUT if a previous turn had no response because it was interrupted, we can note it
    valid_exchanges = []
    for idx, turn in enumerate(turns):
        u = turn["user"]
        r = turn["response"]
        m = turn["model"]
        u_text = extract_prompt_text(u.get("content", ""))
        
        # If no prompt text (e.g. empty message), skip
        if not u_text.strip():
            continue

        if r is not None:
            r_text = r.get("content", "").strip()
            r_time = r.get("created_at") or u.get("created_at")
        else:
            # If not the last turn, it was interrupted
            if idx < len(turns) - 1:
                r_text = "[Turn interrupted by subsequent user prompt before completion]"
                r_time = u.get("created_at")
            else:
                # Last turn is currently executing, wait for response
                continue

        valid_exchanges.append({
            "num": len(valid_exchanges) + 1,
            "prompt_text": u_text,
            "prompt_time": u.get("created_at"),
            "response_text": r_text,
            "response_time": r_time,
            "model": m
        })

    if not valid_exchanges:
        return None

    first_prompt_time_raw = valid_exchanges[0]["prompt_time"]
    last_prompt_time_raw = valid_exchanges[-1]["prompt_time"]

    dt_first = parse_iso_time(first_prompt_time_raw)
    dt_last = parse_iso_time(last_prompt_time_raw)

    file_prefix = dt_first.strftime("%Y-%m-%d_%H-%M-%S")
    date_str = dt_first.strftime("%Y-%m-%d")

    first_prompt_time_str = format_iso_time(dt_first)
    last_prompt_time_str = format_iso_time(dt_last)

    # Format markdown according to spec
    frontmatter = f"""---
session_id: {conv_id}
date: {date_str}
author: {AUTHOR}
model: {valid_exchanges[-1]["model"]}
tool: antigravity-ide
project: {PROJECT}
total_exchanges: {len(valid_exchanges)}
first_prompt_time: {first_prompt_time_str}
last_prompt_time: {last_prompt_time_str}
---

# Session Log - {date_str}

Session: `{short_id}` | Project: `{PROJECT}` | Author: `{AUTHOR}`

---
"""

    entries = []
    for ex in valid_exchanges:
        p_dt = parse_iso_time(ex["prompt_time"])
        r_dt = parse_iso_time(ex["response_time"])
        entry_md = f"""[LOG_ENTRY type=PROMPT num={ex["num"]} session={short_id}]
timestamp: {format_iso_time(p_dt)}
model: {ex["model"]}

{ex["prompt_text"]}


[LOG_ENTRY type=RESPONSE num={ex["num"]} session={short_id}]
timestamp: {format_iso_time(r_dt)}
model: {ex["model"]}

{ex["response_text"]}
"""
        entries.append(entry_md)

    full_md = frontmatter + "\n" + "\n\n".join(entries) + "\n"

    # Save primary file
    target_filename = f"{file_prefix}_{conv_id}.md"
    target_path = os.path.join(LOGS_OUTPUT_DIR, target_filename)

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(full_md)

    # Also make a short-id symlink or copy
    short_target = os.path.join(LOGS_OUTPUT_DIR, f"{file_prefix}_{short_id}.md")
    try:
        if os.path.exists(short_target) or os.path.islink(short_target):
            os.remove(short_target)
        os.symlink(target_filename, short_target)
    except Exception:
        with open(short_target, "w", encoding="utf-8") as f:
            f.write(full_md)

    print(f"Captured {len(valid_exchanges)} exchanges to {target_path}")
    return target_path

def sync_all():
    if not os.path.exists(BRAIN_DIR):
        print(f"Brain dir not found: {BRAIN_DIR}", file=sys.stderr)
        return

    for entry in os.listdir(BRAIN_DIR):
        conv_dir = os.path.join(BRAIN_DIR, entry)
        if os.path.isdir(conv_dir) and is_relevant_conversation(conv_dir):
            process_transcript(conv_dir)

if __name__ == "__main__":
    sync_all()
