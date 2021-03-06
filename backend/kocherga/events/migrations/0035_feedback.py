# Generated by Django 2.2.5 on 2019-10-22 22:32

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import kocherga.events.models.feedback


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0034_no_google_fields'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
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
                (
                    'overall_score',
                    kocherga.events.models.feedback.ScoreField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(10),
                        ],
                    ),
                ),
                (
                    'recommend_score',
                    kocherga.events.models.feedback.ScoreField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(10),
                        ],
                    ),
                ),
                (
                    'content_score',
                    kocherga.events.models.feedback.ScoreField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(10),
                        ],
                    ),
                ),
                (
                    'conductor_score',
                    kocherga.events.models.feedback.ScoreField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(10),
                        ],
                    ),
                ),
                (
                    'source',
                    models.CharField(
                        blank=True,
                        choices=[
                            ('FRIEND', 'Знакомые'),
                            ('VK', 'ВКонтакте'),
                            ('FB', 'Facebook'),
                            ('TIMEPAD', 'Timepad'),
                            ('EMAIL', 'Почтовая рассылка'),
                            ('WEBSITE', 'Сайт Кочерги'),
                        ],
                        max_length=20,
                    ),
                ),
                ('custom_source', models.CharField(blank=True, max_length=1024)),
                ('comment', models.TextField()),
                (
                    'event',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='feedbacks',
                        to='events.Event',
                    ),
                ),
            ],
        ),
    ]
