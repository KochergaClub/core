from typing import List, Dict, Union, Tuple, Any, Type, Callable
import types
import inspect

import graphql
from kocherga.graphql import g
from kocherga.graphql.permissions import check_permissions

from django.db import models
from django.db.models.fields.reverse_related import ForeignObjectRel


def model_field(model: Type[models.Model], field_name: str):
    db_field = model._meta.get_field(field_name)
    resolve = None

    if (
        isinstance(db_field, models.TextField)
        or isinstance(db_field, models.CharField)  # FIXME - CharField can be ID too
        or isinstance(db_field, models.DateField)
        or isinstance(db_field, models.TimeField)
        or isinstance(db_field, models.DateTimeField)
    ):
        type_ = g.String
    elif isinstance(db_field, models.IntegerField):
        if db_field.primary_key:
            type_ = g.ID
        else:
            type_ = g.Int
    elif isinstance(db_field, models.DurationField):
        type_ = g.Int

        def resolve_duration(obj, info):
            value = getattr(obj, info.field_name)
            if not value:
                return None
            return value.total_seconds()

        resolve = resolve_duration
    elif isinstance(db_field, models.FloatField):
        type_ = g.Float
    elif isinstance(db_field, models.BooleanField):
        type_ = g.Boolean
    else:
        raise Exception(
            f"Unknown Django field type, can't associate with GraphQL type: {db_field}"
        )

    if not db_field.null:
        type_ = g.NN(type_)

    return g.Field(type_, resolve=resolve)


def model_fields(model: Type[models.Model], field_names: List[str]):
    result = {}
    for field_name in field_names:
        result[field_name] = model_field(model, field_name)

    return result


def related_field(
    model: Type[models.Model],
    field_name: str,
    item_type: g.ObjectType,
    permissions: List[Any] = [],
):
    db_field = model._meta.get_field(field_name)
    assert isinstance(db_field, ForeignObjectRel) or isinstance(
        db_field, models.fields.related.ManyToManyField
    )

    @check_permissions(permissions)
    def resolve(obj, info):
        return list(getattr(obj, field_name).all())

    return g.Field(g.NNList(item_type), resolve=resolve)


def DjangoObjectType(
    name: str,
    model: Type[models.Model],
    db_fields: List[str],
    related_fields: Union[
        Dict[str, Union[Tuple[str, g.ObjectType], g.ObjectType]],
        Callable[[], Dict[str, Union[Tuple[str, g.ObjectType], g.ObjectType]]],
    ] = {},
    method_fields: List[str] = [],
    extra_fields={},
):
    def build_related():
        result = {}
        # TODO - support lambda for related_fields (see below for extra_fields example)
        if isinstance(related_fields, types.FunctionType):
            related_fields_dict = related_fields()
        else:
            related_fields_dict = related_fields

        for key, config in related_fields_dict.items():
            if type(config) == tuple:
                (db_attr, item_type) = config
            elif isinstance(config, g.ObjectType):
                db_attr = key
                item_type = config
            else:
                raise Exception(f"Invalid related field config {config}")

            result[key] = related_field(model, db_attr, item_type=item_type)

        return result

    def build_extra():
        if isinstance(extra_fields, types.FunctionType):
            return extra_fields()
        else:
            return extra_fields

    def build_method_fields():
        result: Dict[str, graphql.GraphQLField] = {}
        for method_name in method_fields:
            # only methods with annotated return type are supported
            signature = inspect.signature(getattr(model, method_name))

            # only methods without arguments are supported
            assert list(signature.parameters.keys()) == ['self']

            # note the method_name=method_name trick, it's important!
            # See also:
            # https://stackoverflow.com/questions/8946868/is-there-a-pythonic-way-to-close-over-a-loop-variable
            field = g.Field(
                g.as_type(signature.return_annotation),
                resolve=lambda obj, info, method_name=method_name: getattr(
                    obj, method_name
                )(),
            )
            result[method_name] = field
        return result

    return g.ObjectType(
        name,
        fields=lambda: g.fields(
            {
                **model_fields(model, db_fields),
                **build_related(),
                **build_method_fields(),
                **build_extra(),
            }
        ),
    )
