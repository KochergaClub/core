from dataclasses import dataclass
from typing import Optional, List, Any

from django.db import models


@dataclass
class PageInfo:
    hasNextPage: bool
    hasPreviousPage: bool
    startCursor: Optional[str]
    endCursor: Optional[str]


@dataclass
class RelayConnection:
    pageInfo: PageInfo
    nodes: List[Any]
    edges: List[Any]


class RelayQuerySetMixin:
    DEFAULT_PAGE_SIZE = 100
    MAX_PAGE_SIZE = 100

    def relay_page(self, order=None, before=None, after=None, first=None, last=None):
        # supported param combinations:
        # - all none
        # - before+last
        # - after+first
        # - first

        if first and first > self.MAX_PAGE_SIZE or last and last > self.MAX_PAGE_SIZE:
            raise Exception(f'Max page size is {self.MAX_PAGE_SIZE}')

        if not order:
            order = 'pk'  # FIXME - get default ordering from model

        unsigned_order = order[1:] if order[0] == '-' else order

        qs = self
        qs = qs.order_by(order)

        if before:
            # paging backward
            if first or after:
                raise Exception('only "last" is compatible with "before"')

            raise Exception("Not implemented yet")

            qs = qs.reverse()[:(last or self.DEFAULT_PAGE_SIZE)]
        else:
            # paging forward
            if last or before:
                raise Exception('only "first" is compatible with forward paging')

            if after:
                # TODO - base64-encode `after`
                # TODO - validate that `after` includes the compatible ordering
                if order[0] == '-':
                    key = f'{unsigned_order}__lt'
                else:
                    key = f'{unsigned_order}__gt'

                qs = qs.filter(
                    **{
                        key: after
                    }
                )

            qs = qs[:(first or self.DEFAULT_PAGE_SIZE)]

        nodes = list(qs)

        page_info = PageInfo(
            hasNextPage=True,  # FIXME - ask for one more element and set accordingly
            hasPreviousPage=False,  # FIXME - how?
            startCursor=getattr(nodes[0], unsigned_order) if len(nodes) else None,
            endCursor=getattr(nodes[-1], unsigned_order) if len(nodes) else None,
        )

        return RelayConnection(
            pageInfo=page_info,
            nodes=nodes,
            edges=[
                {'node': node}
                for node in nodes
            ]
        )


class RelayQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass
