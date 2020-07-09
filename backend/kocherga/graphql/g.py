from typing import Dict, Any, Union
import graphql

Field = graphql.GraphQLField
InputField = graphql.GraphQLInputField


def NNList(t):
    return graphql.GraphQLNonNull(graphql.GraphQLList(graphql.GraphQLNonNull(t)))


NN = graphql.GraphQLNonNull
List = graphql.GraphQLList

ID = graphql.GraphQLID
String = graphql.GraphQLString
Boolean = graphql.GraphQLBoolean
Int = graphql.GraphQLInt
Float = graphql.GraphQLFloat

ObjectType = graphql.GraphQLObjectType
InputObjectType = graphql.GraphQLInputObjectType
InterfaceType = graphql.GraphQLInterfaceType
EnumType = graphql.GraphQLEnumType
Argument = graphql.GraphQLArgument


# from strawberry-graphql
def is_union(annotation):
    """Returns True if annotation is a typing.Union"""

    annotation_origin = getattr(annotation, "__origin__", None)

    return annotation_origin == Union


# from strawberry-graphql
def is_optional(annotation):
    """Returns True if the annotation is typing.Optional[SomeType]"""

    # Optionals are represented as unions

    if not is_union(annotation):
        return False

    types = annotation.__args__

    # A Union to be optional needs to have at least one None type
    return any([x == None.__class__ for x in types])  # noqa:E711


# from strawberry-graphql
def get_optional_annotation(annotation):
    types = annotation.__args__
    non_none_types = [x for x in types if x != None.__class__]  # noqa:E711

    return non_none_types[0]


def as_type(v):
    if isinstance(v, graphql.GraphQLType):
        return v
    elif v == 'ID!':
        return NN(ID)
    elif v == 'ID':
        return ID
    elif v == str:
        return NN(String)
    elif v == int:
        return NN(Int)
    elif v == float:
        return NN(Float)
    elif v == bool:
        return NN(Boolean)
    elif is_optional(v):
        inner_v = get_optional_annotation(v)
        if inner_v == str:
            return String
        elif inner_v == int:
            return Int
        elif inner_v == float:
            return Float
        elif inner_v == bool:
            return Boolean
        else:
            raise Exception(f"Value {inner_v} can't be wrapped in Optional")

    raise Exception(f"Unknown value {v}")


def _fields(params: Dict[str, Any], FieldClass):
    result = {}
    for k, v in params.items():
        if isinstance(v, FieldClass):
            result[k] = v
        else:
            result[k] = FieldClass(as_type(v))

    return result


def fields(params: Dict[str, Any]):
    return _fields(params, Field)


def input_fields(params: Dict[str, Any]):
    return _fields(params, InputField)


def arguments(params: Dict[str, Any]):
    return _fields(params, Argument)
