from __future__ import annotations
import logging

logger = logging.getLogger(__name__)

from typing import List

from .base import ExternalAccount, ExternalService

import kocherga.wiki


class WikiAccount(ExternalAccount):
    def __init__(self, service: WikiService, name: str):
        self.service = service
        self.name = name


class WikiService(ExternalService):
    slug = 'wiki'
    account_class = WikiAccount

    def grant_account(self, user, password: str):
        if not hasattr(user, 'staff_member'):
            raise Exception("Can grant wiki permissions for staff members only")

        logger.info('Creating wiki account')
        wiki = kocherga.wiki.get_wiki()
        wiki.api(action='query', meta='tokens', type='createaccount')
        wiki_token = wiki.api(action='query', meta='tokens', type='createaccount')[
            'query'
        ]['tokens']['createaccounttoken']

        wiki.post(
            action='createaccount',
            createtoken=wiki_token,
            username=user.staff_member.full_name,
            password=password,
            retype=password,
            createreturnurl='https://kocherga.club',
        )

        return WikiAccount(service=self, name=user.staff_member.full_name)

    def revoke_account(self, account):
        raise NotImplementedError()

    def list_accounts(self) -> List[WikiAccount]:
        wiki = kocherga.wiki.get_wiki()
        allusers = wiki.allusers(prop="blockinfo")
        wiki_team = [u for u in allusers if not u.get("blockid")]

        result = []
        for wiki_user in wiki_team:
            if wiki_user["name"] == "Flow talk page manager":
                continue
            result.append(WikiAccount(service=self, name=wiki_user["name"]))

        return result

    def user_account(self, user):
        # only staff members can be checked
        if not hasattr(user, 'staff_member'):
            return None

        accounts = self.list_accounts()
        account = next(
            (
                account
                for account in accounts
                if account.name == user.staff_member.full_name
            ),
            None,
        )
        return account


import kocherga.slack.models


class SlackAccount(ExternalAccount):
    def __init__(self, service: SlackService, email: str):
        self.service = service
        self.email = email


class SlackService(ExternalService):
    slug = 'slack'
    account_class = SlackAccount

    def grant_account(self, user):
        raise NotImplementedError()

    def revoke_account(self, account):
        raise NotImplementedError()

    def _account_from_db_object(self, obj: kocherga.slack.models.User):
        return SlackAccount(service=self, email=obj.email)

    def list_accounts(self):
        slack_users = kocherga.slack.models.User.objects.filter(deleted=False)
        return [self._account_from_db_object(slack_user) for slack_user in slack_users]

    def user_account(self, user):
        try:
            slack_user = kocherga.slack.models.User.objects.get(email=user.email)
        except kocherga.slack.models.User.DoesNotExist:
            return None
        return self._account_from_db_object(slack_user)


def all_services():
    return [
        # WikiService(),
        SlackService(),
    ]
