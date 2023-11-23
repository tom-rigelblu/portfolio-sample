# Copyright 2023 rigélblu inc. All rights reserved.
import functions_framework  # type: ignore
from google.cloud import logging as cloud_logging
from src.linear.linear import handle_request

cloud_logging.Client().setup_logging()  # Attach the cloud logging handler to python's root logger


# Register HTTP function with Functions Framework
@functions_framework.http
def handle_request_on_gcf(request):
    return handle_request(request)
