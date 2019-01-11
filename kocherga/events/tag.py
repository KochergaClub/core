import logging
logger = logging.getLogger(__name__)

from django.db import models

class Tag(models.Model):
    class Meta:
        db_table= "event_tags"
        unique_together = (
            ('event', 'name'),
        )
        managed = False

    id = models.IntegerField(primary_key=True)
    event = models.ForeignKey('Event', on_delete=models.CASCADE)

    name = models.CharField(max_length=40)
