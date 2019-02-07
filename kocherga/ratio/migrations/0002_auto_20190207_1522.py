# Generated by Django 2.1.5 on 2019-02-07 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='participant',
            options={'verbose_name': 'Участник', 'verbose_name_plural': 'Участники'},
        ),
        migrations.AlterModelOptions(
            name='training',
            options={'verbose_name': 'Тренинг', 'verbose_name_plural': 'Тренинги'},
        ),
        migrations.AddField(
            model_name='participant',
            name='payment_amount',
            field=models.IntegerField(default=0, verbose_name='Размер оплаты'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='participant',
            name='first_name',
            field=models.CharField(max_length=255, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='last_name',
            field=models.CharField(max_length=255, verbose_name='Фамилия'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='payment_type',
            field=models.CharField(choices=[('website', 'Сайт'), ('timepad', 'Timepad'), ('staff', 'Стафф'), ('stipend', 'Стипендия')], max_length=40, verbose_name='Вид оплаты'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='registration_date',
            field=models.DateField(verbose_name='Дата регистрации'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='status',
            field=models.CharField(choices=[('normal', 'Участник')], max_length=40, verbose_name='Статус'),
        ),
    ]
