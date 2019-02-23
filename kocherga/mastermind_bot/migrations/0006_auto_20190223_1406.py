# Generated by Django 2.1.7 on 2019-02-23 11:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_auto_20190217_1432'),
        ('mastermind_bot', '0005_user_chat_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cohort',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='events.Event')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='cohort',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='mastermind_bot.Cohort'),
        ),
    ]
