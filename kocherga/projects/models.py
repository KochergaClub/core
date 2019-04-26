from django.db import models

from wagtail.core.models import Page


class ProjectPage(Page):
    title = models.CharField(max_length=100)
