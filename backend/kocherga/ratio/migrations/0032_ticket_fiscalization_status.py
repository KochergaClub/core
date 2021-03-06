# Generated by Django 2.2 on 2019-07-11 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0031_trainer_long_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='fiscalization_status',
            field=models.CharField(
                choices=[
                    ('todo', 'todo'),
                    ('not_needed', 'not_needed'),
                    ('in_progress', 'in_progress'),
                    ('fiscalized', 'fiscalized'),
                ],
                default='fiscalized',
                max_length=40,
                verbose_name='Статус фискального чека',
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='activity',
            name='activity_type',
            field=models.CharField(
                choices=[
                    ('section', 'Секция'),
                    ('break', 'Перерыв'),
                    ('bonus', 'Бонус'),
                ],
                max_length=40,
                verbose_name='Тип',
            ),
        ),
    ]
