# Generated by Django 2.2.5 on 2019-12-03 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faq', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='entry', options={'ordering': ['sort_order']},
        ),
        migrations.AddField(
            model_name='entry',
            name='sort_order',
            field=models.IntegerField(blank=True, editable=False, null=True),
        ),
    ]
