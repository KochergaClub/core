# Generated by Django 2.2 on 2019-07-27 16:55

from django.db import migrations, models


def fill_cohorts(apps, schema_editor):
    User = apps.get_model('mastermind_dating', 'User')

    for user in User.objects.all():
        user.cohorts.add(user.cohort)
        user.save()  # probably not necessary, but just to be safe


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0008_auto_20190224_1832'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='cohorts',
            field=models.ManyToManyField(to='mastermind_dating.Cohort'),
        ),
        migrations.RunPython(fill_cohorts)
    ]
