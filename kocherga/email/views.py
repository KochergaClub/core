import logging
logger = logging.getLogger(__name__)

from typing import Optional

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import APIException

import kocherga.mailchimp


def get_status(email) -> Optional[str]:
    subscriber_hash = kocherga.mailchimp.subscriber_hash(email)
    try:
        response = kocherga.mailchimp.api_call(
            'GET',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/members/{subscriber_hash}'
        )
    except kocherga.mailchimp.MailchimpException as e:
        if e.status_code == 404:
            return None
        raise

    return response['status']


class MySubscriptionStatusView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        status = get_status(request.user.email)
        if not status:
            return Response('none')
        return Response(status)


class BadMailchimpStatus(APIException):
    status_code = 403
    default_detail = "Current mailchimp status is not compatible with this operation"


class ChangeSubscriptionStatusMixin:
    def post(self, request):
        email = request.user.email

        status = get_status(email)
        logger.info('Current status: ' + status)
        logger.info('from_status: ' + self.from_status)
        if status != self.from_status:
            raise BadMailchimpStatus()

        subscriber_hash = kocherga.mailchimp.subscriber_hash(email)
        kocherga.mailchimp.api_call(
            'PATCH',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/members/{subscriber_hash}',
            {
                'status': self.to_status
            }
        )
        return Response('ok')


class ResubscribeView(APIView, ChangeSubscriptionStatusMixin):
    from_status = 'unsubscribed'
    to_status = 'pending'
    permission_classes = (IsAuthenticated,)


class UnsubscribeView(APIView, ChangeSubscriptionStatusMixin):
    from_status = 'subscribed'
    to_status = 'unsubscribed'
    permission_classes = (IsAuthenticated,)
