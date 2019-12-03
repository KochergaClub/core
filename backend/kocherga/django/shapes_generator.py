import json

from django.db.models import fields
import rest_framework.serializers

from kocherga.events.models.feedback import ScoreField

import kocherga.events.serializers


def convert_field(field):
    field_cls = type(field)

    result = {
        'name': field.name,
        'optional': field.blank,
    }

    if field.verbose_name:
        result['title'] = field.verbose_name

    if field_cls in (fields.TextField, fields.SlugField, fields.DateTimeField):
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
    elif issubclass(field_cls, fields.IntegerField) or field_cls == fields.related.ForeignKey:
        result['type'] = 'number'
    elif field_cls == fields.AutoField:
        result['type'] = 'number'
        result['readonly'] = True
    else:
        print(f"Unknown field class {field_cls} for field {field.name}")
        return

    return result


def build_shape(serializer_class):
    model = serializer_class.Meta.model

    shape = []

    for (field_name, field) in serializer_class().fields.items():
        if field.source == '*':
            continue  # skip for now, probably SerializerMethodField or something
        if '.' in field.source:
            if type(field) != rest_framework.serializers.SlugField:
                raise Exception(f"Can't process field {field_name} for {serializer_class}")
            frontend_field = {
                'name': field_name,
                'type': 'string',
            }
        else:
            model_field = model._meta.get_field(field.source)
            frontend_field = convert_field(model_field)
            if not frontend_field:
                continue  # skip for now
        shape.append(frontend_field)

    return shape


def generate_shapes_to_fh(fh):
    serializers = [
        kocherga.events.serializers.FeedbackSerializer,
        kocherga.events.serializers.PublicEventSerializer,
    ]

    print("import { FormShape } from '~/components/forms/types';", file=fh)
    print("const shapes: { [k: string]: { [k: string]: FormShape } } = ", end='', file=fh)

    shapes = {}

    for serializer_class in serializers:
        print(f"Processing serializer {serializer_class}")
        model = serializer_class.Meta.model
        app_label = model._meta.app_label
        model_name = model._meta.model_name

        shape = build_shape(serializer_class)

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
