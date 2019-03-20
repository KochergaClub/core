# Generated by Django 2.1.7 on 2019-03-19 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0008_auto_20190320_0230'),
        ('cashier', '0002_date_without_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cheque',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('dt', models.DateTimeField(auto_now_add=True)),
                ('cashed_date', models.DateTimeField(blank=True, null=True)),
                ('comment', models.TextField(blank=True)),
                ('whom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cheques', to='staff.Member')),
            ],
        ),
    ]
