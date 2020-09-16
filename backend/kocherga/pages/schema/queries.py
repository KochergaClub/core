import logging

from kocherga.graphql.django_utils import DjangoObjectType

logger = logging.getLogger(__name__)

from django.utils import timezone
from kocherga.graphql import helpers

from .. import models

c = helpers.Collection()


SpecialOffer = DjangoObjectType(
    'SpecialOffer',
    model=models.SpecialOffer,
    db_fields=['id', 'text', 'link', 'button_text', 'until', 'hide_duration'],
)


@c.class_field
class specialOffer(helpers.BaseField):
    def resolve(self, _, info):
        try:
            result = models.SpecialOffer.objects.get(pk=1, until__gt=timezone.now())
        except models.SpecialOffer.DoesNotExist:
            return None

        return result

    permissions = []
    result = SpecialOffer


queries = c.as_dict()
