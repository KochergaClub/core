# Generated by Django 3.0.5 on 2020-06-11 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tilda', '0003_body_and_assets'),
    ]

    operations = [
        migrations.AddField(
            model_name='tildapage',
            name='title',
            field=models.CharField(default='', max_length=1024),
        ),
    ]
