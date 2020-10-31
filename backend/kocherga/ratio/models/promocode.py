from django.db import models


class Promocode(models.Model):
    code = models.CharField('Промокод', max_length=100)
    discount = models.IntegerField('Сумма скидки')
    single_use = models.BooleanField('Одноразовый', default=True)
    used = models.BooleanField('Использован', default=False)
