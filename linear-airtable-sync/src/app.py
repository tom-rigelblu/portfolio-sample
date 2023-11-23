# Copyright 2023 rigélblu inc. All rights reserved.
from flask import Flask, jsonify, request
from flask.wrappers import Response
from http import HTTPStatus
from typing import Tuple
from .helper import load_env, log_http_response, log_handler_setup
from .linear.linear import handle_request
from .linear.config import config


load_env()
log_handler_setup()
app: Flask = Flask(__name__)


# Decorator used only for local testing
@app.route(config["webhook_route"], methods=["POST"])  # type: ignore
def linear_issue_post() -> Tuple[Response, int]:
    try:
        handle_request(request)
        return jsonify({"message": "Success"}), HTTPStatus.OK
    except Exception as e:
        return log_http_response(HTTPStatus.INTERNAL_SERVER_ERROR, e)
