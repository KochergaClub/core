from datetime import datetime

from kocherga.graphql import g
from kocherga.wagtail.graphql_utils import WagtailPageType, block_to_types
from kocherga.wagtail.schema.types import WagtailBlock, WagtailImageRendition
from kocherga.events.schema import types as event_types

import kocherga.events.models

from .. import blocks, models


FreeFormPage = WagtailPageType(
    model=models.FreeFormPage,
    db_fields=['title'],
    extra_fields={'body': g.NNList(WagtailBlock)},
)

FolderPage = WagtailPageType(model=models.FolderPage, db_fields=['title'],)


def create_PhotoRibbonBlock():
    def resolve_value(obj, info, spec):
        return [image.get_rendition(spec) for image in obj.value]

    return g.ObjectType(
        'PhotoRibbonBlock',
        interfaces=[WagtailBlock],
        fields=g.fields(
            {
                'id': 'ID!',
                'value': g.Field(
                    g.NNList(WagtailImageRendition),
                    args=g.arguments({'spec': str}),
                    resolve=resolve_value,
                ),
            }
        ),
    )


def create_EventsListBlock():
    def resolve_value(obj, info):
        qs = kocherga.events.models.Event.objects.public_events(
            from_date=datetime.today()
        )
        return qs[:20]

    return g.ObjectType(
        'EventsListBlock',
        interfaces=[WagtailBlock],
        fields=g.fields(
            {
                'id': 'ID!',
                'events': g.Field(g.NNList(event_types.Event), resolve=resolve_value),
            }
        ),
    )


def create_static_block(name: str):
    return g.ObjectType(name, interfaces=[WagtailBlock], fields=g.fields({'id': 'ID!'}))


block_types = [
    t
    for block in [*blocks.all_blocks, *blocks.front_blocks]
    if block[0] not in ('events_list', 'photo_ribbon', 'hr', 'front_social_links')
    for t in block_to_types(block)
]

page_types = [FreeFormPage, FolderPage]
static_block_types = [
    create_EventsListBlock(),
    create_PhotoRibbonBlock(),
    create_static_block(name='HrBlock'),
    create_static_block(name='FrontSocialLinksBlock'),
]

exported_types = page_types + block_types + static_block_types