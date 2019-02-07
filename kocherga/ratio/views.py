from django.views import View
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.mixins import UserPassesTestMixin

from .models import Training
from .users import training2mailchimp

from urllib.parse import urlencode

class MainView(UserPassesTestMixin, View):

    def test_func(self):
        return self.request.user.has_perm('ratio.manage')

    def get(self, request):
        training = Training.objects.next_training()
        training_url = reverse('admin:ratio_training_change', args=(training.name,))
        tickets_url = reverse('admin:ratio_ticket_changelist') + '?' + urlencode({ 'training__name__exact': training.name })

        return render(request, 'ratio/main.html', {
            'training': training,
            'training_url': training_url,
            'tickets_url': tickets_url,
        })

    def post(self, request):
        training2mailchimp(Training.objects.next_training())
        return redirect('ratio:index')
