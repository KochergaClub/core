import asyncio
import typing
from io import BytesIO

from aiogram import types as at, Bot, Dispatcher
from aiogram.dispatcher.filters import Filter, BoundFilter
from aiogram.types import PhotoSize, InlineKeyboardMarkup, InlineKeyboardButton

from kocherga.mastermind_bot import models as db
from kocherga.mastermind_bot.models import get_mm_user_by_token

_V = typing.TypeVar("_V")


def get_user() -> typing.Optional[db.User]:
    # noinspection PyUnresolvedReferences
    try:
        return db.User.objects.get(uid=at.User.get_current().username)
    except db.User.DoesNotExist:
        return None


def state_is(t: typing.Type[_V], a: typing.Callable[[_V], bool]) -> BoundFilter:
    class LF(BoundFilter):
        async def check(self, *args):
            user: db.User = get_user()
            if not user:
                return False
            return a(user.get_state(t))

    return LF()


def model_is(a: typing.Callable[[db.User], bool]) -> Filter:
    class LF(BoundFilter):
        async def check(self, *args):
            user: db.User = get_user()
            if not user:
                return False
            return a(user)

    return LF()


def register_handlers(dsp: Dispatcher):
    def get_chat() -> at.Chat:
        return at.Chat.get_current()

    def get_bot() -> Bot:
        return Bot.get_current()

    def logged_in(_):
        return get_user() is not None

    # ==--== Authorization

    @dsp.message_handler(lambda a: not logged_in(a), commands=["start"])
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

    # ==--==

    class RegistrationState(db.State):
        def __init__(self):
            super().__init__()
            self.skipped_photo = False
            self.complete = False

    # ==--== Registration/Name

    def strn(obj):
        return str(obj) if obj else ""

    entering_name = model_is(lambda a: a.name is None) & state_is(RegistrationState, lambda a: not a.complete)

    entering_desc = model_is(lambda a: a.desc is None) & state_is(RegistrationState, lambda a: not a.complete)

    def photo_phase(a):
        print(a)
        return not a.skipped_photo and not a.complete

    entering_photo = model_is(lambda a: a.photo is None) & state_is(RegistrationState, photo_phase)

    async def start_registration():
        user = get_user()
        chat = get_chat()
        bot = get_bot()

        suggestion_name = " ".join([strn(chat.first_name), strn(chat.last_name)])
        suggestion_nick = chat.username
        await bot.send_message(user.chat_id, text="Пожалуйста, введите своё имя, или выберите одно из тех, что ниже.",
                               reply_markup=InlineKeyboardMarkup()
                               .insert(InlineKeyboardButton(suggestion_name, callback_data="use_name"))
                               .insert(InlineKeyboardButton(suggestion_nick, callback_data="use_nickname"))
                               )

        with user.edit_state(RegistrationState) as s:
            s.entering_name = True

    @dsp.callback_query_handler(logged_in, entering_name)
    async def registration_name_inline(u: at.CallbackQuery):
        user = get_user()
        chat = get_chat()

        suggestion_name = " ".join([strn(chat.first_name), strn(chat.last_name)])
        suggestion_nick = chat.username

        if u.data == "use_name":
            user.name = suggestion_name
        if u.data == "use_nickname":
            user.name = suggestion_nick

        user.save()
        await start_registration_enter_desc()

    @dsp.message_handler(logged_in, entering_name)
    async def registration_name_message(u: at.Message):
        user = get_user()
        user.name = u.text
        user.save()
        await start_registration_enter_desc()

    # ==--== Registration/Description

    async def start_registration_enter_desc():
        await get_bot().send_message(chat_id=get_user().chat_id, text="Опишите себя в паре предложений.")

    @dsp.message_handler(logged_in, entering_desc)
    async def registration_enter_desc(msg: at.Message):
        user = get_user()
        user.desc = msg.text
        user.save()
        await start_registration_enter_photo()

    # ==--== Registration/Photo

    async def start_registration_enter_photo():
        await get_bot().send_message(
            chat_id=get_user().chat_id,
            text="Загрузите фото, чтобы другие люди могли легче найти вас на мастермайнде.",
            # reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton("Нет, спасибо", callback_data="skip_photo"))
        )

    @dsp.message_handler(logged_in, entering_photo, content_types=["photo"])
    async def registration_enter_photo(msg: at.Message):
        user = get_user()
        photos = msg.photo
        photo_limit = 1000 * 1000

        with BytesIO() as file:
            file.getbuffer()
            selected_file: PhotoSize = None
            print(photos)
            # Selecting last size below 1M
            for photo in photos:
                if photo.file_size > photo_limit:
                    break
                selected_file = photo

            await selected_file.download(file)

            user.photo = file.getbuffer().tobytes()
            user.save()

        await registration_complete()

    @dsp.callback_query_handler(logged_in, entering_photo, lambda a: a.data in ["skip_photo"])
    async def registration_enter_photo(msg: at.Message):
        with get_user().edit_state(RegistrationState) as s:
            s.skipped_photo = True

    async def registration_complete():
        await get_bot().send_message(
            chat_id=get_user().chat_id,
            text="Мы узнали всё, что хотели.",
        )


# ==--==


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
