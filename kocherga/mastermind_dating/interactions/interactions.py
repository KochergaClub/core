import logging
logger = logging.getLogger(__name__)

import asyncio
import typing
from io import BytesIO

from aiogram import types as at, Bot, Dispatcher
from aiogram.dispatcher.filters import Filter, BoundFilter, Text
from aiogram.types import PhotoSize, InlineKeyboardMarkup, InlineKeyboardButton

from kocherga.mastermind_dating import models as db
from kocherga.mastermind_dating.models import State

_V = typing.TypeVar("_V")


def get_user() -> typing.Optional[db.User]:
    # noinspection PyUnresolvedReferences
    try:
        return db.User.objects.get(telegram_uid=at.User.get_current().username)
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


def register_handlers(dsp: Dispatcher):
    def get_chat() -> at.Chat:
        return at.Chat.get_current()

    def get_bot() -> Bot:
        return Bot.get_current()

    def logged_in(_):
        return get_user() is not None

    # ==--== Authorization

    @dsp.message_handler()
    async def test_handler(u):
        logger.info(u)
        from aiogram.dispatcher.handler import SkipHandler
        raise SkipHandler()

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
                                    "Если мы пришлем им только ваше имя, то они могут перепутать вас с кем-то другим: "
                                    "всего на мастермайнд-дейтинге будет около 25 человек.",
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
    async def registration_enter_photo(_):
        with get_user().edit_state(RegistrationState) as s:
            s.skipped_photo = True
        await start_time_tables()

    # ==--== Time (is it really that time again?)

    class TimeState(State):
        def __init__(self):
            super().__init__()
            self.selected_time = []
            self.confirmed = False

    entering_time = state_is(TimeState, lambda a: not a.confirmed) \
                    & ~reg_complete

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
            text="Выберите все подходящие вам временные интервалы.\n"
                 "Пожалуйста, постарайтесь выбрать как можно больше, "
                 "даже если они подходят только частично.",
            reply_markup=generate_timetable([])
        )

    @dsp.callback_query_handler(entering_time, Text(startswith="time"))
    async def time_on_button_press(action: at.CallbackQuery):
        act_command: str = action.data.split("-", 1)[-1]

        if act_command == "confirm":
            with get_user().edit_state(TimeState) as s:
                s.confirmed = True
                await get_bot().edit_message_reply_markup(
                    chat_id=action.message.chat.id,
                    message_id=action.message.message_id,
                    reply_markup=generate_timetable(s.selected_time, save_button=False)
                )
            await registration_complete()
        else:
            with get_user().edit_state(TimeState) as s:
                if act_command in s.selected_time:
                    s.selected_time.remove(act_command)
                else:
                    s.selected_time.append(act_command)

                await get_bot().edit_message_reply_markup(
                    chat_id=action.message.chat.id,
                    message_id=action.message.message_id,
                    reply_markup=generate_timetable(s.selected_time)
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
            "text": """
*Вот расписание мастермайнд-дейтинга:*

Мастермайнд-дейтинг будет проходить в Лекционной комнате.

`14:00 - 14:10`  *Вход и окончание регистраций в боте*
На входе мы будем спрашивать имена, чтобы проверить, что все участники мероприятия зарегистрированы в боте.

`14:10 - 14:15`  *Введение, мета*
Небольшая вводная часть, на которой ведущие расскажут, как получить от мероприятия максимум пользы.

`14:15 - 14:35`  *Очень короткие лекции о формате*
Четыре человека с опытом участия в мастермайнд-группах расскажут о формате, о том, как им пользоваться, и о том, на что полезно обращать внимание. Каждый рассказ будет длиться 5 минут.

`14:35 - 14:50`  *Формулирование запросов*
Мы предложим подумать над несколькими вопросами, которые помогут лучше разобраться в том, что вам важно в будущей мастермайнд-группе и какие партнеры вам нужны.

`14:50 - 15:50`  *Знакомство*
У каждого участника будет две минуты, чтобы рассказать остальным о себе. Формат: бэкграунд; достижения, которые считаете важными; актуальные проблемы; что-то неупомянутое, но значимое.

`15:50 - 16:00`  *Перерыв*

`16:00 - 17:00`  *Общение и решение кейсов*
*Общение*: участники будут делиться на новые пары каждые три минуты, чтобы каждый успел поговорить с каждым. Мы раздадим список хороших вопросов, которые помогут вам лучше узнать остальных.

*Решение кейсов*: у каждого участника будет две минуты, чтобы получить пример мастермайнд-запроса (проблемы, которую кто-нибудь может озвучить на мастермайнде), предложить свое решение и объяснить его остальным. 

Эти активности будут чередоваться по 15 минут: 15 минут общения в парах, 15 минут решения кейсов (в общем круге, по очереди), и так далее. 

`17:00 - 17:10`  *Перерыв*

`17:10 - 18:10`  *Общение и решение кейсов (часть вторая)*

`18:10 - 18:20`  *Выставление предпочтений*
Участники по очереди представятся еще раз и расскажут о своих впечатлениях от мероприятия; после каждого представления бот будет присылать имя, фотографию и информацию об этом человеке, а участники будут отвечать одним из трех эмодзи: 🔥— очень да, ❤️ — да, ✖️ — нет.

`18:20 - 18:30`  *Перерыв*

`18:30 - 18:35`  *Создание групп*
За время последнего перерыва наш алгоритм соберет оптимальные группы на основе собранных предпочтений. По группам будут распределены все участники: никто не останется за бортом. В последние пять минут мероприятия участники соберутся в образованные группы и немного пообщаются внутри, чтобы познакомиться с полным составом своего нового мастермайнда.
            """.strip(),
            "parse_mode": "Markdown",
            "reply_markup":
                InlineKeyboardMarkup()
                    .add(InlineKeyboardButton("« Обратно в информацию", callback_data="info-root"))
        },
        "questions": {
            "text": """
*Вот вопросы для знакомства:* 


- расскажите о своем бэкграунде (областях, опыте) с акцентом на том, что может быть полезно вашим будущим партнерам по мастермайнду;

- расскажите о своих достижениях, которые считаете важными (последних или вообще);

- расскажите о своих актуальных проблемах/задачах/челленджах, особенно о тех, которые хотите выносить на мастермайнд;

- какая-то информация о вас, про которую вы думаете, что вашим будущим партнерам по мастермайнду стоит ее знать.

Пожалуйста, подумайте об ответах на них заранее. Учитывайте, что у вас будет ровно 2 минуты: после их истечения ведущий прервет вас, где бы вы ни остановились. Точное соблюдение временных рамок нужно для того, чтобы все участники успели рассказать о себе, но при этом мероприятие не растянулось слишком сильно и не стало тяжелым для всех. 
            """.strip(),
            "parse_mode": "Markdown",
            "reply_markup":
                InlineKeyboardMarkup()
                    .add(InlineKeyboardButton("« Обратно в информацию", callback_data="info-root"))
        },
        "why-so-serious": {
            "text": """
*Почему все так сложно?*

Мастермайнд-группа — очень ценный ресурс, который при правильном подходе может сильно влиять на успешное завершение важных задач и повышение качества жизни. Мы хотим помочь вам найти такую мастермайнд-группу, которая во-первых будет устойчивой и просуществует долго, а во-вторых будет приносить вам максимум пользы. Мы верим, что для этого нужен существенно более сложный процесс, чем просто собрать людей вместе и разбить их на группы, поэтому мы постарались продумать как можно больше составляющих успеха. 
            """.strip(),
            "parse_mode": "Markdown",
            "reply_markup":
                InlineKeyboardMarkup()
                    .add(InlineKeyboardButton("« Обратно в информацию", callback_data="info-root"))
        }
    }

    async def registration_complete():
        with get_user().edit_state(RegistrationState) as s:
            s.complete = True
        await get_bot().send_message(
            chat_id=get_user().chat_id,
            text=("*Спасибо!*\n"
                  "\n"
                  "Это все! Ждем вас в Кочерге в воскресенье, в 14:00.\n"
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
        data = msg.data
        how, whom = data[4].split("-", 1)
        how = ['Y', 'O', 'N'].index(how)
        whom = db.User.objects.get(telegram_uid=whom)
        vote_obj, _ = db.Vote.objects.get_or_create(whom=whom, who=get_user())
        vote_obj.how = how

    # ==--==


async def send_rate_request(to: int, whom: str):
    bot: Bot = Bot.get_current()
    vote_for: db.User = db.User.objects.get(telegram_uid=whom)
    await bot.send_message(to, f"**Голосование за** {vote_for.name}", parse_mode="Markdown")
    if vote_for.photo is not None:
        photo = at.InputFile(vote_for.photo.open())
        await bot.send_photo(to, photo)
    await bot.send_message(to, vote_for.desc,
                           reply_markup=InlineKeyboardMarkup()
                           .insert(InlineKeyboardButton("🔥", callback_data=f"voteY-{vote_for.telegram_uid}"))
                           .insert(InlineKeyboardButton("❤️", callback_data=f"voteO-{vote_for.telegram_uid}"))
                           .insert(InlineKeyboardButton("✖️", callback_data=f"voteN-{vote_for.telegram_uid}"))
                           )


async def tinder_activate(user: db.User):
    """
        Activates voting for some user.
    :param user:
    """
    to_notify = db.User.objects.filter(cohort=user.cohort).exclude(telegram_uid=user.telegram_uid).iterator()
    tasks = []
    for to in to_notify:
        tasks.append(asyncio.create_task(send_rate_request(to.teleram_uid, user.telegram_uid)))

    for task in tasks:
        await task
