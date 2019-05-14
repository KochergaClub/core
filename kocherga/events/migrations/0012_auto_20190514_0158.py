# Generated by Django 2.2 on 2019-05-13 22:58

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0011_ticket'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ticket',
            options={'permissions': (('view_tickets', 'Может смотреть билеты'),)},
        ),
        migrations.AlterUniqueTogether(
            name='ticket',
            unique_together={('event', 'user')},
        ),
    ]
