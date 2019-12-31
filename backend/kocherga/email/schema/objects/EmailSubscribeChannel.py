from kocherga.ariadne import DjangoObjectType

from ... import models

EmailSubscribeChannel = DjangoObjectType('EmailSubscribeChannel', models.SubscribeChannel)

EmailSubscribeChannel.related_field('interests')
