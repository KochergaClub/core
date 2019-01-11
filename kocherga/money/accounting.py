import kocherga.db
from django.db import models

class FinAccount(models.Model):
    class Meta:
        db_table = 'fin_accounts'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    parent = models.ForeignKey('self', on_delete=models.CASCADE)

    def add_child(self, name):
        return FinAccount.objects.create(name=name, parent=self)


class FinTransaction(kocherga.db.Base):
    class Meta:
        db_table = 'fin_transactions'

    id = models.AutoField(primary_key=True)
    comment = models.TextField()


class FinTransactionLine(kocherga.db.Base):
    class Meta:
        db_table = 'fin_transaction_lines'
        unique_together = (
            ('transaction', 'account'),
        )

    transaction = models.ForeignKey(FinTransaction, on_delete=models.CASCADE)
    account = models.ForeignKey(FinAccount, on_delete=models.CASCADE)

    debit = models.DecimalField(max_digits=10, decimal_places=2)
    credit = models.DecimalField(max_digits=10, decimal_places=2)


def demo():
    cash = FinAccount.objects.create('cash')
    cash.add_child('cash.register')
    cash.add_child('cash.tochka')

    FinAccount.objects.create('equity')
    # FinAccount.add('yandex_kassa')
    # FinAccount.add('timepad')

    # инкассация
    FinTransaction.add(
        lines=[
            Line('cash', debit=5000),
            Line('slava_cash', credit=5000),
        ]
    )

    # зарплата
    add_transaction(
        lines=[
            Line(account='cash', credit=5000),
            Line(account='slava_cash', debit=5000),
        ]
    )
