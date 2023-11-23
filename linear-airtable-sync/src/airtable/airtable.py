# Copyright 2023 rigélblu inc. All rights reserved.
import json
import logging
import os
from pyairtable import Table
from pyairtable.formulas import match
from typing import Dict, Optional, Union
from .config import config
from .types import AirtableModel
from ..linear.types import LinearModel

log_prefix = "linear-airtable-sync / linear / airtable\n---\n"
personal_token = os.environ.get("AIRTABLE_PERSONAL_TOKEN")
table_name: str = config["table"]["name"]
airtable_field: Dict[str, str] = config["table"]["field"]


def get_base_id(team: str) -> Union[str, None]:
    # REFACTOR: move pre-checks up front and remove from all other places
    deploy_env = os.environ.get("DEPLOY_ENV")
    json_str = os.environ.get("AIRTABLE_BASE_ID")
    if json_str is not None:
        try:
            base = json.loads(json_str)
        except json.JSONDecodeError as e:
            logging.exception(f"Exception occurred: {str(e)}")
    else:
        logging.error("No value found for AIRTABLE_BASE_ID environment variable")

    match deploy_env:
        case "development" | "local" | "localhost":
            base_id = base["env_dev"]["rb foundation"]
        case "production":
            base_id = base["env_prod"][team]
        case _:
            base_id = None
            logging.exception(log_prefix + "/ global")
            logging.exception(f"Invalid deploy env. DEPLOY_ENV = {deploy_env})")

    return base_id


# REFACTOR: move pre-checks up front and remove from all other places
if not personal_token or not table_name:
    raise ValueError(
        f"{log_prefix}Missing required environment variables. Check env files and if you loaded them"
    )


# OPTIMIZE: handle any field being missing, fail softly
def toAirtablePayload(payload: LinearModel) -> AirtableModel:
    linear_audit = (
        f"headers host = {payload.audit_headers_host}\n"
        f"request received timestamp = {payload.audit_received_timestamp}\n"
    )

    # OPTIMIZE: handle any field being missing, fail softly
    url = payload.url if payload.url is not None else ""

    linear_id = f'{payload.data["team"]["key"]}-{payload.data["number"]}'

    type, product = None, None
    labels = payload.data.get("labels", [{}])
    for label in labels:
        label_name = label.get("name", "")
        if label_name.startswith("product /"):
            product = label_name
        elif type is None:  # assign the first non-product label to type
            type = label_name

    airtablePayload = AirtableModel(
        linear_id=linear_id,
        linear_uid=payload.data["id"],
        linear_audit=linear_audit,
        product=product,
        status=payload.data["state"]["name"],
        user_needs=payload.data["title"],
        type=type,
        url=url,
    )

    return airtablePayload


def process_request(payload: LinearModel):
    if "parentId" in payload.data and payload.data["parentId"]:
        logging.debug(log_prefix + "/ process_request")
        logging.debug(
            f"Ignoring linear issue with parent id with payload={str(payload.__dict__)}"
        )
        return

    team = payload.data["team"]["name"]
    base_id = get_base_id(team)
    try:
        table = Table(personal_token, base_id, table_name)  # type: ignore
    except Exception as e:
        logging.exception(log_prefix + "/ global")
        logging.exception(f"Exception occurred: {str(e)}")

    match payload.action:
        case "create":
            createItem(table, payload)
        case "update":
            updateItem(table, payload)
        case "remove":
            deleteItem(table, payload)
        case _:
            logging.exception(log_prefix + "/ process_request")
            logging.exception(f"Invalid linear payload action: {str(payload.action)}")


def createItem(table: Table, payload: LinearModel):
    # TODO: convert to AirtablePayload
    airtablePayload = toAirtablePayload(payload)
    # TODO: check if item exists, if it does, do update instead and send slack notification
    try:
        linear_uid = airtablePayload.linear_uid
        recordId = getItemRecordId(table, linear_uid)
        if not recordId:
            table.create(airtablePayload.to_airtabble_dict())
            logging.info(
                f"Created airtable item with {str(airtablePayload.to_airtabble_dict())}"
            )
        else:
            updateItem(
                table,
                payload,
                recordId=recordId,
            )
    except Exception as e:
        logging.exception(log_prefix + "/ createItem")
        logging.exception(
            f"airtablePayload = {str(airtablePayload.to_airtabble_dict())}"
        )
        logging.exception(f"Exception occurred: {str(e)}")


def updateItem(table: Table, payload: LinearModel, recordId: Optional[str] = ""):
    airtablePayload = toAirtablePayload(payload)
    try:
        linear_uid = airtablePayload.linear_uid
        recordId = recordId or getItemRecordId(table, linear_uid) or ""
        if recordId:
            table.update(recordId, airtablePayload.to_airtabble_dict())
            logging.info(
                f"Updated airtable item with recordId={recordId} to {str(airtablePayload.to_airtabble_dict())}"
            )
        else:
            logging.debug(
                f"Cannot update item. Airtable record with linear_uid={linear_uid} not found."
                f"Linear payload {str(airtablePayload.to_airtabble_dict())}. Attempting to create."
            )
            createItem(table, payload)
    except Exception as e:
        logging.exception(log_prefix + "/ updateItem")
        logging.exception(
            f"airtablePayload = {str(airtablePayload.to_airtabble_dict())}"
        )
        logging.exception(f"Exception occurred: {str(e)}")


def deleteItem(table: Table, payload: LinearModel, recordId: Optional[str] = ""):
    airtablePayload = toAirtablePayload(payload)
    try:
        linear_uid = airtablePayload.linear_uid
        recordId = recordId or getItemRecordId(table, linear_uid) or ""
        if recordId:
            table.delete(recordId)
            logging.info(
                f"Deleted airtable item with recordId={recordId}. Linear payload is {str(airtablePayload.to_airtabble_dict())}"
            )
        else:
            logging.error(
                f"Cannot delete item. Airtable record with linear_uid={linear_uid} not found. "
                f"Linear payload {str(airtablePayload.to_airtabble_dict())}"
            )
    except Exception as e:
        logging.exception(log_prefix + "/ deleteItem")
        logging.exception(
            f"airtablePayload = {str(airtablePayload.to_airtabble_dict())}"
        )
        logging.exception(f"Exception occurred: {str(e)}")


def getItemRecordId(table: Table, linear_uid: str) -> Union[str, None]:
    try:
        expression = match({airtable_field["linear_uid"]: linear_uid})
        record = table.first(formula=expression)
        if record:
            return record["id"]
    except Exception as e:
        logging.exception(log_prefix + "/ getItemRecordId")
        logging.exception(f"Exception occurred: {str(e)}")

    return None
