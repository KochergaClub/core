import logging

from asgiref.sync import sync_to_async

logger = logging.getLogger(__name__)

import channels.layers
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import check_permissions

from .. import permissions

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

        channel_layer = channels.layers.get_channel_layer()
        channel_name = await channel_layer.new_channel()

        GROUP_NAME = 'watchmen_schedule_group'
        await channel_layer.group_add(GROUP_NAME, channel_name)
        logger.info(f'Subscribed {channel_name} to {GROUP_NAME} group')

        while True:
            await channel_layer.receive(channel_name)
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
