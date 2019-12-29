import graphene

import kocherga.auth.schema
import kocherga.staff.schema
import kocherga.templater.schema
import kocherga.zadarma.schema
import kocherga.watchmen.schema
import kocherga.money.cashier.schema
import kocherga.ratio.schema
import kocherga.cm2.schema


class Query(
        kocherga.auth.schema.Query,
        kocherga.staff.schema.Query,
        kocherga.templater.schema.Query,
        kocherga.zadarma.schema.Query,
        kocherga.watchmen.schema.Query,
        kocherga.money.cashier.schema.Query,
        kocherga.ratio.schema.Query,
        kocherga.cm2.schema.Query,
        graphene.ObjectType
):
    pass


class Mutation(
        kocherga.auth.schema.Mutation,
        kocherga.staff.schema.Mutation,
        kocherga.templater.schema.Mutation,
        kocherga.zadarma.schema.Mutation,
        kocherga.watchmen.schema.Mutation,
        kocherga.money.cashier.schema.Mutation,
        kocherga.ratio.schema.Mutation,
        kocherga.cm2.schema.Mutation,
        graphene.ObjectType
):
    pass


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    auto_camelcase=False,
)
