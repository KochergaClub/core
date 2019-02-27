from django.shortcuts import redirect
from django.views import View
from django.urls import reverse
from django.contrib.auth.mixins import LoginRequiredMixin

from kocherga.django.react import react_render

from kocherga.cm.serializers import CustomerSerializer


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        customer = request.user.customer if hasattr(request.user, 'customer') else None
        props = {
            'email': request.user.email,
            'is_staff': request.user.is_staff,
            'urls': {
                'set_privacy_mode': reverse('my:set-privacy-mode'),
            }
        }
        if customer:
            props['customer'] = CustomerSerializer(customer).data
            props['orders_count'] = customer.orders().count()

        return react_render(request, 'my/index.tsx', props)


class SetPrivacyModeView(LoginRequiredMixin, View):
    def post(self, request):
        customer = request.user.customer if hasattr(request.user, 'customer') else None
        customer.privacy_mode = request.POST['privacy_mode']
        customer.full_clean()
        customer.save()
        return redirect('my:index')
