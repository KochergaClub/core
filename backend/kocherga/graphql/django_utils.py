import inspect
import types
from abc import abstractmethod
from typing import Any, Callable, Dict, List, Tuple, Type, Union

import kocherga.django.schema.types
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.fields.reverse_related import ForeignObjectRel
from kocherga.django.errors import BoxedError, GenericError
from kocherga.error import PublicError
from kocherga.graphql.permissions import check_permissions

import graphql

from . import basic_types, g, helpers


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
    elif isinstance(db_field, models.DecimalField):
        type_ = g.Float

        def resolve_decimal(obj, info):
            return float(getattr(obj, info.field_name))

        resolve = resolve_decimal
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

    description = None
    if field_name != 'id' and db_field._verbose_name:
        # can be lazy, so need to be wrapped in str()
        description = str(db_field._verbose_name)

    return g.Field(type_, description=description, resolve=resolve)


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
        # FIXME - note that db_field.related_name can be different from field_name.
        # E.g., if `related_name` is not set on `foo = ForeignKey(...)`, then the field_name should be `foo`,
        # while db_field.related_name will be `foo_set`.
        # (But I tried the naive solution here and it didn't work, so please investigate first before changing this
        # code.)
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
    interfaces: List[g.InterfaceType] = [],
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
        interfaces=interfaces,
    )


class CreateMutation(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    """
    Example:
        class createFoo(CreateMutation):
            model = models.Foo
            fields = ['first', 'second']

            permissions = [...]

            # note that the actual mutation result will be a union including GenericError and ValidationError
            result_type = types.Foo
    """

    def resolve(self, _, info, input):
        params = {}
        for field in self.fields:
            if field in input:
                params[field] = input[field]

        params = self.prepare_params(params, info)
        obj = self.model(**params)

        try:
            obj.full_clean()
        except ValidationError as e:
            return BoxedError(e)
        obj.save()
        return obj

    def prepare_params(
        self, params: Dict[str, Any], info: graphql.type.GraphQLResolveInfo
    ):
        """Override this method if you need to set additional default params or rewrite input arguments before creating
        an object."""
        return params

    @property
    @abstractmethod
    def model(self) -> Type[models.Model]:
        ...

    @property
    @abstractmethod
    def fields(self) -> List[str]:
        ...

    @property
    @abstractmethod
    def result_type(self) -> g.ObjectType:
        ...

    @property
    def input(self):
        result: Dict[str, Any] = {}
        model = self.model
        for field_name in self.fields:
            graphql_field = model_field(model, field_name)
            graphql_type = graphql_field.type

            if isinstance(graphql_type, graphql.GraphQLNonNull):
                # set nullable is field has a preset default or if it can be blank
                db_field = model._meta.get_field(field_name)
                if db_field.has_default() or db_field.blank:
                    graphql_type = graphql_type.of_type

            result[field_name] = graphql_type

        return result

    @property
    def result_types(self):
        return {
            self.model: self.result_type,
            BoxedError: kocherga.django.schema.types.ValidationError,
            GenericError: kocherga.django.schema.types.GenericError,  # unused for now
        }


class UpdateMutation(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    """
    Example:
        class updateFoo(UpdateMutation):
            model = models.Foo
            fields = ['first', 'second']

            permissions = [...]

            # note that the actual mutation result will be a union including GenericError and ValidationError
            result_type = types.Foo
    """

    def resolve(self, _, info, input):
        # TODO - return generic error if object is not found
        obj = self.model.objects.get(id=input['id'])

        for field in self.fields:
            if field in input:
                setattr(obj, field, input[field])

        try:
            obj.full_clean()
        except ValidationError as e:
            return BoxedError(e)
        obj.save()
        return obj

    @property
    @abstractmethod
    def model(self) -> Type[models.Model]:
        ...

    @property
    @abstractmethod
    def fields(self) -> List[str]:
        ...

    @property
    @abstractmethod
    def result_type(self) -> g.ObjectType:
        ...

    @property
    def input(self):
        result: Dict[str, Any] = {'id': 'ID!'}
        model = self.model
        for field_name in self.fields:
            if field_name == 'id':
                raise Exception(
                    "`id` is forbidden in mutation fields since it's a default lookup field"
                )

            graphql_field = model_field(model, field_name)
            graphql_type = graphql_field.type

            # all update input fields must be nullable
            if isinstance(graphql_type, graphql.GraphQLNonNull):
                graphql_type = graphql_type.of_type

            result[field_name] = graphql_type

        return result

    @property
    def result_types(self):
        return {
            self.model: self.result_type,
            BoxedError: kocherga.django.schema.types.ValidationError,
            GenericError: kocherga.django.schema.types.GenericError,  # unused for now
        }


class DeleteMutation(helpers.UnionFieldMixin, helpers.BaseField):
    """
    Example:
        class deleteFoo(DeleteMutation):
            model = models.Foo
            permissions = [...]
    """

    class Ok:
        ok = True

    def resolve(self, _, info, id):
        obj = self.model.objects.get(id=id)
        obj.delete()
        return self.Ok()

    @property
    @abstractmethod
    def model(self) -> Type[models.Model]:
        ...

    # TODO - implement lookup_field arg, e.g. for Event.uuid case
    args = {'id': 'ID!'}

    result_types = {Ok: basic_types.BasicResult}


# Less flexible but more convenient variation of UnionFieldMixin.
# Catches common exceptions and turns them into GraphQL error types.
class SmartMutationMixin:
    @abstractmethod
    def smart_resolve(self, obj, info, input):
        ...

    @property
    @abstractmethod
    def ok_result(self) -> Union[Dict[str, Any], g.ObjectType]:
        ...

    def wrapped_ok_result(self) -> g.ObjectType:
        ok_result = self.ok_result
        if type(ok_result) == dict:
            # Unique anonymous result; note that anonymous result is NN by default.
            # TODO - somehow check that we're in top-level mutation or query?
            # FieldNameResult doesn't make much sense in nested fields...
            return g.ObjectType(
                self.result_object_name(postfix='OkResult'),
                g.fields(ok_result),
            )
        else:
            return g.as_type(ok_result)

    # TODO - make customizable through class-level flags (e.g. `catch_validation_errors = True`)
    error_class_to_graphql_type = {
        GenericError: kocherga.django.schema.types.GenericError,
        BoxedError: kocherga.django.schema.types.ValidationError,
    }

    def resolve(self, obj, info, input):
        try:
            return self.smart_resolve(obj, info, input)
        except Exception as e:
            if isinstance(e, PublicError):
                return GenericError(e.message)
            if isinstance(e, ValidationError):
                return BoxedError(e)

            raise Exception("Internal error")

    @property
    def result(self):
        wrapped_ok_result = self.wrapped_ok_result()

        def resolve_type(obj, info, *_):
            for (error_class, graphql_type) in self.error_class_to_graphql_type.items():
                if isinstance(obj, error_class):
                    return graphql_type

            return wrapped_ok_result

        return g.NN(
            g.UnionType(
                self.result_object_name(),
                types=[
                    wrapped_ok_result,
                    *self.error_class_to_graphql_type.values(),
                ],
                resolve_type=resolve_type,
            )
        )
