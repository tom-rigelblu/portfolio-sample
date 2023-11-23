#!/bin/bash
# Copyright rigélblu inc. All rights reserved.
set -euo pipefail

USER_DEPLOY_STAGE=""
if buildkite-agent meta-data exists "selected_deploy_stage"; then
  USER_DEPLOY_STAGE=$(buildkite-agent meta-data get "selected_deploy_stage")
fi

SET_USER_DEPLOY_STAGE_STEP="\
  - label: 'Using selected stage'
    command: echo 'Using selected stage'
    env:
      USER_DEPLOY_STAGE: $USER_DEPLOY_STAGE
"

DEFAULT_PIPELINE_STEPS="\
  - label: 'Uploading default pipeline ›'
    command: buildkite-agent pipeline upload .buildkite/apps/$APP_NAME-pipeline.yaml
"

USER_TRIGGERED_PIPELINE="\
steps:
$SET_USER_DEPLOY_STAGE_STEP
$DEFAULT_PIPELINE_STEPS
"

DEFAULT_PIPELINE="\
env:
steps:
$DEFAULT_PIPELINE_STEPS
"

if [[ -z "$USER_DEPLOY_STAGE" ]]; then
  PIPELINE="$DEFAULT_PIPELINE"
else
  PIPELINE="$USER_TRIGGERED_PIPELINE"
fi

echo "$PIPELINE" | buildkite-agent pipeline upload
