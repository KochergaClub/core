# Generated by Django 2.2 on 2019-07-28 18:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0016_vote_participant_p2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vote',
            name='who',
        ),
        migrations.RemoveField(
            model_name='vote',
            name='whom',
        ),
    ]
