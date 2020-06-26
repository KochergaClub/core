from .mailchimp_member import MailchimpMember  # not a model
from .subscribe_channel import SubscribeChannel  # not a model

from .mailchimp_category import MailchimpCategory
from .mailchimp_interest import MailchimpInterest

__all__ = [
    'MailchimpMember',
    'SubscribeChannel',
    'MailchimpCategory',
    'MailchimpInterest',
]
