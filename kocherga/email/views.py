import logging
logger = logging.getLogger(__name__)

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import MailchimpMemberSerializer
from .models import MailchimpMember


class MySubscriptionStatusView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        member = MailchimpMember.get_from_mailchimp(request.user.email)
        serializer = MailchimpMemberSerializer(member)
        return Response(
            serializer.data
        )


class ChangeSubscriptionStatusMixin:
    def post(self, request):
        email = request.user.email

        member = MailchimpMember.get_from_mailchimp(email)
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

        member = MailchimpMember.get_from_mailchimp(email)
        interest_ids = request.data['interest_ids']

        # Poor man's validation (we should use `serializer.update()` instead).
        for i in interest_ids:
            assert type(i) is str

        member.set_interests(interest_ids)

        serializer = MailchimpMemberSerializer(member)
        return Response(
            serializer.data
        )
