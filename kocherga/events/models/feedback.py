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

    overall_score = ScoreField('Насколько вам понравилось мероприятие в целом?')
    recommend_score = ScoreField('Насколько вероятно, что вы порекомендуете такое мероприятие знакомым?')
    content_score = ScoreField('Насколько вам было интересно содержание?')
    conductor_score = ScoreField('Насколько вы довольны работой ведущих?')

    source = models.CharField(
        'Откуда вы узнали про мероприятие?',
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
        'Откуда вы узнали про мероприятие? (свой вариант)',
        max_length=1024,
        blank=True,
    )

    comment = models.TextField(
        'Что можно улучшить?',
        blank=True,
    )
