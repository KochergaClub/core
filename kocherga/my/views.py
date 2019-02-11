from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

class MainView(LoginRequiredMixin, View):
    def get(self, request):
        customer = request.user.customer if hasattr(request.user, 'customer') else None

        opposite_privacy_mode = None
        if customer:
            opposite_privacy_mode = 'public' if customer.privacy_mode == 'private' else 'private'

        return render(request, 'my/index.html', {
            'email': request.user.email,
            'is_staff': request.user.is_staff,
            'customer': customer,
            'orders': list(customer.orders()) if customer else [],
            'opposite_privacy_mode': opposite_privacy_mode,
        })

class SetPrivacyModeView(LoginRequiredMixin, View):
    def post(self, request):
        customer = request.user.customer if hasattr(request.user, 'customer') else None
        customer.privacy_mode = request.POST['privacy_mode']
        customer.full_clean()
        customer.save()
        return redirect('my:index')
