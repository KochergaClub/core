from django.views import View
from django.contrib.auth.mixins import UserPassesTestMixin

from kocherga.django.react import react_render

from .models import Call
from . import serializers


class ZadarmaManagerMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.has_perm('zadarma.manage')


class MainView(ZadarmaManagerMixin, View):
    def get(self, request):
        calls = Call.objects.all()
        return react_render(request, 'zadarma/index.tsx', {
            'calls': serializers.CallSerializer(calls, many=True).data,
        })
