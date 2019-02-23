# Generated by Django 2.1.7 on 2019-02-23 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_bot', '0006_auto_20190223_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='chat_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='desc',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.BinaryField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='state',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='uid',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
