import asyncio
import logging
from asyncio import Future
from typing import TypeVar, Awaitable

from aiogram.dispatcher.filters import Filter, BoundFilter
from aiogram.types import Update

from kocherga.mastermind_bot import models as db

_G = TypeVar('_G')


class IsText(Filter):
    async def check(self, upd: Update) -> bool:
        msg = upd.message
        if msg is None:
            return False
        return msg.text is not None and len(msg.text) > 0


class IsPhoto(BoundFilter):
    async def check(self, upd: Update) -> bool:
        msg = upd.message
        if msg is None:
            return False
        return msg.photo is not None


class IsCallbackQuery(BoundFilter):
    async def check(self, upd: Update) -> bool:
        return upd.callback_query is not None


class SessionChanged(BaseException):
    pass


class Interaction:
    """
    :type parent Interaction
    """
    state_class = db.State
    parent = None
    awaits = []

    def __init__(self, parent=None):
        """

        :type parent: Interaction
        """
        self.parent = parent

    async def on_update(self, update: Update):
        """
        :return: Interaction to which you want user to be redirected or None
        :rtype: typing.Optional[Interaction]
        """
        raise NotImplementedError

    async def receive_update(self, pred: Filter):
        """
        Awaits for update matching predicate
        :param pred: what to match
        """
        if self.parent is not None:
            return await self.parent.receive_update(pred)
        else:
            future = asyncio.get_event_loop().create_future()
            self.awaits.append((pred, future))
            return await future

    async def handle_update(self, update: Update):
        for tuple in self.awaits:
            pred, future = tuple
            future: Future
            result = pred(update)
            if isinstance(result, Awaitable):
                result = await result
            if result:
                self.awaits.remove(tuple)
                future.set_result(update)
                return

        async def mow():
            dsp = self
            # noinspection PyBroadException
            try:
                while dsp:
                    dsp = await dsp.on_update(update)
            except Exception:
                logging.exception(f"Exception raised while processing an update {update}")

        # noinspection PyAsyncCall
        asyncio.create_task(mow())
