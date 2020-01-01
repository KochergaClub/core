from ariadne import MutationType

from .. import models

Mutation = MutationType()


@Mutation.field('emailSubscribeChannelDelete')
def emailSubscribeChannelDelete(self, info, slug):
    models.SubscribeChannel.objects.get(slug=slug).delete()
    return True


@Mutation.field('emailSubscribeChannelCreate')
def emailSubscribeChannelCreate(self, info, params):
    models.SubscribeChannel.objects.create(**params)
    return True


@Mutation.field('emailSubscribeChannelAddEmail')
def emailSubscribeChannelAddEmail(self, info, slug, email):
    channel = models.SubscribeChannel.objects.get(slug=slug)
    channel.subscribe_email(email)
    return True
