# Generated by Django 2.2 on 2019-06-25 13:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashier', '0007_auto_20190502_1414'),
    ]

    operations = [
        migrations.AlterUniqueTogether(name='cashieritem', unique_together=set(),),
    ]
