# Generated by Django 3.1.3 on 2020-11-15 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kkm', '0009_new_ofddocument_pk'),
    ]

    operations = [
        migrations.CreateModel(
            name='Controller',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_shift_closed', models.DateTimeField(verbose_name='Время последнего закрытия смены')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
