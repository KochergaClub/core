import enum


class ValueType(enum.Enum):
    STRING = 1
    INT = 2
    FLOAT = 3
    DATE = 4


class Field:
    def __init__(self, name, value_type: ValueType = ValueType.STRING, default=None):
        self.name = name
        self.value_type = value_type
        self.default = default

    def to_dict(self):
        return {
            'name': self.name,
            'value_type': self.value_type,
            'default': self.default,
        }


class Schema:
    def __init__(self, fields):
        self.fields = fields

    def to_dict(self):
        return {'fields': [f.to_dict() for f in self.fields]}


name2schema = {}

name2schema['vk-image'] = Schema(
    [
        Field('header'),
        Field('title'),
        Field('date', value_type=ValueType.DATE),
        Field('time'),
        Field('background_image'),
        Field('realm'),
    ]
)

name2schema['mailchimp'] = Schema(
    [
        Field('start_date', value_type=ValueType.DATE),
        Field('end_date', value_type=ValueType.DATE),
    ]
)

name2schema['workshop-badge'] = Schema(
    [
        Field('date_text'),
    ]
)

name2schema['workshop-thin'] = Schema(
    [
        Field('date_text'),
    ]
)

name2schema['vk-cover'] = Schema(
    [
        Field('now_total', value_type=ValueType.INT, default=0),
    ]
)

name2schema['integration'] = Schema(
    [
        Field('date_text'),
    ]
)

name2schema['integration-fb'] = Schema(
    [
        Field('date_text'),
    ]
)

name2schema['og-image'] = Schema([])

name2schema['training'] = Schema(
    [
        Field('date_text'),
        Field('title'),
        Field('title_scale', value_type=ValueType.FLOAT, default=1),
        Field('subtitle'),
        Field('background_url'),
    ],
)

name2schema['ratio-online-badge'] = Schema([Field('text')])
