import logging
logger = logging.getLogger(__name__)

from django.template.loader import render_to_string

import asyncio
import typing
from io import BytesIO

from aiogram import types as at, Bot, Dispatcher
from aiogram.dispatcher.filters import Filter, BoundFilter, Text
from aiogram.types import PhotoSize, InlineKeyboardMarkup, InlineKeyboardButton
import aiogram.utils.exceptions

from kocherga.mastermind_dating import models as db
from kocherga.mastermind_dating.models import State

_V = typing.TypeVar("_V")


def get_user() -> typing.Optional[db.User]:
    # noinspection PyUnresolvedReferences
    try:
        return db.User.objects.get(chat_id=at.Chat.get_current().id)
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
            return bool(a(user))

    return LF()


def generate_voting_buttons(who: db.User, whom: db.User):
    markup = InlineKeyboardMarkup()

    existing_vote = None
    try:
        existing_vote_id = db.Vote.objects.get(who=who, whom=whom).how
        existing_vote = ['Y', 'O', 'N'][existing_vote_id]
    except db.Vote.DoesNotExist:
        pass

    for (emoji, vote_type) in (("🔥", 'Y'), ("❤️", 'O'), ("✖️", 'N')):
        button = emoji
        if existing_vote == vote_type:
            button = "[" + button + "]"
        markup = markup.insert(InlineKeyboardButton(button, callback_data=f"vote{vote_type}-{whom.telegram_uid}"))
    logger.info('Voting markup: ' + str(markup))
    return markup


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

        token = msg.get_args()
        user = db.User.objects.get_by_token(token)

        if user is None:
            await bot.send_message(chat_id=msg.chat.id,
                                   text="Найдите письмо от Кочерги и активируйте бота по инструкциям из него.")
            return

        user.telegram_uid = msg.from_user.username
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

    reg_complete = state_is(RegistrationState, lambda a: a.complete)

    entering_name = model_is(lambda a: not a.name) & ~reg_complete

    entering_desc = model_is(lambda a: not a.desc) & ~reg_complete

    entering_photo = model_is(lambda a: not a.photo) \
        & state_is(RegistrationState, lambda a: not a.skipped_photo) \
        & ~reg_complete

    async def start_registration():
        user = get_user()
        chat = get_chat()
        bot = get_bot()

        suggestion_name = " ".join([strn(chat.first_name), strn(chat.last_name)])
        suggestion_nick = chat.username

        await bot.send_message(user.chat_id,
                               text="Привет! Это бот мастермайнд-дейтинга в Кочерге: мероприятия, "
                                    "на котором вы можете найти партнеров в мастермайнд-группу.",
                               disable_notification=True
                               )
        await bot.send_message(user.chat_id,
                               text="Сначала пройдите короткую регистрацию.\n"
                                    "После этого бот отправит вам подробную программу "
                                    "и расскажет, как все будет устроено.",
                               disable_notification=True
                               )
        await bot.send_message(user.chat_id,
                               text="Информация о вас и фотография нужны для того, чтобы другие участники "
                                    "могли узнать вас, когда будут выставлять свои предпочтения.\n"
                                    "Если мы пришлем им только ваше имя, то они могут перепутать вас с кем-то другим.",
                               disable_notification=True
                               )

        await bot.send_message(user.chat_id, text="Пожалуйста, введите своё имя, или выберите одно из тех, что ниже.",
                               reply_markup=InlineKeyboardMarkup()
                               .insert(InlineKeyboardButton(suggestion_name, callback_data="use_name"))
                               .insert(InlineKeyboardButton(suggestion_nick, callback_data="use_nickname"))
                               )

        with user.edit_state(RegistrationState) as s:
            s.entering_name = True

    @dsp.callback_query_handler(logged_in, entering_name)
    async def registration_name_inline(u: at.CallbackQuery):
        logger.info('registration_name_inline')
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
        logger.info('registration_name_message')
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

        with BytesIO() as fh:
            fh.getbuffer()
            selected_file: PhotoSize = None

            # Selecting last size below 1M
            for photo in photos:
                if photo.file_size > photo_limit:
                    break
                selected_file = photo

            await selected_file.download(fh)

            user.photo.save('photo', fh)
            user.save()

        await start_time_tables()

    @dsp.callback_query_handler(logged_in, entering_photo, lambda a: a.data in ["skip_photo"])
    async def registration_skip_photo(_):
        with get_user().edit_state(RegistrationState) as s:
            s.skipped_photo = True
        await start_time_tables()

    # ==--== Time (is it really that time again?)

    class TimeState(State):
        def __init__(self):
            super().__init__()
            self.selected_time = []
            self.confirmed = False

    def generate_timetable(selected_cells: typing.List[str], save_button=True):
        days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
        times = ["10-14", "14-19", "19-24"]
        markup = InlineKeyboardMarkup(row_width=4)
        dayid = 0
        for day in days:
            timeid = 0
            markup.add(InlineKeyboardButton(day, callback_data=f"void"))
            for time in times:
                cell_id = f"{dayid}.{timeid}"
                marker = "✅" if cell_id in selected_cells else ""
                markup.insert(InlineKeyboardButton(f"{marker}{time}", callback_data=f"time-{cell_id}"))
                timeid += 1
            markup.row()
            dayid += 1
        if save_button:
            markup.add(InlineKeyboardButton(text="Сохранить расписание", callback_data="time-confirm"))
        return markup

    async def start_time_tables():
        bot = get_bot()
        chat_id = get_chat()
        await bot.send_message(
            chat_id.id,
            text="Обычно мастермайнд-встречи проходят в зафиксированный день раз в неделю "
                 "(или раз в две) и длятся около полутора часов.\n"
                 "Пожалуйста, выберите дни и временные интервалы, в которые вы сможете "
                 "приходить на мастермайнд-встречи в ближайшие несколько месяцев.\n"
                 "Пожалуйста, постарайтесь выбрать как можно больше, "
                 "даже если они подходят только частично.",
            reply_markup=generate_timetable([])
        )

    @dsp.callback_query_handler(Text(startswith="time"))
    async def time_on_button_press(action: at.CallbackQuery):
        act_command: str = action.data.split("-", 1)[-1]

        if act_command == "confirm":
            logger.info('confirming time table')
            with get_user().edit_state(TimeState) as s:
                s.confirmed = True
                await get_bot().edit_message_reply_markup(
                    chat_id=action.message.chat.id,
                    message_id=action.message.message_id,
                    reply_markup=generate_timetable(s.selected_time, save_button=False)
                )
            await registration_complete()
        else:
            logger.info('editing time')
            with get_user().edit_state(TimeState) as s:
                if act_command in s.selected_time:
                    s.selected_time.remove(act_command)
                else:
                    s.selected_time.append(act_command)

                await get_bot().edit_message_reply_markup(
                    chat_id=action.message.chat.id,
                    message_id=action.message.message_id,
                    reply_markup=generate_timetable(s.selected_time, save_button=(not s.confirmed))
                )

    # ==--== Registration/Complete

    info_messages = {
        "root": {
            "text": "*Важная информация — пожалуйста, обязательно прочтите её заранее:*\n",
            "reply_markup":
                InlineKeyboardMarkup(row_width=2)
                    .add(InlineKeyboardButton("Расписание", callback_data="info-timetables"))
                    .add(InlineKeyboardButton("Вопросы для знакомства", callback_data="info-questions"))
                    .add(InlineKeyboardButton("Почему всё так сложно?", callback_data="info-why-so-serious"))
                    .add(InlineKeyboardButton("Больше контекста о мастермайнд-группах",
                                              url="https://kocherga-club.ru/blog/mastermind")),
            "parse_mode": "Markdown"
        },
        "timetables": {
            "text": render_to_string('mastermind_dating/bot/info-timetables.md'),
            "parse_mode": "Markdown",
            "reply_markup": InlineKeyboardMarkup().add(
                InlineKeyboardButton("« Обратно в информацию", callback_data="info-root")
            ),
        },
        "questions": {
            "text": render_to_string('mastermind_dating/bot/info-questions.md'),
            "parse_mode": "Markdown",
            "reply_markup": InlineKeyboardMarkup().add(
                InlineKeyboardButton("« Обратно в информацию", callback_data="info-root")
            ),
        },
        "why-so-serious": {
            "text": render_to_string('mastermind_dating/bot/info-why-so-serious.md'),
            "parse_mode": "Markdown",
            "reply_markup": InlineKeyboardMarkup().add(
                InlineKeyboardButton("« Обратно в информацию", callback_data="info-root")
            ),
        },
    }

    async def registration_complete():
        with get_user().edit_state(RegistrationState) as s:
            s.complete = True
        await get_bot().send_message(
            chat_id=get_user().chat_id,
            text=("*Спасибо!*\n"
                  "\n"
                  "Это все! Ждем вас в Кочерге в воскресенье, в 13:00.\n"
                  "Приготовьтесь: мероприятие будет интересным, интенсивным и возможно "
                  "немного сложным; но мы надеемся, что ценность, которую вы получите "
                  "от вашей будущей мастермайнд-группы, многократно окупит труд, "
                  "который вы вложите.\n"
                  "До встречи!"
                  ).strip(),
            parse_mode="Markdown"
        )
        await get_bot().send_message(
            chat_id=get_user().chat_id,
            **info_messages["root"]
        )

    @dsp.callback_query_handler(Text(startswith="info-"))
    async def info_callbacks(q: at.CallbackQuery):
        message = q.message
        page = q.data.split("-", 1)[-1]
        await message.edit_text(**info_messages[page])

    # ==--== Voting

    class VotingState(State):
        def __init__(self):
            super().__init__()
            self.voting_active = True

    voting_active = reg_complete & state_is(VotingState, lambda a: a.voting_active)

    @dsp.callback_query_handler(logged_in, voting_active, Text(startswith="vote"))
    async def vote(msg: at.CallbackQuery):
        logger.info('voting')
        data = msg.data
        how, whom = data[4:].split("-", 1)
        how = ['Y', 'O', 'N'].index(how)
        whom = db.User.objects.get(telegram_uid=whom)
        who = get_user()
        vote_obj, _ = db.Vote.objects.update_or_create(
            who=who, whom=whom,
            defaults={
                'how': how,
            }
        )

        logger.info('editing markup')
        try:
            await get_bot().edit_message_reply_markup(
                chat_id=msg.message.chat.id,
                message_id=msg.message.message_id,
                reply_markup=generate_voting_buttons(who, whom)
            )
        except aiogram.utils.exceptions.MessageNotModified:
            # that's ok
            pass

    # ==--==


async def send_rate_request(who: db.User, whom: db.User, bot: Bot):
    await bot.send_message(who.chat_id, f"**Голосование за** {whom.name}", parse_mode="Markdown")
    if whom.photo:
        whom.photo.open()
        photo = at.InputFile(BytesIO(whom.photo.read()))
        await bot.send_photo(who.chat_id, photo, disable_notification=True)

    await bot.send_message(
        who.chat_id, whom.desc or '(Нет описания)',
        reply_markup=generate_voting_buttons(who, whom),
        disable_notification=True
    )


async def tinder_activate(user_id: int, bot: Bot):
    """
        Activates voting for some user.
    :param user:
    """
    logger.info(f"Looking for user {user_id} to activate")
    user = db.User.objects.get(pk=user_id)
    logger.info(f"Found user {user.user.email}")

    to_notify = db.User.objects.filter(cohort=user.cohort, present=True).exclude(user_id=user.user_id).iterator()
    tasks = []
    logger.info(f"Creating voting tasks")
    for to in to_notify:
        tasks.append(asyncio.create_task(send_rate_request(to, user, bot)))

    logger.info(f"Prepared {len(tasks)} voting notifications")

    for task in tasks:
        await task

    user.voted_for = True
    user.save()
