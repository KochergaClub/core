from __future__ import annotations

from typing import List, Optional, TypeVar, Generic
from abc import abstractmethod, ABC


class ExternalAccount(ABC):
    service: ExternalService

    def __init__(self, service: ExternalService):
        self.service = service

    def revoke(self):
        return self.service.revoke_account(self)


class ExternalService(ABC):
    # property classmethods are messy and verbose, please just don't forget to set:
    # - slug: str
    # - account_class: ExternalAccount

    # @property
    # @classmethod
    # @abstractmethod
    # def slug(cls) -> str:
    #     ...

    # @property
    # @classmethod
    # @abstractmethod
    # def account_class(cls) -> ExternalAccount:
    #     ...

    @abstractmethod
    def grant_account(self, user, **kwargs) -> ExternalAccount:
        ...

    # account.revoke
    @abstractmethod
    def revoke_account(self, account: ExternalAccount):
        ...

    @abstractmethod
    def list_accounts(self) -> List[ExternalAccount]:
        ...

    @abstractmethod
    def user_account(self, user) -> Optional[ExternalAccount]:
        ...
