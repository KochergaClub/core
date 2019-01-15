from django.db import models

from .order import Order

class OrderLogEntry(models.Model):
    class Meta:
        unique_together = (
            ('order', 'operation_id'),
        )
        db_table = 'cm_order_log'

    operation_id = models.IntegerField()
    operation = models.CharField(max_length=1024)
    ts = models.IntegerField(db_index=True)
    login = models.CharField(max_length=80)

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
