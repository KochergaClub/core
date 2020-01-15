from ariadne import QueryType

from .. import models

Query = QueryType()


@Query.field('zadarmaPbxCalls')
def resolve_zadarmaPbxCalls(_, info, **pager):
    qs = models.PbxCall.objects.all()
    if not info.context.user.has_perm('zadarma.admin'):
        qs = qs.filter(data__staff_member__user__pk=info.context.user.pk)

    return qs.relay_page(
        order='-ts',
        **pager
    )


@Query.field('zadarmaPbxCall')
def resolve_zadarmaPbxCall(_, info, pbx_call_id):
    return models.PbxCall.objects.get(pk=pbx_call_id)