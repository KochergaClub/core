import datetime

from rest_framework import viewsets, permissions, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from kocherga.django.pagination import CommonPagination

from kocherga.money.cashier.views import IsKkmUser

from . import serializers, models, email
from .users import training2mailchimp


class IsRatioManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('ratio.manage')


class TrainingViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    permission_classes = (IsRatioManager,)
    queryset = models.Training.objects.all()
    serializer_class = serializers.TrainingSerializer
    pagination_class = CommonPagination
    lookup_field = 'slug'

    @action(detail=True, methods=['post'])
    def to_mailchimp(self, request, slug=None):
        training2mailchimp(self.get_object())
        return Response('ok')

    @action(detail=True, methods=['post'])
    def email(self, request, slug=None):
        title = request.data['title']
        content = request.data['content']
        result = email.create_any_draft(self.get_object(), title, content)
        return Response({
            'draft_link': result['draft_link'],
        })

    @action(detail=True)
    def email_prototype_pre(self, request, slug=None):
        return Response({
            'content': email.get_pre_content(self.get_object()),
        })

    @action(detail=True)
    def email_prototype_post(self, request, slug=None):
        return Response({
            'content': email.get_post_content(self.get_object()),
        })

    @action(detail=True, methods=['post'])
    def pay_salaries(self, request, slug=None):
        self.get_object().pay_salaries()
        return Response('ok')

    @action(detail=True)
    def tickets(self, request, slug=None):
        training_tickets = self.get_object().tickets
        return Response(
            serializers.TicketSerializer(training_tickets, many=True).data,
        )

    @action(detail=True)
    def schedule(self, request, slug=None):
        training = self.get_object()
        return Response(
            serializers.TrainingDaySerializer(training.days, many=True).data,
        )

    @action(detail=True, methods=['post'])
    def add_day(self, request, slug=None):
        training = self.get_object()
        date_str = request.data['date']
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        training_day = training.add_day(date)
        return Response(
            serializers.TrainingDaySerializer(training_day).data,
        )

    @action(detail=True, methods=['post'])
    def copy_schedule_from(self, request, slug=None):
        training = self.get_object()
        src_training_slug = request.data['src_training_slug']
        src_training = models.Training.objects.get(slug=src_training_slug)
        training.copy_schedule_from(src_training)
        return Response('ok')


class TrainingDayViewSet(viewsets.ModelViewSet):
    permission_classes = (IsRatioManager,)
    queryset = models.TrainingDay.objects.all()
    serializer_class = serializers.TrainingDaySerializer


class ActivityViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsRatioManager,)
    queryset = models.Activity.objects.all()
    serializer_class = serializers.ActivitySerializer

    @action(detail=True, methods=['post'])
    def set_trainer(self, request, **kwargs):
        trainer_name = request.data['name']
        trainer = models.Trainer.objects.get(long_name=trainer_name)
        activity = self.get_object()
        activity.trainer = trainer
        activity.save()
        return Response('ok')

    @action(detail=True, methods=['post'])
    def unset_trainer(self, request, **kwargs):
        activity = self.get_object()
        activity.trainer = None
        activity.save()
        return Response('ok')


class TrainerViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsRatioManager,)
    queryset = models.Trainer.objects.all()
    serializer_class = serializers.TrainerSerializer


class TicketViewSet(viewsets.ModelViewSet):
    permission_classes = (IsRatioManager,)
    queryset = models.Ticket.objects.all()
    serializer_class = serializers.TicketSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsRatioManager, IsKkmUser])
    def fiscalize(self, request, pk=None):
        self.get_object().fiscalize()
        return Response('ok')
