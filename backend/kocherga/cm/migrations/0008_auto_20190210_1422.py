# Generated by Django 2.1.5 on 2019-02-10 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cm', '0007_customer_privacy_mode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='fb_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='instagram_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone_number2',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name='customer',
            name='ref',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='ref2',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='skype_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='twitter_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='vk_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='customer',
            name='website_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
    ]
