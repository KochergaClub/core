# Generated by Django 2.2 on 2019-08-15 13:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0011_pbx_staff_member'),
        ('watchmen', '0008_uneditable_shifts'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shift', old_name='watchman', new_name='watchman_old',
        ),
        migrations.CreateModel(
            name='Watchman',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                (
                    'member',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='watchman',
                        to='staff.Member',
                    ),
                ),
            ],
        ),
    ]
