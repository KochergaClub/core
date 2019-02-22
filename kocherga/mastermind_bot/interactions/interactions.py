import asyncio
import typing
from io import BytesIO

from aiogram import types as at, Bot, Dispatcher
from aiogram.dispatcher.filters import Filter
from aiogram.dispatcher.filters.state import StatesGroup, State
from aiogram.types import Update, PhotoSize, InlineKeyboardMarkup, InlineKeyboardButton

from kocherga.mastermind_bot import models as db
from kocherga.mastermind_bot.models import get_mm_user_by_token
from .utils import Interaction, SessionChanged, IsCallbackQuery, IsText, IsPhoto


class Root(Interaction):
    state_class = db.State

    # noinspection PyUnresolvedReferences
    def user(self) -> typing.Optional[db.User]:
        try:
            return db.User.objects.get(uid=at.User.get_current().username)
        except db.User.DoesNotExist:
            return None

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
            user.chat_id = msg.chat.id
            user.save()

        if user is None or user.uid is None:
            await self.reply(text="Вы не зарегестрированы. Зайдите в личный кабинет Кочерги и перейдите на бота там.")
            return

        reg = user.get_state(RegistrationState)

        if not reg.complete:
            return Registration(self)

        return


class UserState(StatesGroup):
    registration = State()
    tinder = State()


_T = typing.TypeVar("_T")


def logged_in(_):
    teleuser: at.User = at.User.get_current()
    user: db.User = get_user()
    return user is not None


def state_matches(t: typing.Type[_T], a: typing.Callable[[_T], bool]) -> typing.Callable[[typing.Any], bool]:
    def filter(_):
        user: db.User = get_user()
        if not user:
            return False
        return a(user.get_state(t))

    return filter


def model_matches(a: typing.Callable[[db.User], bool]) -> typing.Callable[[typing.Any], bool]:
    def filter(_):
        user: db.User = get_user()
        if not user:
            return False
        return a(user)

    return filter


def register_handlers(dsp: Dispatcher):
    def strn(obj):
        return str(obj) if obj else ""

    entering_name = model_matches(lambda a: a.name is None)

    async def start_registration():
        user = get_user()
        bot: Bot = Bot.get_current()
        chat = at.Chat.get_current()
        state = user.get_state(RegistrationState)

        suggestion_name = " ".join([strn(chat.first_name), strn(chat.last_name)])
        suggestion_nick = chat.username
        await bot.send_message(user.chat_id, text="Пожалуйста, введите своё имя, или выберите одно из тех, что ниже.",
                               reply_markup=InlineKeyboardMarkup()
                               .insert(InlineKeyboardButton(suggestion_name, callback_data="use_name"))
                               .insert(InlineKeyboardButton(suggestion_nick, callback_data="use_nickname"))
                               )
        state.entering_name = True
        user.set_state(state)
        user.save()

    @dsp.inline_handler(logged_in, entering_name, text=["use_name", "use_nickname"])
    async def registration_name(u):
        chat = at.Chat.get_current()
        suggestion_name = " ".join([strn(chat.first_name), strn(chat.last_name)])
        suggestion_nick = chat.username


    @dsp.message_handler(lambda upd: not logged_in(upd), commands=["start"])
    async def auth(msg):
        user = get_user()
        bot: Bot = Bot.get_current()

        print(f"Unregistered user: {user}")
        token = msg.get_args()
        user = get_mm_user_by_token(token)
        print(f"resolved as {user.user.email}")

        if user is None:
            await bot.send_message(chat_id=msg.chat.id,
                                   text="Зайдите в личный кабинет Кочерги и перейдите на бота там.")
            return

        user.uid = msg.from_user.username
        user.chat_id = msg.chat.id
        user.save()

        await start_registration()


def get_user() -> typing.Optional[db.User]:
    try:
        return db.User.objects.get(uid=at.User.get_current().username)
    except db.User.DoesNotExist:
        return None


async def register(msg: at.Message):
    user = get_user()
    bot: Bot = Bot.get_current()

    if (user is None or user.uid is None) and msg.is_command():
        print(f"Unregistered user: {user}")
        token = msg.get_args()
        user = get_mm_user_by_token(token)
        print(f"resolved as {user}")

        if user is None:
            await bot.send_message(chat_id=msg.chat.id,
                                   text="Зайдите в личный кабинет Кочерги и перейдите на бота там.")
            return

        user.uid = msg.from_user.username
        user.chat_id = msg.chat.id
        user.save()

    if user is None or user.uid is None:
        await bot.send_message(chat_id=msg.chat.id,
                               text="Вы не зарегестрированы. Зайдите в личный кабинет Кочерги и перейдите на бота там.")
        return

    reg = user.get_state(RegistrationState)
    reg.complete = True


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

        await self.reply(text="Вставить сюда интро")

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
                             reply_markup=InlineKeyboardMarkup()
                             .insert(InlineKeyboardButton(suggestion_name, callback_data="use_name"))
                             .insert(InlineKeyboardButton(suggestion_nick, callback_data="use_nickname"))
                             )

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
                    set_name(text)
            else:
                await self.reply(text="Пожалуйста, ответьте текстом.")
                return

        # Getting user's photo

        while user.photo is None and not state.skipped_photo:

            await self.reply(text="Загрузите фото, чтобы другие люди могли легче найти вас на мастермайнде.",
                             reply_markup=InlineKeyboardMarkup()
                             .add(InlineKeyboardButton("Нет, спасибо", "skip_photo"))
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

        while user.desc is None:
            await self.reply(text="Опишите себя в паре предложений.")

            update = await self.receive_update(IsText())
            text = update.message.text
            # todo: probably validate that too
            user.desc = text

        state.complete = True
        save()
        await self.reply(text="Отлично. Мы узнали от вас всё, что нам было нужно.")
        return Root()


class TinderState(db.State):

    def __init__(self):
        super().__init__()
        self.active = False


async def send_rate_request(to: int, whom: str):
    bot: Bot = Bot.get_current()
    vote_for: db.User = db.User.objects.get(uid=whom)
    await bot.send_message(to, f"**Голосование за** {vote_for.name}", parse_mode="Markdown")
    if vote_for.photo is not None:
        photo = at.InputFile(BytesIO(vote_for.photo))
        await bot.send_photo(to, photo)
    await bot.send_message(to, vote_for.desc,
                           reply_markup=InlineKeyboardMarkup()
                           .insert(InlineKeyboardButton("YY", callback_data=f"voteYY-{vote_for.uid}"))
                           .insert(InlineKeyboardButton("Y", callback_data=f"voteY-{vote_for.uid}"))
                           .insert(InlineKeyboardButton("N", callback_data=f"voteN-{vote_for.uid}"))
                           )


async def tinder_activate(user: db.User):
    """
        Activates voting for some user.
    :param user:
    """
    to_notify = db.User.objects.exclude(uid=user.uid).iterator()
    tasks = []
    for to in to_notify:
        tasks.append(asyncio.create_task(send_rate_request(to.uid, user.uid)))

    for task in tasks:
        await task


class Tinder(Root):

    async def on_update(self, update: Update):
        bot: Bot = Bot.get_current()
        chat: at.Chat = at.Chat.get_current()

        await bot.send_message(chat.id, "tinder tinder")
