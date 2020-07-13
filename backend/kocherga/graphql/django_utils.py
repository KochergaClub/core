from kocherga.graphql import g
from kocherga.graphql.permissions import check_permissions
from typing import List, Dict, Union, Tuple, Any
import types

from django.db import models


def model_field(model: models.Model, field_name: str):
    db_field = model._meta.get_field(field_name)

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

    return g.Field(type_)


def model_fields(model: models.Model, field_names: List[str]):
    result = {}
    for field_name in field_names:
        result[field_name] = model_field(model, field_name)

    return result


def related_field(
    model: models.Model,
    field_name: str,
    item_type: g.ObjectType,
    permissions: List[Any] = [],
):
    db_field = model._meta.get_field(field_name)
    assert isinstance(db_field, models.base.ForeignObjectRel) or isinstance(
        db_field, models.fields.related.ManyToManyField
    )

    @check_permissions(permissions)
    def resolve(obj, info):
        return list(getattr(obj, field_name).all())

    return g.Field(g.NNList(item_type), resolve=resolve)


def DjangoObjectType(
    name: str,
    model: models.Model,
    db_fields: List[str],
    related_fields: Dict[str, Union[Tuple[str, g.ObjectType], g.ObjectType]] = {},
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

    return g.ObjectType(
        name,
        fields=lambda: g.fields(
            {**model_fields(model, db_fields), **build_related(), **build_extra()}
        ),
    )
