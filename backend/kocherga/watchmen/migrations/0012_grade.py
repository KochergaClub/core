# Generated by Django 2.2 on 2019-08-15 15:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('watchmen', '0011_watchman_fk_p3'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grade',
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
                ('code', models.CharField(max_length=1, verbose_name='Код')),
                (
                    'multiplier',
                    models.FloatField(default=1, verbose_name='Повышающий коэффициент'),
                ),
            ],
            options={'verbose_name': 'Грейд', 'verbose_name_plural': 'Грейды',},
        ),
        migrations.AlterField(
            model_name='watchman',
            name='member',
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='watchman',
                to='staff.Member',
            ),
        ),
        migrations.AddField(
            model_name='watchman',
            name='grade',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name='watchmen',
                to='watchmen.Grade',
            ),
        ),
    ]
