# Generated by Django 2.2 on 2019-04-27 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_auto_20190427_1606'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectpage',
            name='is_active',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
