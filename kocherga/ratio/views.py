from django.views import View
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.mixins import UserPassesTestMixin

from .models import Training
from .users import training2mailchimp

from urllib.parse import urlencode

class RatioManagerMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.has_perm('ratio.manage')


class MainView(RatioManagerMixin, View):
    def get(self, request):
        trainings = Training.objects.all()
        return render(request, 'ratio/index.html', {
            'trainings': trainings,
        })


class TrainingView(RatioManagerMixin, View):
    def get(self, request, name):
        training = Training.objects.get(name=name)
        training_url = reverse('admin:ratio_training_change', args=(training.name,))
        tickets_url = reverse('admin:ratio_ticket_changelist') + '?' + urlencode({ 'training__name__exact': training.name })

        return render(request, 'ratio/training.html', {
            'training': training,
            'training_url': training_url,
            'tickets_url': tickets_url,
        })

    def post(self, request, name):
        training2mailchimp(Training.objects.get(name=name))
        return redirect('ratio:index')
