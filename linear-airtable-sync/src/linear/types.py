# Copyright 2023 rigélblu inc. All rights reserved.
from typing import Any, Optional


# REFACTOR: use LinearDataModel for data
class LinearModel:
    def __init__(
        self,
        *,
        action: str,
        data: dict,
        url: Optional[str] = None,
        audit_headers_host: str,
        audit_received_timestamp: str,
        **kwargs: Any,
    ) -> None:
        self.action = action
        self.data = data
        self.url = url
        # REFACTOR: put into own moddel
        self.audit_headers_host = audit_headers_host
        self.audit_received_timestamp = audit_received_timestamp
