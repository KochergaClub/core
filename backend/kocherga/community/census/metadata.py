import dataclasses
from typing import Optional, TypedDict


@dataclasses.dataclass
class SurveyField:
    key: str
    title: str
    type: str = 'str'
    limit: int = 10
    sort: str = 'top'
    multiple: bool = False
    text_tail: bool = False
    show: str = 'histogram'
    aliases: dict = dataclasses.field(default_factory=dict)
    choices: Optional[list[str]] = None
    private: bool = False
    note: Optional[str] = None

    # example: [{ 0: '0-100', 100: '100-200', 200: '200+' }]
    buckets: Optional[dict[int, str]] = None

    def asdict(self):
        return dataclasses.asdict(self)


@dataclasses.dataclass
class SurveyForm:
    fields: list[SurveyField]

    def field_by_key(self, key):
        return next(f for f in self.fields if f.key == key)

    def field_by_title(self, title):
        for f in self.fields:
            if f.title == title:
                return f

        raise Exception(f"Field with title {title} not found")

    def public_fields(self):
        return [field for field in self.fields if not field.private]

    def to_dict(self):
        return {field.key: field.asdict() for field in self.public_fields()}


psy_choices = [
    'Нет',
    'Да, я диагностировал(а) себя самостоятельно',
    'Да, мне поставил диагноз специалист',
]
online_choices = [
    'Не знаю, что это',
    'Знаю, что это, но не читаю',
    'Редко читаю',
    'Часто читаю',
    'Часто читаю и иногда пишу',
    'Часто читаю и пишу',
]
slang_choices = [
    'Знаю, что это',
    'Слышал(а) эти слова, но не могу объяснить другому их значение',
    'Мне это незнакомо',
]
goals_choices = [
    'Безразлично',
    'Возможно, интересно',
    'Занимаюсь / хочу этим заниматься',
    'Это моя главная цель',
]
endorse_choices = [
    'Плохо / вредно / бесполезно',
    'Скорее плохо',
    'Нет мнения / не разбираюсь',
    'Скорее хорошо',
    'Отлично, радуюсь, что люди этим занимаются',
]
interest_choices = [
    'Совсем неважно',
    'Скорее неважно',
    'Не знаю / непонятно',
    'Скорее важно',
    'Очень важно',
]


