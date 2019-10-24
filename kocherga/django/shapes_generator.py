import json

from django.db.models import fields

from kocherga.events.models.feedback import ScoreField

from kocherga.events.serializers import FeedbackSerializer


def convert_field(field):
    field_cls = type(field)

    result = {
        'name': field.name,
        'optional': field.blank,
    }

    if field.verbose_name:
        result['title'] = field.verbose_name

    if field_cls == fields.TextField:
        result['type'] = 'string'
    elif field_cls == fields.CharField:
        if field.choices:
            result['type'] = 'choice'
            result['options'] = [c[0] for c in field.choices]
        else:
            result['type'] = 'string'
    elif field_cls == fields.BooleanField:
        result['type'] = 'boolean'
    elif issubclass(field_cls, ScoreField):
        result['type'] = 'number'
        result['min'] = 0
        result['max'] = 10
    elif issubclass(field_cls, fields.IntegerField):
        result['type'] = 'number'
    # elif field_cls == fields.AutoField:
    #     result['type'] = 'number'
    #     result['readonly'] = True
    else:
        print("Unknown field class " + str(field_cls))
        return

    return result


def generate_shapes_to_fh(fh):
    serializers = [FeedbackSerializer]

    print("import { FormShape } from '~/components/forms/types';", file=fh)
    print("const shapes: { [k: string]: { [k: string]: FormShape } } = ", end='', file=fh)

    shapes = {}

    for serializer in serializers:
        model = serializer.Meta.model
        app_label = model._meta.app_label
        model_name = model._meta.model_name

        shape = []

        for field_name in serializer.Meta.fields:
            field = model._meta.get_field(field_name)
            frontend_field = convert_field(field)
            if not frontend_field:
                continue  # skip for now
            shape.append(frontend_field)

        if app_label not in shapes:
            shapes[app_label] = {}
        shapes[app_label][model_name] = shape

    print(
        json.dumps(shapes, indent=2, ensure_ascii=False),
        end='',
        file=fh,
    )
    print(';', file=fh)
    print('export default shapes;', file=fh)


def generate_shapes():
    with open('./jsx/shapes.ts', 'w') as fh:
        generate_shapes_to_fh(fh)
