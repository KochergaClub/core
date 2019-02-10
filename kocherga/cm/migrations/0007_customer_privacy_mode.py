# Generated by Django 2.1.5 on 2019-02-10 11:04

from django.db import migrations, models

def fill_privacy_mode_from_cm(apps, schema_editor):
    Customer = apps.get_model('cm', 'Customer')
    for customer in Customer.objects.all():
        if customer.comment and 'PRIVACY:PUBLIC' in customer.comment:
            customer.privacy_mode = 'public'
        customer.save()


class Migration(migrations.Migration):

    dependencies = [
        ('cm', '0006_customer_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='privacy_mode',
            field=models.CharField(choices=[('private', 'private'), ('public', 'public')], default='private', max_length=40, verbose_name='Приватность'),
        ),
        migrations.RunPython(fill_privacy_mode_from_cm),
    ]
