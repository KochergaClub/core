import logging
logger = logging.getLogger(__name__)

from dataclasses import dataclass

import kocherga.mailchimp

from rest_framework.exceptions import APIException


# This function is potentially cacheable.
def get_sub_interests():
    sub_interests = kocherga.mailchimp.get_interests(
        kocherga.mailchimp.interest_category_by_name('Подписки')['id']
    )
    return [
        {
            'id': i['id'],
            'name': i['name']
        }
        for i in sub_interests
    ]


class BadMailchimpStatus(APIException):
    status_code = 403
    default_detail = "Current mailchimp status is not compatible with this operation"


@dataclass
class MemberInterest:
    # TODO - replace interest data with FK to MailchimpInterest model
    id: str
    name: str
    subscribed: bool


class MailchimpMember:
    def __init__(self, email, status, interests=None):
        self.email = email
        self.status = status
        self.interests = interests

    @classmethod
    def get_from_mailchimp(cls, email):
        try:
            member = kocherga.mailchimp.get_member_by_email(email)
        except kocherga.mailchimp.MailchimpException as e:
            if e.status_code == 404:
                return cls(email, 'none')
            raise

        obj = cls(email, member['status'])

        sub_interests = get_sub_interests()

        obj.interests = [
            MemberInterest(
                id=interest['id'],
                name=interest['name'],
                subscribed=member['interests'].get(interest['id'], False),
            )
            for interest in sub_interests
        ]
        return obj

    def get_hash(self):
        return kocherga.mailchimp.subscriber_hash(self.email)

    def set_status(self, new_status, check_old_status=None):
        if check_old_status:
            logger.info('Current status: ' + self.status + ', needed status: ' + check_old_status)
            if check_old_status != self.status:
                raise BadMailchimpStatus()

        subscriber_hash = self.get_hash()
        kocherga.mailchimp.api_call(
            'PATCH',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/members/{subscriber_hash}',
            {
                'status': new_status
            }
        )
        self.status = new_status
        logger.info('Updated to status: ' + self.status)

    def get_interest_ids(self):
        return [interest.id for interest in self.interests]

    def subscribe_to_interest(self, interest_id):
        self.set_interests(
            list(
                set(self.get_interest_ids()) | set([interest_id])
            )
        )

    def unsubscribe_from_interest(self, interest_id):
        self.set_interests(
            list(
                set(self.get_interest_ids()) - set([interest_id])
            )
        )

    def set_interests(self, interest_ids):
        if self.status != 'subscribed':
            raise BadMailchimpStatus()

        subscriber_hash = kocherga.mailchimp.subscriber_hash(self.email)
        new_interests = {
            i.id: (i.id in interest_ids)
            for i in self.interests
        }
        logger.info('Updating interests: ' + str(new_interests))

        kocherga.mailchimp.api_call(
            'PATCH',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/members/{subscriber_hash}',
            {
                'interests': new_interests
            }
        )

        # update local object after remote call
        for interest in self.interests:
            interest.subscribed = (interest.id in interest_ids)
