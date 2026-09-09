#!/usr/bin/env bash
set -e
LOG_FILE="/Users/mohdwaqar/Desktop/Amazon/.agents/hook_debug.log"
echo "--- Hook called at $(date -u) ---" >> "$LOG_FILE"
INPUT=$(cat)
echo "$INPUT" >> "$LOG_FILE"
echo "{}"
