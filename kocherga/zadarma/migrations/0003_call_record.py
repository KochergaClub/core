# Generated by Django 2.1.7 on 2019-03-28 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zadarma', '0002_names'),
    ]

    operations = [
        migrations.AddField(
            model_name='call',
            name='record',
            field=models.FileField(blank=True, upload_to='zadarma/calls/records'),
        ),
    ]