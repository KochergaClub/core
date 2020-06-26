from django.db import models

from .training import Training


class TrainingDay(models.Model):
    date = models.DateField('Дата')
    training = models.ForeignKey(
        Training, verbose_name='Тренинг', on_delete=models.CASCADE, related_name='days'
    )

    class Meta:
        ordering = ('date',)
        verbose_name = 'День тренинга'
        verbose_name_plural = 'Дни тренинга'
        unique_together = ('date', 'training')

    def __str__(self):
        return f'[{self.pk}] {self.training.slug} / {self.date:%Y-%m-%d}'
