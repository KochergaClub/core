from kocherga.graphql import django_utils, g
from kocherga.wagtail import graphql_utils as wagtail_utils

from ... import models

# might be moved to kocherga.vk some day
VkGroup = g.ObjectType('VkGroup', g.fields({'name': str}))

# might be moved to kocherga.timepad some day
TimepadCategory = g.ObjectType(
    'TimepadCategory', g.fields({'id': 'ID!', 'code': str, 'name': str})
)

EventsAnnouncementTimepad = g.ObjectType(
    'EventsAnnouncementTimepad',
    {
        **django_utils.model_fields(
            models.TimepadAnnouncement, ['link', 'category_code', 'prepaid_tickets']
        )
    },
)

EventsAnnouncementVk = g.ObjectType(
    'EventsAnnouncementVk',
    {
        **django_utils.model_fields(models.VkAnnouncement, ['link', 'group']),
        'image': wagtail_utils.image_rendition_field(models.VkAnnouncement, 'image'),
    },
)

EventsAnnouncementFb = g.ObjectType(
    'EventsAnnouncementFb',
    {**django_utils.model_fields(models.FbAnnouncement, ['link', 'group'])},
)

EventsAnnouncements = g.ObjectType(
    'EventsAnnouncements',
    g.fields(
        {
            'timepad': g.NN(EventsAnnouncementTimepad),
            'vk': g.NN(EventsAnnouncementVk),
            'fb': g.NN(EventsAnnouncementFb),
        }
    ),
)
