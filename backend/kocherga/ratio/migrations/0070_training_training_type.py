# Generated by Django 3.1.3 on 2020-12-12 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0069_name_fields_optional'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='training_type',
            field=models.SlugField(blank=True),
        ),
    ]
