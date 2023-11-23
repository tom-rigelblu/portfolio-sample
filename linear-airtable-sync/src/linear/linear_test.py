# Copyright 2023 rigélblu inc. All rights reserved.
import json
import logging
import os
from flask.testing import FlaskClient
from http import HTTPStatus
from typing import Optional
from werkzeug.test import TestResponse
from .config import config
from ..app import app


log_prefix = "linear-airtable-sync / linear / linear_webhook_test\n---\n"


def send_request(header_signature: Optional[str] = "") -> TestResponse:
    client: FlaskClient = app.test_client()

    request_dir = os.path.dirname(os.path.abspath(__file__))
    request_file = os.path.join(request_dir, config["request_test_filename"])  # type: ignore
    try:
        with open(request_file, "r") as file:
            request = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        logging.exception(log_prefix + "/ send_request")
        logging.error(f"Exception occured: {str(e)}")
        raise

    headers = request["headers"]
    if header_signature:
        headers["Linear-Signature"] = header_signature

    body = json.dumps(request["body"], separators=(",", ":"))
    return client.post(config["webhook_route"], headers=headers, data=body)


def test_webhook_linear_issue(
    expected_status: HTTPStatus,
    signature: Optional[str] = "",
) -> None:
    response: TestResponse = send_request(signature)
    assert response.status_code == expected_status


test_webhook_linear_issue(HTTPStatus.OK)
test_webhook_linear_issue(HTTPStatus.UNAUTHORIZED, "123-random-signature")
