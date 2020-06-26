import logging

logger = logging.getLogger(__name__)

import ariadne.asgi
from channels.auth import get_user

from .schema import schema


# via https://github.com/mirumee/ariadne/issues/210#issuecomment-508424149
class ASGIGraphQL(ariadne.asgi.GraphQL):
    def __call__(self, scope):
        async def handle(receive, send):
            await super(ASGIGraphQL, self).__call__(scope, receive, send)

        return handle


class ASGIContext:
    __slots__ = ['user']

    def __init__(self, user):
        self.user = user


async def get_context_value(websocket):
    return ASGIContext(user=await get_user(websocket.scope))


asgi_graphql_app = ASGIGraphQL(schema, context_value=get_context_value,)
