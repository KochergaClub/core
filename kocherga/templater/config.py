class Field:
    def __init__(self, name, value_type='str'):
        self.name = name
        self.value_type = value_type

    def to_dict(self):
        return {
            'name': self.name,
            'value_type': self.value_type,
        }


class Schema:
    def __init__(self, fields):
        self.fields = fields

    def to_dict(self):
        return {
            'fields': [
                f.to_dict()
                for f in self.fields
            ]
        }


name2schema = {}

name2schema['vk-image'] = Schema(
    [
        Field('header'),
        Field('title'),
        Field('date', 'date'),
        Field('time'),
        Field('background_image'),
    ]
)

name2schema['mailchimp'] = Schema(
    [
        Field('start_date', 'date'),
        Field('end_date', 'date'),
    ]
)

name2schema['workshop-badge'] = Schema(
    [Field('date_text')]
)

name2schema['workshop-thin'] = Schema(
    [Field('date_text')]
)

name2schema['vk-cover'] = Schema(
    [Field('now_total', 'int')]
)
