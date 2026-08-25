#!/bin/bash
# Arm the Gemini model key on the deployed Cloud Run service. BROCK RUNS THIS,
# not a session: a live secret key never passes through a session transcript
# (Constitution, Article XI #32). The key is read straight from the file it
# already lives in and goes straight to Cloud Run; nothing prints it.
set -euo pipefail

PROJECT="fleet-command-506619"
REGION="us-central1"
SERVICE="fleet-command"
KEY_FILE="$(dirname "$0")/../../../bambam/.dev.vars"

KEY=$(sed -n 's/^GOOGLE_AI_API_KEY=//p' "$KEY_FILE" | tr -d '"' | tr -d "'")
if [ -z "$KEY" ]; then
  echo "No GOOGLE_AI_API_KEY found in $KEY_FILE" >&2
  exit 1
fi

CLOUDSDK_ACTIVE_CONFIG_NAME=fleetcommand gcloud run services update "$SERVICE" \
  --project "$PROJECT" --region "$REGION" \
  --update-env-vars "GOOGLE_API_KEY=${KEY}" \
  --quiet >/dev/null

echo "Key armed on $SERVICE (ends ...${KEY: -4}). Nothing was printed in full."
