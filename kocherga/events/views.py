from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from kocherga.django.react import react_render

from .models import Event
from .serializers import PublicEventSerializer


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        events = Event.objects.filter(
            start_ts__gte=1551305473 - 86400 * 7 * 3,
            end_ts__lte=1551305473 + 86400 * 7 * 3,
            event_type='public',
        )

        return react_render(request, 'events/index.tsx', {
            "events": PublicEventSerializer(events, many=True).data,
        })
