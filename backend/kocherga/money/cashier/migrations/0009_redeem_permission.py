# Generated by Django 2.2 on 2019-07-06 18:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashier', '0008_nonunique_items'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cheque',
            options={'permissions': (('create', 'Может выписывать новые чеки'), ('redeem', 'Может обналичивать существующие чеки')), 'verbose_name': 'Выплата', 'verbose_name_plural': 'Выплаты'},
        ),
    ]