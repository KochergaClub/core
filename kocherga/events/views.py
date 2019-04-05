from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from kocherga.django.react import react_render

from .models import Event
from .serializers import PublicEventSerializer

from datetime import datetime
from kocherga.dateutils import TZ


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        events = Event.objects.filter(
            start__gte=datetime.fromtimestamp(1551305473 - 86400 * 7 * 3, TZ),
            end__lte=datetime.fromtimestamp(1551305473 + 86400 * 7 * 3, TZ),
            event_type='public',
        )

        return react_render(request, 'events/index.tsx', {
            "events": PublicEventSerializer(events, many=True).data,
        })
