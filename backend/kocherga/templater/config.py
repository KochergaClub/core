class Field:
    def __init__(self, name, value_type='str', default=None):
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
        Field('date', 'date'),
        Field('time'),
        Field('background_image'),
        Field('realm'),
    ]
)

name2schema['mailchimp'] = Schema(
    [Field('start_date', 'date'), Field('end_date', 'date')]
)

name2schema['workshop-badge'] = Schema([Field('date_text')])

name2schema['workshop-thin'] = Schema([Field('date_text')])

name2schema['vk-cover'] = Schema([Field('now_total', 'int')])

name2schema['integration'] = Schema([Field('date_text')])

name2schema['integration-fb'] = Schema([Field('date_text')])

name2schema['og-image'] = Schema([])

name2schema['training'] = Schema(
    [
        Field('date_text'),
        Field('title'),
        Field('title_scale', value_type='number', default=1),
        Field('subtitle'),
        Field('background_url'),
    ],
)
