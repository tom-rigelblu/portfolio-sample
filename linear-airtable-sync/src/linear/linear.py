# Copyright 2023 rigélblu inc. All rights reserved.
import logging
import json
import os
from datetime import datetime
from flask import abort, Response, Request
from google.cloud import logging as cloud_logging
from http import HTTPStatus
from .config import config
from .types import LinearModel
from ..airtable.airtable import process_request as airtable_process_request
from ..helper import compute_signature


LOG_LEVEL = os.getenv("LINEAR_LOG_LEVEL", "INFO")
cloud_logging_client = cloud_logging.Client()
cloud_logging_client.setup_logging()

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(LOG_LEVEL)
log_prefix = "linear-airtable-sync / linear / linear_webhook\n---\n"


# FIXME: mock airtable calls
# PR_REVIEW: Type Annotations: Type hints are used for some functions but not for others, like handle_request and abort. Consistent use of type hints can make the code easier to read and understand, and help avoid type errors.
def handle_request(request: Request) -> Response:
    if not is_request_source_valid(request):
        logging.warning(log_prefix + "/ handle_request")
        logging.warning(RuntimeError(f"Forbidden source ip: {get_source_ip(request)}"))
        return abort(HTTPStatus.FORBIDDEN, description="Invalid headers source ip")

    LINEAR_SIGNING_SECRET = os.getenv("LINEAR_SIGNING_SECRET")
    if LINEAR_SIGNING_SECRET is None:
        logging.error(log_prefix + "/ handle_request")
        logging.error(
            RuntimeError("LINEAR_SIGNING_SECRET environment variable is not set")
        )
        return abort(
            HTTPStatus.BAD_REQUEST,
            description="LINEAR_SIGNING_SECRET environment variable is not set",
        )

    request_linear_signature = request.headers.get("Linear-Signature")
    if not request_linear_signature:
        logging.error(log_prefix + "/ handle_request")
        logging.error(RuntimeError("Missing Linear-Signature in headers"))
        return abort(
            HTTPStatus.BAD_REQUEST, description="Missing Linear-Signature in headers"
        )

    raw_body = request.get_data()
    signature = compute_signature(LINEAR_SIGNING_SECRET, raw_body)
    if signature != request_linear_signature:
        logging.error(RuntimeError("Invalid signature"))
        logging.debug(log_prefix + "/ handle_request")
        logging.debug(f"signature = {signature}")
        logging.debug(f"request_linear_signature = {request_linear_signature}")

        return abort(HTTPStatus.UNAUTHORIZED, description="Invalid signature")

    process_request(raw_body, request.headers.get("Host", ""))
    return Response(status=HTTPStatus.OK)


def process_request(raw_body: bytes, headers_host: str) -> None:
    try:
        body = json.loads(raw_body.decode("utf-8"))
        body["audit_headers_host"] = headers_host
        body["audit_received_timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        payload = LinearModel(**body)
        airtable_process_request(payload)
    except json.JSONDecodeError:
        logging.exception(log_prefix + "/ log_process_request")
        logging.exception(f"LinearPayload = {str(payload.__dict__)}")
        logging.exception(
            RuntimeError("Could not decode webhook body or validation error")
        )
        abort(
            HTTPStatus.BAD_REQUEST,
            description="Could not decode webhook body or validation error",
        )
    except Exception as e:
        logging.exception(log_prefix + "/ process_request")
        logging.exception(f"body = {str(body)}")
        logging.exception(f"Exception occurred: {str(e)}")


# OPTIMIZE: X-Forwarded-For can be spoofed, investigate if there's other ways to validate
# TODO: externalize X-Forwarded-For
def get_source_ip(request: Request) -> str:
    return request.headers.get("X-Forwarded-For", "undefined")


# PR-REVIEW: Function Responsibilities: The is_request_source_valid function both checks the validity of the source IP and logs errors based on the deployment environment. Consider separating these responsibilities into separate functions for better readability and easier testing.
# PR_REVIEW: Environment Variable: If DEPLOY_ENV is not set, the code logs an exception and returns False, which might not be the expected behavior. Consider having a default value or fail fast if the required environment variable is not set.
# PR_REVIEW: Error Handling and Logging: There are several places where the code simply logs an exception and continues. This might lead to more serious errors being hidden. Consider whether you should let these exceptions propagate and be handled by a top-level exception handler.
def is_request_source_valid(request: Request) -> bool:
    source_ip = get_source_ip(request)
    env = os.getenv("DEPLOY_ENV", None)

    if not env:
        logging.exception(log_prefix + "/ get_source_ip")
        logging.exception("DEPLOY_ENV is not set")
        return False

    # TODO: use types, check for rb vpn
    match (env):
        case "production":
            return is_source_linear(source_ip)
        case "development" | "local" | "localhost":
            return is_source_linear(source_ip) or is_source_localhost(source_ip)
        case _:
            logging.exception(log_prefix + "/ is_request_source_valid")
            logging.exception(f"Invalid env var. DEPLOY_ENV = {env}")
    return False


def is_source_linear(source_ip: str) -> bool:
    # FIXME: gcloud function doesn't provide ip
    # return source_ip in config["valid_source_ips"]["linear"]  # type: ignore
    return True


# TODO: validate if ip is rb private vpn / gcp
def is_source_localhost(source_ip: str) -> bool:
    return source_ip in config["valid_source_ips"]["localhost"]  # type: ignore
