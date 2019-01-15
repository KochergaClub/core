from django.db import models

from datetime import datetime
from kocherga.datetime import TZ

from typing import Optional

class State(models.Model):
    name = models.CharField(primary_key=True, max_length=100)
    until_dt = models.DateTimeField(null=True)
    last_dt = models.DateTimeField(null=True)
    last_exception = models.CharField(max_length=1024, null=True)

    class Meta:
        db_table = 'importers_state'

    def __str__(self):
        return self.name

def dt_now():
    return datetime.now(TZ)

class LogEntry(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    start_dt = models.DateTimeField(default=dt_now)
    end_dt = models.DateTimeField(null=True)
    exception = models.TextField(null=True)

    class Meta:
        db_table = 'importers_log'
