# Generated by Django 2.2.5 on 2019-10-16 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0039_ticket_defaults'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='registration_date',
            field=models.DateField(
                auto_now_add=True, null=True, verbose_name='Дата регистрации'
            ),
        ),
    ]
