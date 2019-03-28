from itertools import groupby

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
        pbx_calls = [
            serializers.CallSerializer(g, many=True).data
            for k, g in groupby(calls, key=lambda call: call.pbx_call_id)
        ]

        return react_render(request, 'zadarma/index.tsx', {
            'pbx_calls': pbx_calls,
        })


class PbxCallView(ZadarmaManagerMixin, View):
    def get(self, request, pbx_call_id):
        calls = Call.objects.filter(pbx_call_id=pbx_call_id)

        return react_render(request, 'zadarma/pbx_call.tsx', {
            'pbx_call': serializers.CallSerializer(calls, many=True).data
        })
