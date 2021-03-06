# Generated by Django 3.0.10 on 2020-11-08 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OfdDocument',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('timestamp', models.IntegerField()),
                ('cash', models.DecimalField(decimal_places=2, max_digits=10)),
                ('electronic', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('check_type', models.CharField(choices=[('income', 'income'), ('refund_income', 'refund_income'), ('expense', 'expense'), ('refund_expense', 'refund_expense')], max_length=40)),
                ('shift_id', models.IntegerField()),
                ('request_id', models.IntegerField()),
                ('operator', models.CharField(max_length=255)),
                ('operator_inn', models.BigIntegerField(null=True)),
                ('fiscal_sign', models.BigIntegerField()),
                ('midday_ts', models.IntegerField()),
            ],
        ),
    ]
