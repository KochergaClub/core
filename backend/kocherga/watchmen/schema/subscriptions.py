import logging

from asgiref.sync import sync_to_async

logger = logging.getLogger(__name__)

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import check_permissions

from .. import permissions, channels

c = helpers.Collection()


WatchmenScheduleUpdateNotification = g.ObjectType(
    'WatchmenScheduleUpdateNotification', g.fields({'updated': bool})
)


@c.field
def watchmenScheduleUpdates(_):
    async def subscribe(obj, info):
        # check permissions
        await sync_to_async(permissions.manage_watchmen, thread_sensitive=True)(
            obj, info
        )

        async for msg in channels.watchmen_updates_group.subscribe():
            logger.info('yielding True')
            yield True

    @check_permissions([permissions.manage_watchmen])
    def resolve(msg, info):
        logger.info('returning updated')
        return {'updated': True}

    return g.Field(
        g.NN(WatchmenScheduleUpdateNotification), resolve=resolve, subscribe=subscribe
    )


subscriptions = c.as_dict()
