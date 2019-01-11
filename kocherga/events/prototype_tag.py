import logging
logger = logging.getLogger(__name__)

from django.db import models

class EventPrototypeTag(models.Model):
    class Meta:
        db_table = 'event_prototype_tags'
        unique_together = (
            ('prototype', 'name'),
        )
        managed = False

    id = models.IntegerField(primary_key=True)
    prototype = models.ForeignKey('EventPrototype', on_delete=models.CASCADE)

    name = models.CharField(max_length=40)
