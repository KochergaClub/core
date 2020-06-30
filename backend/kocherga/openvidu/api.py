import logging

logger = logging.getLogger(__name__)

from typing import Optional
import requests

from django.conf import settings


def api_post(url: str, payload):
    return requests.post(
        f"{settings.OPENVIDU_SERVER}/{url}",
        json=payload,
        auth=('OPENVIDUAPP', settings.OPENVIDU_SECRET),
        verify=not settings.DEBUG,  # we don't have a proper certificate in dev
    )


def generate_token(session_id: str, data: Optional[str] = None):
    logger.info(f"Generating token for session_id {session_id}")

    # TODO: option for deciding whether to start a session
    r = api_post('api/sessions', {"customSessionId": session_id})
    if r.status_code == 409:
        pass  # that's ok
    else:
        if r.status_code >= 400:
            logger.error(r.text)
        r.raise_for_status()

    r = api_post("api/tokens", {"session": session_id, "data": data})
    if r.status_code in (401, 404):
        logger.error(r.text)
    r.raise_for_status()

    return r.json()['token']
