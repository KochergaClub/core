from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

class MainView(LoginRequiredMixin, View):
    def get(self, request):
        customer = request.user.customer if hasattr(request.user, 'customer') else None
        return render(request, 'my/index.html', {
            'email': request.user.email,
            'is_staff': request.user.is_staff,
            'customer': customer,
            'orders': list(customer.orders()) if customer else []
        })