METADATA = SurveyForm(
    fields=[
        SurveyField(
            key="timestamp",
            title="Timestamp",
            private=True,
        ),
        SurveyField(
            key="privacy",
            title="Приватность",
            private=True,
        ),
        SurveyField(
            key="source",
            title="Где вы увидели ссылку на этот опрос?",
            multiple=True,
        ),
        SurveyField(
            key="country",
            title="Страна проживания",
            aliases={
                'сша': 'США',
                'germany': 'Германия',
                'singapore': 'Сингапур',
                'ireland': 'Ирландия',
                'чешская республика': 'Чехия',
                'poland': 'Польша',
            },
        ),
        SurveyField(
            key="city",
            title="Город",
            aliases={
                'мінск': 'Минск',
                'singapore': 'Сингапур',
            },
        ),
        SurveyField(
            key="age",
            title="Возраст",
            type="int",
            limit=1000,
            sort="numerical",
        ),
        SurveyField(
            key="gender",
            title="Пол/гендер",
        ),
        SurveyField(
            key="education",
            title="Образование",
            limit=1000,
            note='«Неоконченное» включает как продолжающийся процесс, так и прерванный в прошлом.',
            sort='choices',
            choices=[
                'Неоконченное общее',
                'Общее',
                'Неоконченное высшее',
                'Оконченное высшее (бакалавр, специалист, магистр)',
                'Неоконченная аспирантура',
                'Оконченная аспирантура',
            ],
        ),
        SurveyField(
            key="higher_education",
            title="Высшая степень образования / академической степени",
            sort='choices',
            choices=[
                'Школьный аттестат',
                'Бакалавр',
                'Специалист (5 лет обучения)',
                'Магистр',
                'Кандидат наук',
                'Доктор наук',
            ],
        ),
        SurveyField(
            key="speciality",
            title="Специальность в высшем образовании",
            multiple=True,
        ),
        SurveyField(
            key="compass_economics",
            title="Экономическая шкала",
            type="int",
            limit=1000,
            sort="numerical",
            note="См. https://www.politicalcompass.org/analysis2 для пояснений по этому и следующему вопросу.",
        ),
        SurveyField(
            key="compass_social",
            title="Социальная шкала",
            type="int",
            limit=1000,
            sort="numerical",
            note="См. https://www.politicalcompass.org/analysis2 для пояснений по этому и следующему вопросу.",
        ),
        SurveyField(
            key="compass_identity",
            title="Выберите пункты, к которым вы готовы себя отнести",
            multiple=True,
            choices=[
                'Либерал',
                'Демократ',
                'Коммунист',
                'Социалист',
                'Либертарианец',
                'Монархист',
                'Технократ',
                'Центрист',
                'Анархист',
                'Консерватор',
                'Неореакционер',
            ],
        ),
        SurveyField(
            key="iq",
            title="IQ",
            type="int",
            limit=1000,
            sort="buckets",
            note="Ваша честная оценка по итогам тестов, если вы проходили их в прошлом.",
            buckets={
                0: '<50 (вероятная ошибка)',
                50: '50-59',
                60: '60-69',
                70: '70-79',
                80: '80-89',
                90: '90-99',
                100: '100-109',
                110: '110-119',
                120: '120-129',
                130: '130-139',
                140: '140-149',
                150: '150-159',
                160: '160-169',
                170: '170-199',
                200: '200+ (вероятная ошибка)',
            },
        ),
        SurveyField(
            key="english",
            title="Английский язык",
            sort="choices",
            choices=[
                'Практически не знаю',
                'Читаю с трудом',
                'Читаю, если необходимо',
                'Свободно читаю',
                'Свободно читаю и говорю',
            ],
        ),
        SurveyField(
            key="english_cefr",
            title="Английский язык по шкале CEFR",
            limit=1000,
            sort="choices",
            note="См. https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages",
            choices=[
                'A1',
                'A2',
                'B1',
                'B2',
                'C1',
                'C2',
            ],
        ),
        SurveyField(
            key="religion",
            title="Отношение к религии",
        ),
        SurveyField(
            key="feminism",
            title="Отношение к феминизму",
            type="int",
            sort="numerical",
        ),
        SurveyField(
            key="family",
            title="Семейное положение",
        ),
        SurveyField(
            key="relationship_type",
            title="Предпочитаемый тип отношений",
        ),
        SurveyField(
            key="kids",
            title="Количество детей",
            type="int",
            sort="numerical",
        ),
        SurveyField(
            key="kids_preference",
            title="Предпочтения про количество детей",
        ),
        SurveyField(
            key="job",
            title="Текущий род занятий",
            multiple=True,
        ),
        SurveyField(
            key="income_amount",
            title="Уровень дохода в рублях, в месяц",
            type="int",
            sort="buckets",
            limit=100,
            note='Ответы округлены в меньшую сторону. Обратите внимание: до 100 тыс. руб. группировка по 10 тыс. руб.,'
            'далее по 20 тыс. руб.',
            buckets={
                0: '<10000 руб.',
                10000: '10000 руб.',
                20000: '20000 руб.',
                30000: '30000 руб.',
                40000: '40000 руб.',
                50000: '50000 руб.',
                60000: '60000 руб.',
                70000: '70000 руб.',
                80000: '80000 руб.',
                90000: '90000 руб.',
                100000: '100000 руб.',
                120000: '120000 руб.',
                140000: '140000 руб.',
                160000: '160000 руб.',
                180000: '180000 руб.',
                200000: '200000 руб.',
                220000: '220000 руб.',
                240000: '240000 руб.',
                260000: '260000 руб.',
                280000: '280000 руб.',
                300000: '>= 300000 руб.',
            },
        ),
        SurveyField(
            key="hobby",
            title="Хобби",
            multiple=True,
            aliases={
                'видеоигры': 'Компьютерные игры',
                'videogames': 'Компьютерные игры',
                'комп. игры': 'Компьютерные игры',
                'чгк': 'Что? Где? Когда?',
                'что?где?когда?': 'Что? Где? Когда?',
                'чтогдекогда?': 'Что? Где? Когда?',
                'что где когда?': 'Что? Где? Когда?',
            },
        ),
        SurveyField(
            key="happiness",
            title="Насколько вы довольны своей жизнью?",
            type="int",
            limit=1000,
            sort="numerical",
        ),
        SurveyField(
            key="psy_depression",
            title="Психические расстройства [Депрессия]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="psy_ocd",
            title="Психические расстройства [Обсессивно-компульсивное расстройство]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="psy_autism",
            title="Психические расстройства [Расстройства аутистического спектра]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="psy_bipolar",
            title="Психические расстройства [Биполярное расстройство]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="psy_anxiety",
            title="Психические расстройства [Тревожный невроз]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="psy_borderline",
            title="Психические расстройства [Пограничное расстройство личности]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="psy_schizo",
            title="Психические расстройства [Шизофрения]",
            sort='choices',
            choices=psy_choices,
        ),
        SurveyField(
            key="referer",
            title="Откуда вы узнали про рациональность?",
            aliases={
                "через книгу «гарри поттер и методы рационального мышления»": "Через ГПиМРМ",
            },
            choices=[
                'Через книгу «Гарри Поттер и методы рационального мышления»',
                'Сам нашел/нашла сайт lesswrong.ru',
                'Сам нашел/нашла сайт lesswrong.com',
                'Через центр рациональности «Кочерга» (сайт, курсы или мероприятия, проводимые Кочергой)',
                'Из проектов Пион Медведевой',
                'От знакомых (в онлайне или офлайне)',
            ],
            multiple=True,
        ),
        SurveyField(
            key="sequences_knows",
            title="Знаете ли вы, что такое цепочки (sequences) Элиезера Юдковского?",
        ),
        SurveyField(
            key="sequences_language",
            title="На каком языке вы преимущественно читали цепочки?",
        ),
        SurveyField(
            key="sequences_russian",
            title="Какой, приблизительно, процент переводов цепочек (на русском языке) вы читали?",
            sort="numerical",
        ),
        SurveyField(
            key="sequences_english",
            title="Какой, приблизительно, процент оригиналов цепочек или книги Rationality: From AI to Zombies (на"
            " английском языке) вы читали?",
            sort="numerical",
        ),
        SurveyField(
            key="slang_bias",
            title="Знакомство с терминологией и культурой [Когнитивное искажение]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_bayes",
            title="Знакомство с терминологией и культурой [Теорема Байеса]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_epistemology",
            title="Знакомство с терминологией и культурой [Эпистемология]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_agency",
            title="Знакомство с терминологией и культурой [Агентность]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_two_systems",
            title="Знакомство с терминологией и культурой [Две системы мышления]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_solstice",
            title="Знакомство с терминологией и культурой [Rational Solstice]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_fallacymania",
            title="Знакомство с терминологией и культурой [Fallacymania]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_ea",
            title="Знакомство с терминологией и культурой [Эффективный альтруизм]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_street",
            title="Знакомство с терминологией и культурой [Уличная эпистемология]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_nvc",
            title="Знакомство с терминологией и культурой [Ненасильственное общение]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_80k",
            title="Знакомство с терминологией и культурой [80000 часов]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_miri",
            title="Знакомство с терминологией и культурой [MIRI]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_ssc",
            title="Знакомство с терминологией и культурой [Slate Star Codex]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_hpmor",
            title="Знакомство с терминологией и культурой [Гарри Поттер и методы рационального мышления]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_cfar",
            title="Знакомство с терминологией и культурой [CFAR]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_kocherga",
            title="Знакомство с терминологией и культурой [Кочерга]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_zareshai",
            title="Знакомство с терминологией и культурой [Зарешай]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_rvalue",
            title="Знакомство с терминологией и культурой [R-value]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="slang_transhumanism",
            title="Знакомство с терминологией и культурой [Трансгуманизм]",
            sort='choices',
            choices=slang_choices,
        ),
        SurveyField(
            key="applied_familiarity",
            title="Насколько вы знакомы с техниками прикладной рациональности?",
            type="int",
            sort="numerical",
        ),
        SurveyField(
            key="applied_usage",
            title="Как часто вы применяете техники прикладной рациональности?",
            type="int",
            sort="numerical",
        ),
        SurveyField(
            key="applied_utility",
            title="Насколько полезными вам кажутся техники прикладной рациональности?",
            type="int",
            sort="numerical",
        ),
        SurveyField(
            key="applied_interest",
            title="Насколько сильно ваше желание осваивать техники прикладной рациональности?",
            type="int",
            sort="numerical",
        ),
        SurveyField(
            key="identity",
            title="Насколько вы самоидентифицируетесь как рационалист?",
            type="int",
            sort="numerical",
            note="(то есть как человек, разделяющий рациональное мировоззрение, не обязательно как человек, который "
            "сам по себе идеально рационален)",
        ),
        SurveyField(
            key="goals_self",
            title="Какие типичные цели рационалистов вы разделяете? [Улучшать свою жизнь с помощью рациональности]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_teach",
            title="Какие типичные цели рационалистов вы разделяете? [Преподавать рациональность]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_community",
            title="Какие типичные цели рационалистов вы разделяете? [Помогать построить сообщество рационалистов]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_ea",
            title="Какие типичные цели рационалистов вы разделяете? [Заниматься эффективным альтруизмом]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_aisafety",
            title="Какие типичные цели рационалистов вы разделяете? [Заниматься темой безопасного ИИ]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_write",
            title="Какие типичные цели рационалистов вы разделяете? "
            "[Писать тексты по рациональности и на смежные темы]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_transhumanism",
            title="Какие типичные цели рационалистов вы разделяете? [Заниматься трансгуманистическими проектами]",
            sort="choices",
            choices=goals_choices,
        ),
        SurveyField(
            key="goals_other",
            title="Может быть, у вас есть какие-то другие цели, связанные с рациональностью?",
            show="text",
        ),
        SurveyField(
            key="endorse_self",
            title="Какие сферы интересов рационалистов вы одобряете? "
            "[Улучшение своей жизни с помощью техник рациональности]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_ea",
            title="Какие сферы интересов рационалистов вы одобряете? [Эффективный альтруизм]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_aisafety",
            title="Какие сферы интересов рационалистов вы одобряете? [Безопасный ИИ]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_mindfulness",
            title="Какие сферы интересов рационалистов вы одобряете? [Медитация/майндфулнес]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_biohacking",
            title="Какие сферы интересов рационалистов вы одобряете? [Биохакинг]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_qs",
            title="Какие сферы интересов рационалистов вы одобряете? [Quantified self]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_transhumanism",
            title="Какие сферы интересов рационалистов вы одобряете? [Трансгуманизм]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_nvc",
            title="Какие сферы интересов рационалистов вы одобряете? [Ненасильственное общение]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="endorse_street",
            title="Какие сферы интересов рационалистов вы одобряете? [Уличная эпистемология]",
            sort="choices",
            choices=endorse_choices,
        ),
        SurveyField(
            key="interest_habits",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Навыки и привычки]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_planning",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Планирование]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_goals",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Целеполагание]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_strategy",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Стратегирование]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_biases",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Устранение когнитивных искажений]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_beliefs",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Работа над убеждениями]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_uncertainty",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Выборы в неопредённости]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_bayes",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Байесианство]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_models",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Моделирование сложных проблем]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_integration",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Проинтегрированность]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_critical",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Критическое восприятие информации]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_world",
            title="Какие из разделов рациональности для вас наиболее актуальны? [Эффективное улучшение мира]",
            sort="choices",
            choices=interest_choices,
        ),
        SurveyField(
            key="interest_2021",
            title="В каких областях жизни вы хотите применять рациональность в 2021 году?",
            multiple=True,
            choices=[
                'Работа и карьера',
                'Образование',
                'Личные отношения',
                'Бизнес и свои проекты',
                'Быт',
                'Здоровье',
                'Психологическое благополучие',
                'Благотворительность',
                'Улучшение мира',
            ],
        ),
        SurveyField(
            key="priority",
            title="На каком месте рациональность у вас в приоритетах?",
            sort='choices',
            choices=[
                'Самая важная тема в моей жизни',
                'Среди топ-5',
                'Среди топ-10',
                'Среди топ-20',
                'Среди топ-50',
            ],
        ),
        SurveyField(
            key="blocks",
            title="Что больше всего мешает вам практиковать рациональность?",
            multiple=True,
            choices=[
                'Не понимаю/не знаю теорию',
                'Нет конкретных инструментов',
                'Тяжело понять, где и как я могу применить теорию на практике',
                'Не вижу пользы',
                'Не хватает сил и мотивации',
                'Окружение не одобряет',
                'Не хватает времени и внимания',
                'Нет подходящих задач или проблем',
                'У меня выгорание или депрессия',
                'Не знаю, с чего начать',
                'Кажется, ничего не мешает, но я все равно это не делаю',
                'У меня всё отлично с применением рациональности',
            ],
        ),
        SurveyField(
            key="online_slack",
            title="Онлайн-сообщества [Slack-чат lesswrong.ru]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_vk",
            title="Онлайн-сообщества [Вк-паблик «LessWrong по-русски»]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_lwcom",
            title="Онлайн-сообщества [lesswrong.com]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_ea",
            title="Онлайн-сообщества [forum.effectivealtruism.org]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_diaspora",
            title="Онлайн-сообщества [Прочая англоязычная блогосфера (slatestarcodex и другие)]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_reddit",
            title="Онлайн-сообщества [Reddit (/r/slatestarcodex или другие рацио-сабреддиты)]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_telegram_kocherga",
            title="Онлайн-сообщества [Телеграм-чаты Кочерги]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_telegram_pion",
            title="Онлайн-сообщества [Телеграм-чат и канал «Пион на каждый день»]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_telegram_rvalue",
            title="Онлайн-сообщества [Телеграм-чат сообщества R-value]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_telegram_spb",
            title="Онлайн-сообщества [Телеграм-чаты сообщества LessWrong SPb]",
            sort='choices',
            choices=online_choices,
        ),
        SurveyField(
            key="online_other",
            title="В каких еще околорациональных сообществах в онлайне вы участвуете (в качестве читателя, "
            "комментатора или писателя)?",
            show="text",
        ),
        SurveyField(
            key="meetups_online",
            title="Участие в онлайновых встречах",
        ),
        SurveyField(
            key="meetups_offline",
            title="Участие в офлайновых встречах",
        ),
        SurveyField(
            key="meetups_city",
            title="Если вы были на офлайновых встречах (часто или один раз), в каком городе это было?",
        ),
        SurveyField(
            key="meetups_why",
            title="Если вы ходите или ходили на встречи (в онлайне или офлайне), то почему?",
            limit=1000,
            multiple=True,
            text_tail=True,
            choices=[
                'Социализироваться',
                'Узнать что-то новое',
                'Найти друзей',
                'Пообщаться с единомышленниками',
                'Обсудить интересные темы',
                'Помочь сообществу и его участникам',
                'Сделать мир лучше',
                'Попрактиковаться в чтении докладов и организационной деятельности',
            ],
        ),
        SurveyField(
            key="meetups_why_not",
            title="Если вы не ходите на встречи (в онлайне или офлайне), то почему?",
            limit=1000,
            multiple=True,
            text_tail=True,
            choices=[
                'В моем городе нет встреч',
                'Пандемия',
                'Не получается по расписанию',
                'Собираюсь, но откладываю',
                'Не люблю людей и тусовки',
                'Боюсь незнакомых людей',
                'Считаю это неоправданной тратой времени',
                'Мне не нравятся люди на встречах',
                'Люди на встречах занимаются не тем, чем мне хотелось бы',
            ],
        ),
        SurveyField(
            key="meetups_realm",
            title="При условии отсутствия пандемии и наличия встреч в вашем городе, какой формат встреч "
            "вы бы предпочли?",
            type="int",
            sort="numerical",
            note="Середина (5) — «одинаково вероятно пойду и на онлайн, и на офлайн-встречу»; полюса — "
            "«пойду только на встречу такого вида, а на другую не пойду совсем». 1 = «онлайн», 10 = «офлайн».",
        ),
        SurveyField(
            key="other_communities",
            title="В каких других, не-рацио сообществах вы участвуете?",
        ),
        SurveyField(
            key="other_media",
            title="Какие крупные СМИ/издания/каналы/блоги/форумы вы читаете?",
        ),
        SurveyField(
            key="previous_surveys",
            title="Участие в прошлых опросах",
            sort="choices",
            choices=[
                'Участвовал(а) в опросе в 2015-м',
                'Участвовал(а) в опросе в 2016-м',
                'Участвовал(а) в опросе в 2018-м',
            ],
        ),
        SurveyField(
            key="comments_like",
            title="Что вам нравится в теме рациональности и культуре рационалистов?",
            show="text",
        ),
        SurveyField(
            key="comments_dislike",
            title="Что, как вам кажется, можно было бы улучшить в сообществе или культуре рационалистов?",
            show="text",
        ),
        SurveyField(
            key="comments",
            title="Любые комментарии, которые вам хотелось бы добавить",
            show="text",
        ),
        SurveyField(
            key="comments2",
            title="Любые комментарии, которые вам хотелось бы добавить.1",
            private=True,
        ),
        SurveyField(
            key="contacts",
            title="E-mail, адрес в соцсетях, ник в Telegram, прочие опознавательные признаки",
            private=True,
        ),
    ]
)


