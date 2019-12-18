from datetime import datetime

from django.db import models

from kocherga.dateutils import TZ

from .customer import Customer


class OrderQuerySet(models.QuerySet):
    def filter_by_status(self, status):
        if status == 'open':
            return self.filter(end__isnull=True)
        elif status == 'closed':
            return self.filter(end__isnull=False)
        else:
            raise Exception(f"Unknown status {status}")


class Order(models.Model):
    start = models.DateTimeField(auto_now_add=True, db_index=True)
    end = models.DateTimeField(db_index=True, null=True, blank=True)

    stored_value = models.IntegerField(null=True, blank=True)

    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name='orders',
        null=True,
        blank=True,
    )

    objects = OrderQuerySet.as_manager()

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    @property
    def value(self) -> int:
        if self.end:
            # already closed
            return self.stored_value

        age = (datetime.now(TZ) - self.start).seconds / 60

        # TODO - support custom tariffs and subscribers
        # TODO - round up
        return int(age * 2.5)

    def close(self):
        if self.end:
            raise Exception("Already closed")

        self.stored_value = self.value
        self.end = datetime.now(TZ)

        self.save()
