# Generated by Django 3.2.4 on 2021-06-06 18:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('staff', '0001_squash_2021'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=5, verbose_name='Код')),
                ('multiplier', models.FloatField(default=1, verbose_name='Повышающий коэффициент')),
            ],
            options={
                'verbose_name': 'Грейд',
                'verbose_name_plural': 'Грейды',
            },
        ),
        migrations.CreateModel(
            name='Watchman',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.IntegerField(default=1)),
                ('grade', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='watchmen', to='watchmen.grade')),
                ('member', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='watchman', to='staff.member')),
            ],
        ),
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(db_index=True, editable=False)),
                ('shift', models.CharField(choices=[('MORNING_V1', 'MORNING_V1'), ('EVENING_V1', 'EVENING_V1'), ('MORNING', 'MORNING'), ('MIDDAY', 'MIDDAY'), ('EVENING', 'EVENING'), ('NIGHT', 'NIGHT')], editable=False, max_length=20)),
                ('is_night', models.BooleanField(default=False)),
                ('watchman', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='watchmen.watchman')),
            ],
            options={
                'db_table': 'watchmen_schedule',
                'permissions': (('manage', 'Может управлять админским расписанием'),),
                'unique_together': {('date', 'shift')},
            },
        ),
    ]
