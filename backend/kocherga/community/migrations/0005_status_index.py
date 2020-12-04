# Generated by Django 3.1.3 on 2020-12-04 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0004_curated_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='status',
            field=models.CharField(choices=[('ACTIVE', 'Активный'), ('INACTIVE', 'Неактивный')], db_index=True, default='ACTIVE', max_length=20),
        ),
    ]
