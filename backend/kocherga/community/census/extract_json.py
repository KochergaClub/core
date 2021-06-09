import json
import math
import re
from collections import defaultdict

import numpy as np
import pandas as pd

from .metadata import METADATA, STRUCTURE

# some data was already normalized manually before we apply these fixes
column_specific_fixes = {
    'speciality': {
        'it': 'IT',
        'ит': 'IT',
        'информационные технологии': 'IT',
        'экономист': 'Экономика',
        'математик': 'Математика',
        'программист': 'Программирование',
        'психолог': 'Психология',
        'журналист': 'Журналистика',
        'юрист': 'Юриспруденция',
    },
    'country': {
        'сша': 'США',
        'germany': 'Германия',
        'singapore': 'Сингапур',
    },
    'city': {
        'мінск': 'Минск',
        'singapore': 'Сингапур',
    },
    'hobby': {
        'видеоигры': 'Компьютерные игры',
        'videogames': 'Компьютерные игры',
        'комп. игры': 'Компьютерные игры',
        'чгк': 'Что? Где? Когда?',
        'что?где?когда?': 'Что? Где? Когда?',
    },
}


def normalize_one(column, value):
    value = re.sub(r':\)$', '', value)
    if column != 'income':
        value = re.sub(r'\.$', '', value)
    value = value.strip()
    if value == '':
        return None
    value = value[0].upper() + value[1:]

    if column in column_specific_fixes:
        value = column_specific_fixes[column].get(value.lower(), value)

    if column == 'source' and 'gipsy' in value.lower():
        value = 'Покерный форум GipsyTeam.ru'

    return value


def split_meetup_reasons(value):
    # This is tricky because some answers included commas, but in some cases
    # commas were a separator of multiple answers.
    presets = [
        'Обсудить интересные темы',
        'Узнать что-то новое',
        'Пообщаться с единомышленниками',
        'Социализироваться',
        'Найти друзей',
        'Помочь сообществу и людям',
        'Попрактиковаться в чтении докладов и организационной деятельности',
        'В моем городе нет встреч',
        'Не получается по расписанию',
        'Собираюсь, но откладываю',
        'Не люблю людей и тусовки',
        'Боюсь незнакомых людей',
        'Люди на встречах занимаются не тем, чем мне хотелось бы',
        'Считаю это неоправданной тратой времени',
        'Мне не нравятся люди на встречах',
    ]

    values = []
    for preset in presets:
        if preset in value:
            value = re.sub(re.escape(preset), 'PRESET', value)
            values.append(preset)

    values.append(', '.join(part for part in value.split(', ') if part != 'PRESET'))
    return values


def normalize(column, value):
    if not value:
        return [value]

    if column == 'income':
        value = str(int(float(value)))

        def group_n(n):
            group_id = int(int(value) / (100 * n))
            return '${}00 - ${}99'.format(n * group_id, n * group_id + n - 1)

        if int(value) < 100:
            value = 'до $100'
        elif int(value) < 500:
            value = '$100 - $499'
        elif int(value) < 5000:
            value = group_n(5)
        else:
            value = '> $5000'

    if column == 'iq':
        value = int((value - 1) / 10) * 10
        return ['{}-{}'.format(value + 1, value + 10)]

    if type(value) == int:
        return [value]  # nothing to normalize

    if column in ('meetups_why', 'meetups_why_not'):
        values = split_meetup_reasons(value)
    elif column in ('hobby', 'job', 'speciality'):
        value = re.sub(
            r'\(.*?\)', '', value
        )  # get rid of (...), they are messing up with splitting-by-comma
        values = re.split(r',\s*', value)
    else:
        values = [value]

    return [normalize_one(column, v) for v in values]


def validate_structure():
    # all group columns are in METADATA
    for group in STRUCTURE:
        for column in group['columns']:
            if column not in [field.key for field in METADATA.fields]:
                raise Exception(
                    f"{column} from group structure is missing from metadata"
                )

    # all public METADATA fields are in groups
    all_structure_fields = sum((group['columns'] for group in STRUCTURE), [])
    for field in METADATA.fields:
        if field.private:
            continue
        if field.key not in all_structure_fields:
            raise Exception(f"{field.key} not in group structure")


class SurveyFieldData:
    def __init__(self, field, values):
        self.field = field
        self.values = values

    def get_compressed_values(self):
        original_values = self.values
        column = self.field.key

        values = []
        for value in original_values:
            values.extend(normalize(column, value))

        # important for anonymization of our data!
        default = (
            0 if self.field.type == 'int' and column not in ('income', 'iq') else ''
        )
        values = sorted(values, key=lambda x: x or default)

        # compress values
        grouped = defaultdict(int)
        for value in values:
            grouped[value] += 1

        grouped_list = []
        if None in grouped:
            grouped_list.append(
                {
                    'value': None,
                    'count': grouped[None],
                }
            )
            del grouped[None]

        for key in sorted(grouped.keys()):
            grouped_list.append(
                {
                    'value': key,
                    'count': grouped[key],
                }
            )

        values = grouped_list
        return values

    def to_dict(self):
        result = self.field.to_dict()

        column = self.field.key
        if column in ('income', 'iq'):  # income and iq are converted to intervals
            result['output_type'] = 'str'
        else:
            result['output_type'] = self.field.type

        if column.startswith('online_') and column != 'online_other':
            result['custom_sort'] = [
                'Не знаю, что это',
                'Знаю, что это, но не читаю',
                'Редко читаю',
                'Часто читаю',
                'Часто читаю и иногда пишу',
                'Часто читаю и пишу',
            ]
        if column.startswith('slang_'):
            result['custom_sort'] = [
                'Знаю, что это',
                'Слышал(а) эти слова, но не могу объяснить другому их значение',
                'Мне это незнакомо',
            ]

        result['values'] = self.get_compressed_values()

        return result


def load_df(in_filename: str):
    df = pd.read_csv(in_filename, sep=',')

    def mapper(rus_column):
        return METADATA.field_by_title(rus_column).key

    df = df.rename(mapper=mapper, axis='columns')
    return df


def run(in_filename: str, out_filename: str):
    df = load_df(in_filename)

    validate_structure()

    data = {}

    columns = [field.key for field in METADATA.public_fields()]

    for column in columns:
        series = df[column]
        values = []
        field = METADATA.field_by_key(column)
        for value in series:
            if type(value) in (float, np.float64) and math.isnan(value):
                value = None
            if type(value) == np.float64:
                value = float(value)
            if field.type == 'int' and value:
                value = int(value)
            values.append(value)

        data[column] = SurveyFieldData(field, values).to_dict()

    with open(out_filename, mode='w') as js:
        print(
            json.dumps(
                {'data': data, 'structure': STRUCTURE, 'total': df.index.size},
                ensure_ascii=False,
            ),
            file=js,
        )
