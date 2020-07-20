from kocherga.graphql import g

from .. import registry

# interfaces


def service_to_type(service):
    return service.slug.capitalize() + 'ExternalService'


def service_to_account_type(service):
    return service.slug.capitalize() + 'Account'


def resolve_ExternalService_type(service, *_):
    return service_to_type(service)


def resolve_ExternalServiceAccount_type(account, *_):
    return service_to_account_type(account.service)


ExternalService = g.InterfaceType(
    'ExternalService',
    fields=lambda: service_fields(ExternalServiceAccount),
    resolve_type=resolve_ExternalService_type,
)

ExternalServiceAccount = g.InterfaceType(
    'ExternalServiceAccount',
    fields=g.fields({'service': g.NN(ExternalService)}),
    resolve_type=resolve_ExternalServiceAccount_type,
)


def service_fields(account_type):
    return g.fields(
        {
            'slug': str,
            'accounts': g.Field(
                g.NNList(account_type), resolve=lambda obj, info: obj.list_accounts(),
            ),
        }
    )


# specific types
def create_account_and_service_types(service_class, account_fields):
    Account = g.ObjectType(
        service_to_account_type(service_class),
        fields=lambda: g.fields({'service': g.NN(Service), **account_fields}),
        interfaces=[ExternalServiceAccount],
    )

    Service = g.ObjectType(
        service_to_type(service_class),
        fields=service_fields(Account),
        interfaces=[ExternalService],
    )

    return [Account, Service]


exported_types = [
    *create_account_and_service_types(
        registry.WikiService, account_fields={'name': str}
    ),
    *create_account_and_service_types(
        registry.SlackService, account_fields={'email': str}
    ),
]
