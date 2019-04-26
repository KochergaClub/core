from django.views import View

from kocherga.django.react import react_render


class MainView(View):
    def get(self, request):
        return react_render(request, 'projects/index', {})


class DetailView(View):
    def get(self, request, name):
        return react_render(request, 'projects/detail', {
            'name': name,
        })
