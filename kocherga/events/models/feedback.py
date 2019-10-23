from django.db import models
from django.core import validators


class ScoreField(models.IntegerField):
    def __init__(self, *args, **kwargs):
        kwargs['null'] = True
        kwargs['blank'] = True
        kwargs['validators'] = [
            validators.MinValueValidator(0),
            validators.MaxValueValidator(10),
        ]
        super().__init__(*args, **kwargs)


class Feedback(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='feedbacks')

    overall_score = ScoreField()
    recommend_score = ScoreField()
    content_score = ScoreField()
    conductor_score = ScoreField()

    source = models.CharField(
        max_length=20,
        choices=[
            ('FRIEND', 'Знакомые'),
            ('VK', 'ВКонтакте'),
            ('FB', 'Facebook'),
            ('TIMEPAD', 'Timepad'),
            ('EMAIL', 'Почтовая рассылка'),
            ('WEBSITE', 'Сайт Кочерги'),
        ],
        blank=True
    )

    custom_source = models.CharField(
        max_length=1024,
        blank=True,
    )

    comment = models.TextField()
