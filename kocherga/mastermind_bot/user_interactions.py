import asyncio
import logging

from aiogram.types import Update

from . import models as db
from asyncio import Future
from concurrent.futures import ThreadPoolExecutor
from typing import Dict, Any, Callable, TypeVar, List

disp_event_loop = asyncio.new_event_loop()
executor = ThreadPoolExecutor()
disp_event_loop.set_default_executor(executor)
disp_event_loop.set_exception_handler(lambda loop, ctx: logging.error("Exception in some update handler", ctx))

_G = TypeVar('_G')


def delegate(a: Callable[[], _G], args: List):
    def on_finish(e: Future):
        if e.exception() is not None:
            logging.exception(f"Error while processing future: {e.exception()}")

    executor.submit(a, *args).add_done_callback(on_finish)


def upd_filter(pred: BaseFilter): return lambda update: update.message is not None and pred.filter(update.message)


is_text = upd_filter(Filters.text)
is_photo = upd_filter(Filters.photo)


def is_from(user: str): return lambda update: update.effective_chat.username is user


def is_callback_query(update: Update): return update.callback_query is not None


class Context:

    def __init__(self, config: Dict):
        self.config = config

    futures = []

    def user(self, update: Update) -> db.User:
        return db.User.objects.get(id=update.effective_chat.username)


class Interaction(Handler):
    state_class = db.State

    def __init__(self, context: Context):
        super().__init__(None)
        self.context = context

    async def on_update(self, bot: Bot, update: Update):
        """
        :return: Interaction to which you want user to be redirected or None
        :rtype: Union[Interaction, None]
        """
        raise NotImplementedError

    async def update_matching(self, pred):
        future = asyncio.get_event_loop().create_future()
        self.context.futures.append((pred, future))
        await future

    def _handle_update(self, update, dispatcher):
        async def local_loop():
            updater = self
            while updater is not None:
                updater = await updater.on_update(dispatcher.bot, update)

        asyncio.set_event_loop(disp_event_loop)
        disp_event_loop.run_until_complete(local_loop())

    def handle_update(self, update, dispatcher):
        print(f"delegating stuff {update}")
        delegate(self._handle_update, [update, dispatcher])


class Root(Interaction):
    path = "/"
    state_class = db.State

    def __init__(self, context: Context):
        super().__init__(context)

    async def on_update(self, bot: Bot, update: Update):
        message: Message = update.message
        ctx = self.context
        user = ctx.user(update)
        chat = update.effective_chat
        state = user.get_state(RegistrationState)

        if not user.registered:
            return Registration(ctx)

        return Tinder(ctx)


class RegistrationState(db.State):
    def __init__(self):
        super().__init__()
        self.entering_name = False

        self.uploading_photo = False
        self.skipped_photo = False


class Registration(Root):
    state_class = RegistrationState

    async def on_update(self, bot: Bot, update: Update):
        ctx = self.context
        user = ctx.user(update)
        chat: Chat = update.effective_chat
        state = user.get_state(RegistrationState)
        message: Message = update.message

        def save():
            user.state = (state)
            user.save()

        if user.name is None:

            def strn(obj):
                return "" if obj is None else str(obj)

            # fun reformatting bug :з :з :з
            suggestion_name = f"{strn(chat.first_name)} {strn(chat.last_name)}" \
                .strip()

            suggestion_nick = chat.username
            if state.entering_name:

                def set_name(name):
                    user.name = name
                    save()
                    return Registration(ctx)

                if is_callback_query(update):
                    q: CallbackQuery = update.callback_query
                    print(q.data)
                    if q.data == "use_name":
                        return set_name(suggestion_name)
                    elif q.data == "use_nickname":
                        return set_name(suggestion_nick)
                    else:
                        return

                # validating name, kind of?
                # TODO: Add moar validation
                if is_text(update):
                    text = message.text
                    if '\n' in text:
                        chat.send_message("Сомневаюсь, что имя у вас занимает несколько строк.")
                        return
                    else:
                        return set_name(text)
                else:
                    chat.send_message("Пожалуйста, ответьте текстом.")
                    return

            else:
                chat.send_message("Пожалуйста, введите своё имя, или выберите одно из тех, что ниже.",
                                  reply_markup={
                                      "inline_keyboard": [[
                                          {"text": f"{suggestion_name}",
                                           "callback_data": "use_name"},
                                          {"text": f"{suggestion_nick}",
                                           "callback_data": "use_nickname"}
                                      ]]
                                  })
                state.entering_name = True
                save()
                return

        if user.photo is None and not state.skipped_photo:

            if not state.uploading_photo:
                chat.send_message("Загрузите фото, чтобы другие люди могли легче найти вас на мастермайнде.",
                                  reply_markup={
                                      "inline_keyboard": [[
                                          {"text": "Нет, спасибо.",
                                           "callback_data": "skip_photo"}
                                      ]]
                                  })
                state.uploading_photo = True
                save()
                return

            if is_callback_query(update):
                if update.callback_query.data == "skip_photo":
                    state.skipped_photo = True
                    save()
                    return Registration(ctx)

            if is_photo(update):
                msg = chat.send_action(action="upload_photo")
                if message.photo:
                    photo_limit = 1000 * 1000
                    selected_file = None
                    # Selecting last size below 1M
                    for photo in message.photo:
                        file: File = photo.get_file()
                        if file.file_size > photo_limit:
                            break
                        selected_file = file

                    # TODO: this is io bound, should move to async tasks afterwards.
                    photo_bytes = selected_file.download_as_bytearray()
                    user.photo = photo_bytes
                    save()
                    return Registration(ctx)

            return

        chat.send_message("Отлично. Мы узнали от вас всё, что нам было нужно.")
        user.registered = True
        save()
        return Root(ctx)


class TinderState(db.State):
    pass


class Tinder(Root):

    async def on_update(self, bot: Bot, update: Update):
        update.effective_chat.send_message("tinder tinder")
