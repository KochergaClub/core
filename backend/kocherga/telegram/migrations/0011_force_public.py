# Generated by Django 3.1.3 on 2021-02-28 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('telegram', '0010_more_permissions'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='force_public',
            field=models.BooleanField(default=False),
        ),
    ]