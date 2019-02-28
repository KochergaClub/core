from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from kocherga.django.react import react_render

from .models import Event


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        return react_render(request, 'events/index.tsx', {
            "events": [
                e.public_object() for e in Event.objects.filter(
                    start_ts__gte=1551305473 - 86400 * 7,
                    end_ts__lte=1551305473 + 86400 * 7,
                )
                if e.event_type == 'public'
            ]
        })