class StructureSection(TypedDict):
    title: str
    columns: list[str]


STRUCTURE: list[StructureSection] = [
    {
        "title": "Общие данные",
        "columns": [
            "country",
            "city",
            "age",
            "gender",
            "source",
        ],
    },
    {
        "title": "Образование",
        "columns": [
            "education",
            "higher_education",
            "speciality",
        ],
    },
    {
        "title": "Политическая позиция",
        "columns": [
            "compass_economics",
            "compass_social",
            "compass_identity",
        ],
    },
    {
        "title": "Личные сведения",
        "columns": [
            "iq",
            "english",
            "english_cefr",
            "religion",
            "feminism",
            "family",
            "relationship_type",
            "kids",
            "kids_preference",
            "job",
            "income_amount",
            "hobby",
        ],
    },
    {
        "title": "Психика",
        "columns": [
            "happiness",
            "psy_depression",
            "psy_ocd",
            "psy_autism",
            "psy_bipolar",
            "psy_anxiety",
            "psy_borderline",
            "psy_schizo",
        ],
    },
    {
        "title": "Знакомство с рациональностью",
        "columns": [
            "referer",
            "sequences_knows",
            "sequences_language",
            "sequences_russian",
            "sequences_english",
            "slang_bias",
            "slang_bayes",
            "slang_epistemology",
            "slang_agency",
            "slang_two_systems",
            "slang_solstice",
            "slang_fallacymania",
            "slang_ea",
            "slang_street",
            "slang_nvc",
            "slang_80k",
            "slang_miri",
            "slang_ssc",
            "slang_hpmor",
            "slang_cfar",
            "slang_kocherga",
            "slang_zareshai",
            "slang_rvalue",
            "slang_transhumanism",
            "applied_familiarity",
            "applied_usage",
            "applied_utility",
            "applied_interest",
        ],
    },
    {
        "title": "Отношение к рациональности",
        "columns": [
            "identity",
            "goals_self",
            "goals_teach",
            "goals_community",
            "goals_ea",
            "goals_aisafety",
            "goals_write",
            "goals_transhumanism",
            "goals_other",
            "endorse_self",
            "endorse_ea",
            "endorse_aisafety",
            "endorse_mindfulness",
            "endorse_biohacking",
            "endorse_qs",
            "endorse_transhumanism",
            "endorse_nvc",
            "endorse_street",
            "interest_habits",
            "interest_planning",
            "interest_goals",
            "interest_strategy",
            "interest_biases",
            "interest_beliefs",
            "interest_uncertainty",
            "interest_bayes",
            "interest_models",
            "interest_integration",
            "interest_critical",
            "interest_world",
            "interest_2021",
            "priority",
            "blocks",
        ],
    },
    {
        "title": "Участие в сообществе",
        "columns": [
            "online_slack",
            "online_vk",
            "online_lwcom",
            "online_ea",
            "online_diaspora",
            "online_reddit",
            "online_telegram_kocherga",
            "online_telegram_pion",
            "online_telegram_rvalue",
            "online_telegram_spb",
            "online_other",
            "meetups_online",
            "meetups_offline",
            "meetups_city",
            "meetups_why",
            "meetups_why_not",
            "meetups_realm",
            "other_communities",
            "other_media",
            "previous_surveys",
        ],
    },
    {
        "title": "Текстовые отзывы",
        "columns": [
            "comments_like",
            "comments_dislike",
            "comments",
        ],
    },
]
