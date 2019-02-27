from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from kocherga.django.react import react_render


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        return react_render(request, 'events/index.tsx')
