# Generated by Django 2.2 on 2019-08-28 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashier', '0011_kkm_user_permission'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='payment',
            options={'ordering': ('-created_dt',), 'permissions': (('create', 'Может выписывать новые чеки'), ('redeem', 'Может обналичивать существующие чеки'), ('kkm_user', 'Может использовать кассовый аппарат')), 'verbose_name': 'Выплата', 'verbose_name_plural': 'Выплаты'},
        ),
        migrations.AlterField(
            model_name='payment',
            name='created_dt',
            field=models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Дата создания'),
        ),
    ]