from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


class CashierItem(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    shift = models.CharField(max_length=40)
    watchman = models.CharField(max_length=100)
    cash_income = models.IntegerField(null=True)
    electronic_income = models.IntegerField(null=True)
    total_income = models.IntegerField(null=True)  # could be restored from other data
    current_cash = models.IntegerField(null=True)
    notes = models.TextField()
    discrepancy = models.IntegerField(null=True)  # could be restored from other data
    spendings = models.IntegerField(null=True)

    class Meta:
        db_table = 'cashier'

    def __str__(self):
        return f'[{self.date} {self.shift}] {self.cash_income} + {self.electronic_income} = {self.total_income}'


class Payment(models.Model):
    whom = models.ForeignKey(
        get_user_model(),
        verbose_name='Кому',
        on_delete=models.CASCADE,
        related_name='payments',
    )
    amount = models.IntegerField('Сумма')
    created_dt = models.DateTimeField('Дата создания', auto_now_add=True, db_index=True)
    redeem_dt = models.DateTimeField('Дата получения', null=True, blank=True)
    comment = models.TextField('Комментарий', blank=True)

    class Meta:
        verbose_name = 'Выплата'
        verbose_name_plural = 'Выплаты'
        permissions = (
            ('create', 'Может выписывать новые чеки'),
            ('redeem', 'Может обналичивать существующие чеки'),
            ('kkm_user', 'Может использовать кассовый аппарат'),
        )
        ordering = ('-created_dt',)

    def __str__(self):
        result = f'{self.amount} -> {self.whom}'
        if self.comment:
            result += ': ' + self.comment
        return result

    def is_redeemed(self):
        return self.redeem_dt is not None
    is_redeemed.boolean = True

    def redeem(self):
        if self.is_redeemed():
            raise Exception("Payment is already redeemed")
        self.redeem_dt = timezone.now()
        self.save()


def current_cash():
    item = (
        CashierItem.objects.exclude(current_cash=None).order_by('-id')[0]
    )
    return item.current_cash
