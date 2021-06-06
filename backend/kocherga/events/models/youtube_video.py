from django.db import models

from .event import Event


class YoutubeVideo(models.Model):
    embed_id = models.CharField(max_length=40, unique=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='youtube_videos')
