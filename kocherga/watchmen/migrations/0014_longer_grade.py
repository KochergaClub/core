# Generated by Django 2.2.5 on 2019-11-08 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watchmen', '0013_priority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='code',
            field=models.CharField(max_length=5, verbose_name='Код'),
        ),
    ]
