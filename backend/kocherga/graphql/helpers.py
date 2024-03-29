from __future__ import annotations

import logging

logger = logging.getLogger(__name__)

from abc import ABC, abstractmethod
from typing import Any, Callable, Dict, List, Optional, Union

import graphql

from . import basic_types, g
from .permissions import check_permissions


def capitalize_first_only(s):
    return s[:1].upper() + s[1:]


class FieldHelper:
    def input(self):
        raise Exception("Not implemented")

    def result(self):
        raise Exception("Not implemented")

    def build(self):
        raise Exception("Not implemented")


class Collection:
    fields: Dict[str, graphql.GraphQLField]

    def __init__(self):
        self.fields = {}

    def field(self, func: Callable[[FieldHelper], graphql.GraphQLField]):
        name = func.__name__
        helper = FieldHelper()

        result = func(helper)
        self.add_field(name, result)

    def class_field(self, cls):
        name = cls.__name__

        instance = cls()

        if isinstance(instance, BaseField):
            result = instance.as_field()
        else:
            logger.warn(
                f"@class_field decorates raw class {cls}, consider using BaseField instead for more safety"
            )
            result = g.Field(
                instance.result,
                args=getattr(instance, 'args', {}),
                resolve=instance.resolve,
            )

        self.add_field(name, result)

    def add_field(self, name: str, value: graphql.GraphQLField):
        if name in self.fields:
            raise Exception(f"Field {name} already defined")
        self.fields[name] = value

    def as_dict(self):
        return self.fields

    @classmethod
    def merge(cls, *params: Dict[str, graphql.GraphQLField]):
        merged = Collection()
        for param in params:
            for name, value in param.items():
                merged.add_field(name, value)

        return merged.as_dict()


def merge_field_dicts(field_dicts: List[Dict[str, g.Field]]):
    result: Dict[str, g.Field] = {}
    for field_dict in field_dicts:
        for k, v in field_dict.items():
            if k in result:
                raise Exception(f"Duplicate field {k}")
            result[k] = v
    return result


def connection_args():
    return g.arguments(
        {
            'before': Optional[str],
            'after': Optional[str],
            'first': Optional[int],
            'last': Optional[int],
        }
    )


def ConnectionField(connection_type, resolve, args={}):
    return g.Field(
        connection_type,
        args=g.arguments({**connection_args(), **args}),
        resolve=resolve,
    )


def ConnectionType(node_type):
    edge_type = g.ObjectType(
        node_type.name + 'Edge', fields={'node': g.Field(g.NN(node_type))}
    )

    connection_type = g.ObjectType(
        node_type.name + 'Connection',
        fields={
            'pageInfo': g.Field(g.NN(basic_types.PageInfo)),
            'nodes': g.NNList(node_type),
            'edges': g.NNList(edge_type),
        },
    )

    return connection_type


PermissionType = Callable[[Any, Any], bool]


def field_with_permissions(
    type_: graphql.GraphQLOutputType,
    permissions: List[PermissionType],
    fallback_to_null=False,
):
    field_type = type_
    if fallback_to_null:
        if isinstance(field_type, graphql.GraphQLNonNull):
            field_type = field_type.of_type

    return g.Field(
        field_type,
        resolve=check_permissions(permissions, fallback_to_null=fallback_to_null)(
            graphql.default_field_resolver
        ),
    )


class BaseField(ABC):
    def result_object_name(self, postfix='Result'):
        return capitalize_first_only(self.__class__.__name__) + postfix

    def as_field(self):
        result = self.result
        if type(result) == dict:
            # Unique anonymous result; note that anonymous result is NN by default.
            # TODO - somehow check that we're in top-level mutation or query?
            # FieldNameResult doesn't make much sense in nested fields...
            result = g.NN(
                g.ObjectType(
                    self.result_object_name(),
                    g.fields(result),
                )
            )
        else:
            result = g.as_type(result)

        args = getattr(self, 'args', {})
        args = g.arguments(args)

        return g.Field(
            result,
            args=args,
            resolve=check_permissions(self.permissions)(self.resolve),
            deprecation_reason=self.deprecation_reason,
        )

    @property
    @abstractmethod
    def permissions(self) -> List[PermissionType]:
        ...

    @property
    @abstractmethod
    def result(self):
        ...

    @property
    @abstractmethod
    def resolve(self):
        ...

    deprecation_reason: Optional[str] = None


class BaseFieldWithInput(BaseField):
    @property
    def args(self):
        input = self.input
        if isinstance(input, dict):
            # unique anonymous input
            input = g.InputObjectType(
                capitalize_first_only(self.__class__.__name__) + 'Input',
                g.input_fields(input),
            )
        return {'input': g.NN(input)}

    @property
    @abstractmethod
    def input(self) -> Union[graphql.GraphQLInputObjectType, Dict[str, Any]]:
        ...


class UnionFieldMixin:
    @property
    @abstractmethod
    def result_types(self) -> Dict[type, g.ObjectType]:
        ...

    @property
    def result(self):
        result_types = self.result_types

        def resolve_type(obj, info, *_):
            for cls in result_types.keys():
                if isinstance(obj, cls):
                    return result_types[cls]

            raise Exception(f"Can't recognize {obj} as allowed return type")

        return g.NN(
            g.UnionType(
                self.result_object_name(),
                types=list(result_types.values()),
                resolve_type=resolve_type,
            )
        )
