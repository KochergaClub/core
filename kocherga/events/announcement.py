from abc import ABC, abstractmethod


class BaseAnnouncement(ABC):

    @property
    @abstractmethod
    def link(self):
        pass
