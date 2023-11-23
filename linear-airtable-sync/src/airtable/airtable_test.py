# Copyright 2023 rigélblu inc. All rights reserved.
from werkzeug.test import TestResponse
from ..linear.linear_test import send_request


def test_create_airtable_item() -> None:
    response: TestResponse = send_request()
    assert response.status_code == 200
