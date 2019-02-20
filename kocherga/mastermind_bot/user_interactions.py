import asyncio
import logging
import typing
from asyncio import Future
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from typing import TypeVar, Awaitable

from aiogram import types as at, Bot
from aiogram.dispatcher.filters import Filter, BoundFilter
from aiogram.types import Update, PhotoSize

from kocherga.mastermind_bot.models import get_mm_user_by_token
from . import models as db

disp_event_loop = asyncio.new_event_loop()
executor = ThreadPoolExecutor()
disp_event_loop.set_default_executor(executor)
disp_event_loop.set_exception_handler(lambda loop, ctx: logging.error("Exception in some update handler", ctx))

_G = TypeVar('_G')


def resolve_user(upd: Update):
    if upd.message:
        return upd.message.from_user
    if upd.edited_message:
        return upd.edited_message.from_user
    if upd.inline_query:
        return upd.inline_query.from_user
    if upd.chosen_inline_result:
        return upd.chosen_inline_result.from_user
    if upd.callback_query:
        return upd.callback_query.from_user
    if upd.shipping_query:
        return upd.shipping_query.from_user
    if upd.pre_checkout_query:
        return upd.pre_checkout_query.from_user


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


class IsFrom(BoundFilter):

    def __init__(self, username: str):
        self.username = username

    async def check(self, upd: Update) -> bool:
        user = resolve_user(upd)
        return user is not None and user.username == self.username


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
            while dsp:
                dsp = await dsp.on_update(update)

        # noinspection PyAsyncCall
        asyncio.create_task(mow())


class Root(Interaction):
    path = "/"
    state_class = db.State

    # noinspection PyUnresolvedReferences
    def user(self) -> typing.Optional[db.User]:
        try:
            return db.User.objects.get(uid=at.User.get_current().username)
        except db.User.DoesNotExist:
            return None

    async def receive_update(self, pred: Filter):
        pred = IsFrom(self.user().uid).__and__(pred)

        prev_state = self.user().get_state()
        upd = await super().receive_update(pred)
        if prev_state != self.user().get_state():
            raise SessionChanged()
        return upd

    async def reply(self, **kwargs):
        bot: Bot = Bot.get_current()
        chat: at.Chat = at.Chat.get_current()
        kwargs["chat_id"] = chat.id
        return await bot.send_message(**kwargs)

    async def on_update(self, update: at.Update):
        msg = update.message
        user = self.user()

        if (user is None or user.uid is None) and msg.is_command():
            print(f"Unregistered user: {user}")
            token = msg.get_args()
            user = get_mm_user_by_token(token)
            print(f"resolved as {user}")

            if user is None:
                await self.reply(text="Зайдите в личный кабинет Кочерги и перейдите на бота там.")
                return

            user.uid = msg.from_user.username
            user.save()

        if user is None or user.uid is None:
            await self.reply(text="Вы не зарегестрированы. Зайдите в личный кабинет Кочерги и перейдите на бота там.")

        reg = user.get_state(RegistrationState)

        if not reg.complete:
            return Registration(self)

        return Tinder(self)


class RegistrationState(db.State):
    def __init__(self):
        super().__init__()
        self.complete = False
        self.entering_name = False
        self.uploading_photo = False
        self.skipped_photo = False


class Registration(Root):
    state_class = RegistrationState

    async def on_update(self, update: Update):
        user = self.user()
        state = user.get_state(RegistrationState)
        message = update.message
        print(f"state: {user.get_state(RegistrationState)}")

        def save():
            user.set_state(state)
            user.save()

        # Getting user's name

        while not user.name:
            def strn(obj):
                return str(obj) if obj else ""

            chat = at.Chat.get_current()
            suggestion_name = " ".join([strn(chat.first_name), strn(chat.last_name)])
            suggestion_nick = chat.username

            await self.reply(text="Пожалуйста, введите своё имя, или выберите одно из тех, что ниже.",
                             reply_markup={
                                 "inline_keyboard": [[
                                     {"text": f"{suggestion_name}",
                                      "callback_data": "use_name"},
                                     {"text": f"{suggestion_nick}",
                                      "callback_data": "use_nickname"}
                                 ]]
                             })

            update = await self.receive_update(IsCallbackQuery() | IsText())

            def set_name(name):
                user.name = name
                save()

            if update.callback_query:
                q = update.callback_query
                if q.data == "use_name":
                    set_name(suggestion_name)
                elif q.data == "use_nickname":
                    set_name(suggestion_nick)
                continue

            # TODO: Add moar validation
            if update.message:
                text = update.message.text
                if '\n' in text or len(text) > 100:
                    await self.reply(text="Сомневаюсь, что имя у вас занимает несколько строк.")
                    return
                else:
                    return set_name(text)
            else:
                await self.reply(text="Пожалуйста, ответьте текстом.")
                return

        # Getting user's photo

        while user.photo is None and not state.skipped_photo:

            await self.reply(text="Загрузите фото, чтобы другие люди могли легче найти вас на мастермайнде.",
                             reply_markup=
                             {
                                 "inline_keyboard": [[
                                     {"text": f"Нет, спасибо",
                                      "callback_data": "skip_photo"}
                                 ]]
                             }
                             )

            update = await self.receive_update(IsPhoto() | IsCallbackQuery())

            if update.callback_query:
                if update.callback_query.data == "skip_photo":
                    state.skipped_photo = True
                    save()

            if update.message and update.message.photo:
                photos = update.message.photo
                photo_limit = 1000 * 1000

                with BytesIO() as bytes:
                    bytes.getbuffer()
                    selected_file: PhotoSize = None
                    # Selecting last size below 1M
                    for photo in photos:
                        if photo.file_size > photo_limit:
                            break
                        selected_file = photo

                    await selected_file.download(bytes)

                    user.photo = bytes.getbuffer().tobytes()
                    save()

        user.registered = True
        await self.reply(text="Отлично. Мы узнали от вас всё, что нам было нужно.")
        # return Root()


class TinderState(db.State):
    pass


class Tinder(Root):

    async def on_update(self, update: Update):
        await update.channel_post.reply("tinder tinder")
