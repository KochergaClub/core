from kocherga.graphql.types import DjangoObjectType

from ... import models

EventsAnnouncementVk = DjangoObjectType('EventsAnnouncementVk', models.VkAnnouncement)

EventsAnnouncementVk.image_field('image')
