# Copyright 2023 rigélblu inc. All rights reserved.


# TODO: The IP addresses are hardcoded into the linear_config dictionary. This is a potential issue because if these IP addresses change, you will need to modify the code and redeploy the application. It would be better to move these addresses to an external configuration file or environment variables.
config = {
    "request_test_filename": "request_test.json",
    "valid_source_ips": {
        "linear": [
            "35.231.147.226",
            "35.243.134.228",
        ],  # externalize linear and rb-vpn
        "localhost": ["0.0.0.0"],
        # TODO: add rb vpn
    },
    "webhook_route": "/webhook/linear",
}
