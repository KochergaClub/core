# Generated by Django 2.2 on 2019-05-02 11:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashier', '0006_auto_20190320_1313'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cheque',
            options={'permissions': (('create', 'Может выписывать новые чеки'),), 'verbose_name': 'Выплата', 'verbose_name_plural': 'Выплаты'},
        ),
    ]
