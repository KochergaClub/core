# Generated by Django 2.1.7 on 2019-03-18 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0015_auto_20190208_1603'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='activity',
            options={'ordering': ('day', 'time'), 'verbose_name': 'Активность', 'verbose_name_plural': 'Активности'},
        ),
        migrations.AddField(
            model_name='trainer',
            name='post_survey_collected',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='comment',
            field=models.TextField(blank=True),
        ),
    ]