import logging

from asgiref.sync import sync_to_async

logger = logging.getLogger(__name__)

import channels.layers
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import check_permissions

from .. import permissions

EventNotification = g.ObjectType(
    'EventNotification', g.fields({'type': str, 'id': 'ID!'})
)

c = helpers.Collection()


@c.field
def events(_):
    async def subscribe(obj, info):
        # check permissions
        await sync_to_async(permissions.manage_events, thread_sensitive=True)(obj, info)

        channel_layer = channels.layers.get_channel_layer()
        channel_name = await channel_layer.new_channel()

        await channel_layer.group_add("event_updates", channel_name)
        logger.info(f'Subscribed {channel_name} to event_updates group')

        while True:
            msg = await channel_layer.receive(channel_name)
            logger.debug('Event update: ' + str(msg))
            yield msg

    @check_permissions([permissions.manage_events])
    def resolve(msg, info):
        logger.debug(info.context)

        if not msg:
            # this can happen if we invoke subscription via HTTP due to incorrectly configured Apollo client & link
            logger.error('weird, msg is empty')
            return  # this will cause an exception anyway since `events` result is non-nullable

        # It'd be better to yield event, but it's problematic because all other resolver are sync
        # and Django ORM can't be called in async context.
        return {
            'type': msg['type'],
            'id': msg['uuid'],
        }

    return g.Field(g.NN(EventNotification), resolve=resolve, subscribe=subscribe)


subscriptions = c.as_dict()
