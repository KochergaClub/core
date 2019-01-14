from django.contrib import admin

from .models import Event, EventPrototype

admin.site.register(Event)
admin.site.register(EventPrototype)
