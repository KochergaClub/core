# Generated by Django 2.1.5 on 2019-01-13 09:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_id', models.IntegerField(primary_key=True, serialize=False)),
                ('card_id', models.BigIntegerField(db_index=True)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=20)),
                ('email', models.CharField(db_index=True, max_length=255)),
                ('time_discount', models.IntegerField()),
                ('is_active', models.BooleanField()),
                ('subscription_until', models.DateField(null=True)),
                ('comment', models.TextField()),
                ('phone_number', models.CharField(max_length=40)),
                ('phone_number2', models.CharField(max_length=40)),
                ('vk_link', models.CharField(max_length=1024)),
                ('fb_link', models.CharField(max_length=1024)),
                ('twitter_link', models.CharField(max_length=1024)),
                ('instagram_link', models.CharField(max_length=1024)),
                ('skype_link', models.CharField(max_length=1024)),
                ('website_link', models.CharField(max_length=1024)),
                ('birthday', models.DateField(null=True)),
                ('address', models.CharField(max_length=1024)),
                ('ref', models.CharField(max_length=1024)),
                ('ref2', models.CharField(max_length=1024)),
                ('mailing_list', models.BooleanField()),
                ('goods_discount', models.IntegerField()),
                ('activity_started', models.DateTimeField(null=True)),
                ('activity_ended', models.DateTimeField(null=True)),
                ('last_visit', models.DateField(null=True)),
                ('total_spent', models.IntegerField()),
            ],
            options={'db_table': 'cm_customers',},
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.IntegerField(primary_key=True, serialize=False)),
                ('card_id', models.BigIntegerField(db_index=True)),
                ('start_ts', models.IntegerField(db_index=True)),
                ('end_ts', models.IntegerField(db_index=True)),
                ('imported_ts', models.IntegerField()),
                ('log_imported_ts', models.IntegerField(null=True)),
                ('people', models.IntegerField()),
                ('visit_length', models.IntegerField()),
                ('full_visit_length', models.IntegerField()),
                ('order_value', models.IntegerField()),
                ('time_value', models.IntegerField()),
                ('stuff_value', models.IntegerField()),
                ('payment_type', models.CharField(max_length=20)),
                ('is_fixed', models.CharField(max_length=20)),
                ('client_name', models.CharField(max_length=255)),
                ('manager', models.CharField(max_length=255)),
                ('tariff_time', models.CharField(max_length=20)),
                ('tariff_plan', models.CharField(max_length=40)),
                ('comment', models.CharField(max_length=1024)),
                ('history', models.TextField()),
            ],
            options={'db_table': 'cm_orders',},
        ),
        migrations.CreateModel(
            name='OrderLogEntry',
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
                ('operation_id', models.IntegerField()),
                ('operation', models.CharField(max_length=1024)),
                ('ts', models.IntegerField(db_index=True)),
                ('login', models.CharField(max_length=80)),
                (
                    'order',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to='cm.Order'
                    ),
                ),
            ],
            options={'db_table': 'cm_order_log',},
        ),
        migrations.CreateModel(
            name='SubscriptionOrder',
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
                ('card_id', models.BigIntegerField()),
                ('ts', models.IntegerField()),
                ('order_value', models.IntegerField()),
                ('payment_type', models.CharField(max_length=20)),
                ('client_name', models.CharField(max_length=255)),
                ('manager', models.CharField(max_length=255)),
            ],
            options={'db_table': 'cm_subscription_orders',},
        ),
        migrations.AlterUniqueTogether(
            name='subscriptionorder', unique_together={('card_id', 'ts')},
        ),
        migrations.AlterUniqueTogether(
            name='orderlogentry', unique_together={('order', 'operation_id')},
        ),
    ]
