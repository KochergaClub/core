# Generated by Django 2.2 on 2019-05-02 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0019_training_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='last_name',
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name='Фамилия'
            ),
        ),
    ]
