from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

class MainView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'my/index.html', {
            'email': request.user.email,
            'customer': request.user.customer if hasattr(request.user, 'customer') else None,
        })
