# Generated by Django 2.1.5 on 2019-01-15 22:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0006_remove_cm_card_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='cm_customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='staff_member', to='cm.Customer'),
        ),
        migrations.AlterField(
            model_name='member',
            name='cm_login',
            field=models.CharField(blank=True, max_length=255, verbose_name='Логин в CM'),
        ),
        migrations.AlterField(
            model_name='member',
            name='full_name',
            field=models.CharField(max_length=80, verbose_name='Полное имя'),
        ),
        migrations.AlterField(
            model_name='member',
            name='gender',
            field=models.CharField(choices=[('MALE', 'М'), ('FEMALE', 'Ж')], max_length=10, null=True, verbose_name='Пол'),
        ),
        migrations.AlterField(
            model_name='member',
            name='is_current',
            field=models.BooleanField(verbose_name='Текущий сотрудник'),
        ),
        migrations.AlterField(
            model_name='member',
            name='role',
            field=models.CharField(choices=[('FOUNDER', 'Основатель'), ('MANAGER', 'Менеджер'), ('VIDEOMANAGER', 'Видеоменеджер'), ('WATCHMAN', 'Админ'), ('TRAINER', 'Тренер'), ('CONSULTANT', 'Внешний консультант'), ('VOLUNTEER', 'Волонтёр')], max_length=20, verbose_name='Должность'),
        ),
        migrations.AlterField(
            model_name='member',
            name='short_name',
            field=models.CharField(blank=True, max_length=20, verbose_name='Короткое имя'),
        ),
        migrations.AlterField(
            model_name='member',
            name='vk',
            field=models.URLField(blank=True, max_length=255, verbose_name='Профиль VK'),
        ),
    ]
