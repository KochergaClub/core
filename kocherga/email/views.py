import logging
logger = logging.getLogger(__name__)

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, mixins, exceptions

from . import serializers
from . import models


class MySubscriptionStatusView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        member = models.MailchimpMember.get_from_mailchimp(request.user.email)
        serializer = serializers.MailchimpMemberSerializer(member)
        return Response(
            serializer.data
        )


class ChangeSubscriptionStatusMixin:
    def post(self, request):
        email = request.user.email

        member = models.MailchimpMember.get_from_mailchimp(email)
        member.set_status(self.to_status, check_old_status=self.from_status)

        return Response('ok')


class ResubscribeView(APIView, ChangeSubscriptionStatusMixin):
    from_status = 'unsubscribed'
    to_status = 'pending'
    permission_classes = (IsAuthenticated,)


class UnsubscribeView(APIView, ChangeSubscriptionStatusMixin):
    from_status = 'subscribed'
    to_status = 'unsubscribed'
    permission_classes = (IsAuthenticated,)


class UpdateInterestsView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        email = request.user.email

        member = models.MailchimpMember.get_from_mailchimp(email)
        interest_ids = request.data['interest_ids']

        # Poor man's validation (we should use `serializer.update()` instead).
        for i in interest_ids:
            assert type(i) is str

        member.set_interests(interest_ids)

        serializer = serializers.MailchimpMemberSerializer(member)
        return Response(
            serializer.data
        )


class EmptyEmailException(exceptions.APIException):
    status_code = 400
    default_detail = 'Email is not set'


class SubscribeChannelViewSet(viewsets.ModelViewSet):
    queryset = models.SubscribeChannel.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = serializers.SubscribeChannelSerializer

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def subscribe(self, request, pk):
        channel = self.get_object()

        email = request.data.get('EMAIL') or request.data.get('email')
        if not email:
            raise EmptyEmailException()

        channel.subscribe_email(email)
        return Response('ok')


class MailchimpCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.MailchimpCategory.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = serializers.MailchimpCategorySerializer
