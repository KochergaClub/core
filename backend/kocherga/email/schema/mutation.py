from ariadne import MutationType

from kocherga.django.schema_utils import require_staff

from .. import models

Mutation = MutationType()


@require_staff
@Mutation.field('emailSubscribeChannelDelete')
def emailSubscribeChannelDelete(self, info, slug):
    models.SubscribeChannel.objects.get(slug=slug).delete()
    return True


@require_staff
@Mutation.field('emailSubscribeChannelCreate')
def emailSubscribeChannelCreate(self, info, params):
    models.SubscribeChannel.objects.create(**params)
    return True


@require_staff
@Mutation.field('emailSubscribeChannelAddEmail')
def emailSubscribeChannelAddEmail(self, info, slug, email):
    channel = models.SubscribeChannel.objects.get(slug=slug)
    channel.subscribe_email(email)
    return True
