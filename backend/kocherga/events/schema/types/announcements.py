from kocherga.graphql import g, django_utils
from kocherga.graphql.decorators import staffonly
from kocherga.wagtail import graphql_utils as wagtail_utils

from ... import models

# might be moved to kocherga.vk some day
VkGroup = g.ObjectType('VkGroup', g.fields({'name': str}))

# might be moved to kocherga.timepad some day
TimepadCategory = g.ObjectType(
    'TimepadCategory', g.fields({'id': 'ID!', 'code': str, 'name': str})
)

# type EventsAnnouncementTimepad {
#   link: String!
#   category_code: String!
#   prepaid_tickets: Boolean!
# }
EventsAnnouncementTimepad = g.ObjectType(
    'EventsAnnouncementTimepad',
    {
        **django_utils.model_fields(
            models.TimepadAnnouncement, ['link', 'category_code', 'prepaid_tickets']
        )
    },
)

# type EventsAnnouncementVk {
#   link: String!
#   group: String!
#   image(spec: String!): WagtailImageRendition @staffonly
# }
EventsAnnouncementVk = g.ObjectType(
    'EventsAnnouncementVk',
    {
        **django_utils.model_fields(models.VkAnnouncement, ['link', 'group']),
        'image': wagtail_utils.image_rendition_field(
            models.VkAnnouncement, 'image', decorator=staffonly
        ),
    },
)

# type EventsAnnouncementFb {
#   link: String!
#   group: String!
# }
EventsAnnouncementFb = g.ObjectType(
    'EventsAnnouncementFb',
    {**django_utils.model_fields(models.FbAnnouncement, ['link', 'group'])},
)

# type EventsAnnouncements {
#   timepad: EventsAnnouncementTimepad!
#   vk: EventsAnnouncementVk!
#   fb: EventsAnnouncementFb!
# }
EventsAnnouncements = g.ObjectType(
    'EventsAnnouncements',
    {
        'timepad': g.NN(EventsAnnouncementTimepad),
        'vk': g.NN(EventsAnnouncementVk),
        'fb': g.NN(EventsAnnouncementFb),
    },
)
