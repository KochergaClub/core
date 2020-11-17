import logging

logger = logging.getLogger(__name__)

import ariadne.asgi
from channels.auth import get_user

from .schema import schema


class ASGIContext:
    __slots__ = ['user']

    def __init__(self, user):
        self.user = user


async def get_context_value(websocket):
    return ASGIContext(user=await get_user(websocket.scope))


asgi_graphql_app = ariadne.asgi.GraphQL(schema, context_value=get_context_value)
