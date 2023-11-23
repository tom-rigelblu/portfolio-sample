# Copyright 2023 rigélblu inc. All rights reserved.
from typing import Dict
from .config import config

airtable_field: Dict[str, str] = config["table"]["field"]


class AirtableModel:
    def __init__(
        self,
        linear_id: str,
        linear_uid: str,
        linear_audit: str,
        product: str,
        status: str,
        user_needs: str,
        type: str,
        url: str,
    ) -> None:
        self.linear_id = linear_id
        self.linear_uid = linear_uid
        self.linear_audit = linear_audit
        self.product = product
        self.status = status
        self.type = type
        self.user_needs = user_needs
        self.url = url

    @property
    def linear_id_field(self) -> str:
        return airtable_field["linear_id"]

    @property
    def linear_uid_field(self) -> str:
        return airtable_field["linear_uid"]

    @property
    def linear_audit_field(self) -> str:
        return airtable_field["linear_audit"]

    @property
    def product_field(self) -> str:
        return airtable_field["product"]

    @property
    def status_field(self) -> str:
        return airtable_field["status"]

    @property
    def user_needs_field(self) -> str:
        return airtable_field["user_needs"]

    @property
    def type_field(self) -> str:
        return airtable_field["type"]

    @property
    def url_field(self) -> str:
        return airtable_field["url"]

    def to_airtabble_dict(self) -> dict:
        return {
            airtable_field["linear_id"]: self.linear_id,
            airtable_field["linear_uid"]: self.linear_uid,
            airtable_field["linear_audit"]: self.linear_audit,
            airtable_field["product"]: self.product,
            airtable_field["status"]: self.status,
            airtable_field["type"]: self.type,
            airtable_field["user_needs"]: self.user_needs,
            airtable_field["url"]: self.url,
        }
