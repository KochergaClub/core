# Generated by Django 2.2.5 on 2019-11-16 11:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0042_training_day_p2'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='activity',
            options={'ordering': ('training_day__training__date', 'training_day__date', 'time'), 'verbose_name': 'Активность', 'verbose_name_plural': 'Активности'},
        ),
        migrations.RenameField(
            model_name='activity',
            old_name='day_fk',
            new_name='training_day',
        ),
    ]