# Generated by Django 2.2.5 on 2020-02-03 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tilda', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tildapage',
            old_name='alias',
            new_name='path',
        ),
    ]
