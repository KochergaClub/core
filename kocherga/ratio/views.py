from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Training
from . import serializers
from .users import training2mailchimp
from .email import create_post_draft, create_pre_draft


class IsRatioManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('ratio.manage')


class TrainingViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsRatioManager,)
    queryset = Training.objects.all()
    serializer_class = serializers.TrainingSerializer
    lookup_field = 'name'

    @action(detail=True, methods=['post'])
    def to_mailchimp(self, request, pk=None):
        training2mailchimp(self.get_object())

    @action(detail=True, methods=['post'])
    def pre_email(self, request, pk=None):
        create_pre_draft(self.get_object())

    @action(detail=True, methods=['post'])
    def post_email(self, request, pk=None):
        create_post_draft(self.get_object())

    @action(detail=True, methods=['post'])
    def pay_salaries(self, request, pk=None):
        self.get_object().pay_salaries()

    @action(detail=True)
    def tickets(self, request, pk=None):
        tickets = self.get_object().tickets
        return Response(
            serializers.TicketSerializer(tickets, many=True).data,
        )

    @action(detail=True)
    def schedule(self, request, pk=None):
        training = self.get_object()
        return Response(
            serializers.ActivitySerializer(training.schedule, many=True).data,
        )
