from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import redirect
from django.views.decorators.http import require_POST

from kocherga.django.react import react_render

from .models import Cheque
from . import serializers


@staff_member_required
def index(request):
    cheques = Cheque.objects.all()

    return react_render(request, 'cashier/index.tsx', {
        'cheques': serializers.ChequeSerializer(cheques, many=True).data,
    })


@staff_member_required
@require_POST
def cheque_redeem(request, id: int):
    cheque = Cheque.objects.get(pk=id)
    cheque.redeem()

    return redirect('cashier:index')
