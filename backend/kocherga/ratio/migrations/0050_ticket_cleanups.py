# Generated by Django 3.0.10 on 2020-10-17 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0049_extract_presentations'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='fiscalization_status',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='paid',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='payment_type',
        ),
        migrations.AlterField(
            model_name='ticket',
            name='ticket_type',
            field=models.CharField(choices=[('normal', 'Обычный'), ('stipend', 'Стипендия'), ('staff', 'Стафф'), ('replacement', 'Замена (заменяет другого участника)'), ('carry-over', 'Перенос (с прошлого мероприятия)'), ('free-repeat', 'Бесплатный повтор')], default='normal', max_length=40, verbose_name='Тип билета'),
        ),
    ]