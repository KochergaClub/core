from django.db import models

from .event import Event


class VkAnnouncement(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='vk_announcement')
    link = models.CharField(max_length=1024, blank=True)

    group = models.CharField(max_length=40, blank=True)
    image = models.CharField(max_length=32, blank=True)


class FbAnnouncement(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='fb_announcement')
    link = models.CharField(max_length=1024, blank=True)

    group = models.CharField(max_length=40, blank=True)


class TimepadAnnouncement(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='timepad_announcement')
    link = models.CharField(max_length=1024, blank=True)

    category_code = models.CharField(max_length=40, blank=True)
    prepaid_tickets = models.BooleanField(default=False)
