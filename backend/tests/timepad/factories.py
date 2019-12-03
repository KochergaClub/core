import factory
from datetime import datetime

from kocherga.timepad import models
from kocherga.dateutils import TZ


class EventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Event

    name = factory.Faker('sentence', nb_words=4)
    id = factory.Sequence(lambda n: 1000 + n)


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Order

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    status = 'ok'
    created_at = factory.LazyFunction(lambda: datetime.now(TZ))
    subscribed_to_newsletter = False
    id = factory.Sequence(lambda n: n)
