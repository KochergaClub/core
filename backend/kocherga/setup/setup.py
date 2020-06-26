# The basic deployment of Kocherga code is covered by https://gitlab.com/kocherga/code/deploy code.
# The database upgrades are covered by Django migrations.
#
# But there's also a question of setting up all our external services:
# * Mailchimp
# * VK hooks
# * Google documents
#
# This might be useful for several reasons:
# * Setting up a new environment for testing.
# * Deploying Kocherga code to the new installation bases (SaaS, franchizing, etc.)
# * Providing a more controlled and predictable way for changing our configuration
#   (i.e., not just setting up initially, but upgrading).
#
# This module should provide the way to set up all of those (but does so only partially for now).

import logging

logger = logging.getLogger(__name__)

from .vk import setup_vk
from .mailchimp import setup_mailchimp


def setup_all():
    setup_vk()
    setup_mailchimp()
