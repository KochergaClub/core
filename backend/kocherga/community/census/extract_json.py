import json
import math
import re
from collections import defaultdict
from typing import Union

import numpy as np
import pandas as pd

from .metadata import METADATA, STRUCTURE, SurveyField


def normalize_one(field: SurveyField, value):
    value = re.sub(r':\)$', '', value)
    value = re.sub(r'\.$', '', value)
    value = value.strip()
    if value == '':
        return None

    if not value.startswith('http'):
        value = value[0].upper() + value[1:]

    value = field.aliases.get(value.lower(), value)

    column = field.key
    if column == 'source' and 'gipsy' in value.lower():
        value = 'Покерный форум GipsyTeam.ru'

    return value


def split_values(field, value):
    # This is tricky because some answers included commas, but in some cases
    # commas were a separator of multiple answers.
    # We have to sort choices because shorter choice can be a substring of a longer choice,
    # so we should start with replacing the longer ones.
    presets = reversed(sorted(field.choices, key=lambda p: len(p)))

    values = []
    for preset in reversed(sorted(presets, key=lambda p: len(p))):
        if preset in value:
            # choice value must be surrounded with commas, otherwise it was probably entered manually
            value = re.sub(
                r'(?:^|(?<=, ))' + re.escape(preset) + r'(?=, |$)', 'PRESET', value
            )
            values.append(preset)

    other_parts = [part for part in value.split(', ') if part != 'PRESET']
    if other_parts:
        values.append(', '.join(other_parts))
    return values


def normalize(field: SurveyField, value):
    column = field.key

    if field.buckets:
        if value is None:
            return [None]
        assert type(value) in (float, int)
        boundaries = sorted(field.buckets.keys())
        for boundary in reversed(boundaries):
            if value >= boundary:
                return [field.buckets[boundary]]
        raise Exception(
            f"Lowest boundary is not low enough for value {value}, column {column}"
        )

    if not value:
        return [value]

    if type(value) == int:
        return [value]  # nothing to normalize

    if field.choices:
        values = split_values(field, value)
    elif column in ('hobby', 'job', 'speciality'):
        value = re.sub(
            r'\(.*?\)', '', value
        )  # get rid of (...), they are messing up with splitting-by-comma
        values = re.split(r',\s*', value)
    else:
        values = [value]

    return [normalize_one(field, v) for v in values]


def process_field_values(
    field: SurveyField, original_values: list[Union[float, int, str, None]]
):
    result = field.asdict()

    if field.buckets:
        result['output_type'] = 'str'
    else:
        result['output_type'] = field.type

    values = []
    for value in original_values:
        values.extend(normalize(field, value))

    # important for anonymization of our data!
    default = 0 if result['output_type'] == 'int' else ''
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

    result['values'] = grouped_list

    return result


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


def load_df(in_filename: str):
    df = pd.read_csv(in_filename, sep=',')

    def mapper(rus_column):
        return METADATA.field_by_title(rus_column).key

    df = df.rename(mapper=mapper, axis='columns')
    return df


def run(in_filename: str, out_filename: str, drop_rows: list[int] = []):
    df = load_df(in_filename)

    # for year 2021: drop_rows = [40, 41, 42, 136, 182, 376, 586]
    df = df.drop(drop_rows)

    validate_structure()

    data = {}

    for field in METADATA.public_fields():
        series = df[field.key]
        values: list[Union[None, float, int, str]] = []
        for value in series:
            if type(value) in (float, np.float64) and math.isnan(value):
                value = None
            elif type(value) == np.float64:
                value = float(value)
            elif field.type == 'int' and value:
                value = int(value)
            elif type(value) != float and type(value) != str:
                raise Exception(
                    f'Unknown value type: value {value}, type {type(value)}'
                )

            values.append(value)

        data[field.key] = process_field_values(field, values)

    with open(out_filename, mode='w') as js:
        print(
            json.dumps(
                {'data': data, 'structure': STRUCTURE, 'total': df.index.size},
                ensure_ascii=False,
            ),
            file=js,
        )
