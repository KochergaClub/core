from django.db import models

class Task(models.Model):
    name = models.TextField(max_length=1024)
    channel = models.CharField(default='watchmen', max_length=40)

    def __str__(self):
        return self.name

    def days_string(self):
        return ','.join(
            str(s)
            for s in self.schedules.all()
        )

class Schedule(models.Model):
    weekday = models.IntegerField(
        choices=(
            (0, 'Понедельник'),
            (1, 'Вторник'),
            (2, 'Среда'),
            (3, 'Четверг'),
            (4, 'Пятница'),
            (5, 'Суббота'),
            (6, 'Воскресенье'),
        )
    )
    period = models.IntegerField(default=1)

    routine = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='schedules')

    @property
    def weekday_short(self):
        return ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'][self.weekday]

    def __str__(self):
        result = self.weekday_short
        if self.period != 1:
            result += '/' + str(self.period)
        return result
