#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"
TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"

start_tmux_session() {
  local session_name="$1"
  local workdir="$2"
  local command="$3"

  tmux -f "$TMUX_CONF" kill-session -t "$session_name" 2>/dev/null || true
  tmux -f "$TMUX_CONF" new-session -d -s "$session_name" -c "$workdir" -- "${SHELL:-bash}" -l
  tmux -f "$TMUX_CONF" send-keys -t "$session_name:0.0" "$command" C-m
}

echo "Building frontend..."
(cd "$FRONTEND_DIR" && npm run build)

echo "Starting backend on http://localhost:4000 ..."
start_tmux_session "gulefirdous-backend" "$BACKEND_DIR" "npm start"

echo "Starting frontend preview on http://localhost:3000 ..."
start_tmux_session "gulefirdous-static-server" "$FRONTEND_DIR" "npm run preview"

sleep 2

echo ""
echo "Gulefirdous is running:"
echo "  App:     http://localhost:3000"
echo "  API:     http://localhost:4000/health"
echo ""
echo "If the page looks broken, hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)"
