# Generated by Django 2.1.7 on 2019-02-24 15:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0007_auto_20190224_1514'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
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
                ('telegram_invite_link', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='group',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name='users',
                to='mastermind_dating.Group',
            ),
        ),
    ]
