# Copyright 2023 rigélblu inc. All rights reserved.
PIP?=pip3
PYTHON?=python3
VENV_NAME?=env

COLOR_BLUE=167;217;255
COLOR_START_BLUE=\033[38;2;${COLOR_BLUE}m
COLOR_END=\033[0m


# ----------
# Main commands
clean:
	@find . -type d -name __pycache__ -exec rm -rf {} +
	@rm -rf $(VENV_NAME) .pytest_cache
.PHONY: clean

start: load-env
	poetry run gunicorn -w 4 -b 0.0.0.0:8080 src.main:app
.PHONY: start

prod: load-env
	gunicorn -w 4 -b 0.0.0.0:8080 src.main:app
.PHONY: prod

fmt:
	poetry run black .
.PHONY: fmt

# FIXME: this won't work because it's a json str. Need to temp copy/paste into gcloud function
# --update-env-vars=AIRTABLE_BASE_ID=${AIRTABLE_BASE_ID},AIRTABLE_PERSONAL_TOKEN=${AIRTABLE_PERSONAL_TOKEN}
deploy-manual-dev: load-env
	gcloud functions deploy ${GCP_FUNCTION_NAME} \
	--gen2 \
	--runtime=${GCP_RUNTIME} \
	--region=${GCP_REGION} \
	--source=. \
	--entry-point=handle_request_on_gcf \
	--min-instances=${GCP_MIN_INSTANCES} --max-instances=${GCP_MAX_INSTANCES} \
	--memory=${GCP_MEMORY} \
	--update-env-vars=DEPLOY_ENV=${DEPLOY_ENV},DEPLOY_STAGE=${DEPLOY_STAGE} \
	--update-env-vars=LINEAR_LOG_LEVEL=${LINEAR_LOG_LEVEL} \
	--update-env-vars=LINEAR_SIGNING_SECRET=${LINEAR_SIGNING_SECRET} \
	--timeout=${GCP_TIMEOUT} \
	--trigger-http \
	--allow-unauthenticated
.PHONY: update_requirements

# ----------
# Run unit tests
test: load-env
	@${VENV_NAME}/bin/pytest
.PHONY: test

test-logs: load-env
	@${VENV_NAME}/bin/pytest --log-cli-level=DEBUG
.PHONY: test-logs

# FIXME: results from running make command are different than copying/pasting the
#        echo's command into the terminal
# For debugging, add "echo before curl command to print command that is run
test-curl: load-env
	HEADERS=$$(jq -r '.headers | to_entries[] | "-H \"\(.key): \(.value)\" "' src/request_test.json | tr -d '\n') && \
	BODY=$$(jq -c '.body' src/request_test.json) && \
	(echo curl http://localhost:8080/webhook/linear $$HEADERS -d "'$$BODY'")
.PHONY: test-curl

# ----------
# Helper commands
load-env:
	@if [ -z "${LINEAR_SIGNING_SECRET}" ]; then \
		echo "Export env variables first by executing this in your shell. Then re-run the make command"; \
		printf "For local env:\n"; \
		printf "${COLOR_START_BLUE}set -a${COLOR_END}\n"; \
		printf "${COLOR_START_BLUE}source .env.local${COLOR_END}\n\n"; \
		\
		printf "For development env:\n"; \
		printf "${COLOR_START_BLUE}set -a${COLOR_END}\n"; \
		printf "${COLOR_START_BLUE}source .env.development${COLOR_END}\n"; \
		\
		printf "For production env:\n"; \
		printf "${COLOR_START_BLUE}set -a${COLOR_END}\n"; \
		printf "${COLOR_START_BLUE}source .env.production${COLOR_END}\n"; \
		@exit 1; \
	fi
.PHONY: load-env
