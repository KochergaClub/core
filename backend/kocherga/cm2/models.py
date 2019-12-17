from datetime import datetime

from django.db import models

from kocherga.dateutils import TZ


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

    objects = OrderQuerySet.as_manager()

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def close(self):
        if self.end:
            raise Exception("Already closed")
        self.end = datetime.now(TZ)
        self.save()
