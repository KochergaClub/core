# Generated by Django 2.1.5 on 2019-02-07 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0008_auto_20190207_2147'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='mailchimp_interest_id',
            field=models.CharField(blank=True, max_length=20, verbose_name='ID Mailchimp-группы'),
        ),
    ]