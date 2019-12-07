# Generated by Django 2.1.5 on 2019-01-15 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watchmen_routine', '0005_rewardimage_is_active'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='rewardimage',
            options={'verbose_name': 'Добрый мем', 'verbose_name_plural': 'Добрые мемы'},
        ),
        migrations.AlterModelOptions(
            name='schedule',
            options={'verbose_name': 'Расписания', 'verbose_name_plural': 'Расписание'},
        ),
        migrations.AlterModelOptions(
            name='task',
            options={'verbose_name': 'Задача', 'verbose_name_plural': 'Задачи'},
        ),
        migrations.AlterField(
            model_name='rewardimage',
            name='image_link',
            field=models.URLField(max_length=255, verbose_name='Ссылка'),
        ),
        migrations.AlterField(
            model_name='rewardimage',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Используется'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='period',
            field=models.IntegerField(default=1, help_text='Повторять каждые N недель', verbose_name='Периодичность'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='weekday',
            field=models.IntegerField(choices=[(0, 'Понедельник'), (1, 'Вторник'), (2, 'Среда'), (3, 'Четверг'), (4, 'Пятница'), (5, 'Суббота'), (6, 'Воскресенье')], verbose_name='День недели'),
        ),
        migrations.AlterField(
            model_name='task',
            name='channel',
            field=models.CharField(default='watchmen', max_length=40, verbose_name='Канал'),
        ),
        migrations.AlterField(
            model_name='task',
            name='name',
            field=models.TextField(max_length=1024, verbose_name='Название'),
        ),
    ]