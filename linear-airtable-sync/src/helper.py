# Copyright 2023 rigélblu inc. All rights reserved.
import hashlib
import hmac
import json
import logging
import os
import traceback
from dotenv import load_dotenv
from flask import jsonify
from flask.wrappers import Response
from http import HTTPStatus
from typing import Tuple, Union

DEFAULT_ENV = "local"


def compute_signature(
    secret_key: Union[str, bytes], msg: Union[str, bytes]
) -> str:
    try:
        if isinstance(secret_key, str):
            secret_key = secret_key.encode("utf-8")

        if isinstance(msg, str):
            msg = msg.encode("utf-8")
        elif not isinstance(msg, bytes):
            msg = json.dumps(msg, separators=(",", ":")).encode("utf-8")

        return hmac.new(secret_key, msg, hashlib.sha256).hexdigest()
    except Exception as e:
        logging.error(
            f"An error occurred while computing the signature. Message: {msg!r}. Error of type {type(e).__name__}: {str(e)}, traceback: {traceback.format_exc()}"
        )
        raise


def load_env():
    env_file = {
        "local": ".env.local",
        "development": ".env.development",
        "production": ".env.production",
    }
    env = os.getenv("ENV", DEFAULT_ENV)
    load_dotenv(dotenv_path=env_file.get(env, env_file[DEFAULT_ENV]))

    # switch (env) {

    #     case 'production':
    #     case 'development':
    #       console.info(`Info: env file ${filePath} not found. Ensure env vars are set on system .`);
    #     default:
    #       console.warn(
    #         `Warning: env file ${filePath} not found. Ensure env vars are set on system.`
    #       );
    #   }
    #   dotenv.config({ path: envFile[DEFAULT_ENV] });


# TODO: add support for logging regular calls in DEBUG mode
def log_http_response(
    response: HTTPStatus, e: Exception
) -> Tuple[Response, int]:
    logging.error(
        f"An error occurred of type {type(e).__name__}: {str(e)}, traceback: {traceback.format_exc()}"
    )
    return (
        jsonify({"error": "An unexpected error occurred"}),
        response,
    )


def log_handler_setup():
    log_level = os.getenv("LINEAR_LOG_LEVEL", "INFO")
    logging.basicConfig(level=log_level)
