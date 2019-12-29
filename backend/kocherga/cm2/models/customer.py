from django.db import models
from django.conf import settings


class CustomerQuerySet(models.QuerySet):
    def search(self, query):
        qs = self

        for search_term in query.split():
            qs = qs.filter(
                models.Q(first_name__icontains=search_term)
                | models.Q(last_name__icontains=search_term)
                | models.Q(card_id__icontains=search_term)
            )
        return qs


class Customer(models.Model):
    card_id = models.BigIntegerField('Номер карты', db_index=True)
    first_name = models.CharField('Имя', max_length=100)
    last_name = models.CharField('Фамилия', max_length=100)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        null=True,  # FIXME
        blank=True,
        related_name='cm2_customer',
    )

    objects = CustomerQuerySet.as_manager()
