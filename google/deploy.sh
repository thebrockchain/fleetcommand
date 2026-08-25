#!/bin/bash
# Deploy Fleet Command's ADK build to Cloud Run.
#
# GUARD: this Mac's default gcloud login is the CLIENT's account (El Zarape).
# Fleet infra must never be built on it, so this script refuses to run unless
# the active gcloud account is the fleet one. Use the named configuration:
#   gcloud config configurations activate fleetcommand
set -euo pipefail

PROJECT="fleet-command-506619"
REGION="us-central1"
SERVICE="fleet-command"
FLEET_ACCOUNT="falfasbrock@gmail.com"

ACTIVE=$(gcloud config get-value account 2>/dev/null || true)
if [ "$ACTIVE" != "$FLEET_ACCOUNT" ]; then
  echo "Refusing: active gcloud account is '$ACTIVE', not $FLEET_ACCOUNT." >&2
  echo "Run: gcloud config configurations activate fleetcommand" >&2
  exit 1
fi

cd "$(dirname "$0")"

gcloud services enable run.googleapis.com cloudbuild.googleapis.com \
  artifactregistry.googleapis.com generativelanguage.googleapis.com \
  --project "$PROJECT"

# The model key is read from the environment on purpose: it is never stored in
# this repo and never echoed. Arm it in the shell before running.
: "${GOOGLE_API_KEY:?Set GOOGLE_API_KEY in the environment first (never commit it)}"

.venv/bin/adk deploy cloud_run \
  --project "$PROJECT" \
  --region "$REGION" \
  --service_name "$SERVICE" \
  --with_ui \
  ./fleet_command

gcloud run services update "$SERVICE" --project "$PROJECT" --region "$REGION" \
  --set-env-vars "GOOGLE_GENAI_USE_VERTEXAI=FALSE,GOOGLE_API_KEY=${GOOGLE_API_KEY}"

echo "Deployed. Service URL:"
gcloud run services describe "$SERVICE" --project "$PROJECT" --region "$REGION" \
  --format 'value(status.url)'
