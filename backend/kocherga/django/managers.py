import logging

logger = logging.getLogger(__name__)

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

    def relay_page(
        self: models.QuerySet,
        order=None,
        before=None,
        after=None,
        first=None,
        last=None,
    ):
        if not first and not last:
            # This is required by https://facebook.github.io/relay/graphql/connections.htm
            raise Exception("One of `first` or `last` must be set")

        if first and first > self.MAX_PAGE_SIZE or last and last > self.MAX_PAGE_SIZE:
            raise Exception(f'Max page size is {self.MAX_PAGE_SIZE}')

        if not order:
            default_ordering = self.model._meta.ordering
            if len(default_ordering) == 0:
                order = 'pk'
            elif len(default_ordering) == 1:
                order = default_ordering[0]
            else:
                raise Exception("Relay pager doesn't support multi-field orderings yet")

        unsigned_order = order[1:] if order[0] == '-' else order

        qs = self
        qs = qs.order_by(order)

        # TODO - base64-decode `before` and `after`
        # TODO - validate that `before` and `after` include the compatible ordering
        if before:
            if order[0] == '-':
                key = f'{unsigned_order}__gt'
            else:
                key = f'{unsigned_order}__lt'

            qs = qs.filter(**{key: before})

        if after:
            if order[0] == '-':
                key = f'{unsigned_order}__lt'
            else:
                key = f'{unsigned_order}__gt'

            qs = qs.filter(**{key: after})

        nodes = None
        has_more_forward = False
        if first and last:
            raise Exception('Only one of "first" and "last" should be set')
        elif first:
            limit = first
            nodes = list(qs[: limit + 1])
            if len(nodes) > limit:
                nodes = nodes[:limit]
                has_more_forward = True
        elif last:
            limit = last
            nodes = list(reversed(qs.reverse()[: limit + 1]))
            if len(nodes) > limit:
                nodes = nodes[-limit:]
                has_more_forward = True
        else:
            raise Exception("Huh? This case was already excluded above")

        has_previous_page = False
        if last:
            if has_more_forward:
                has_previous_page = True
        elif after:
            # FIXME - violates the standard, which says:
            # "If the server can efficiently determine that elements exist prior to after, return true."
            has_previous_page = True

        has_next_page = False
        if first:
            if has_more_forward:
                has_next_page = True
        elif before:
            # FIXME - see the note above
            has_next_page = True

        order_parts = unsigned_order.split('__')

        # Traverse node fields, possibly several levels deep, to get the field value which we use as startCursor and
        # endCursor.
        def get_node_ordering_field(node):
            result = node
            for part in order_parts:
                result = getattr(result, part)
            return result

        page_info = PageInfo(
            hasPreviousPage=has_previous_page,
            hasNextPage=has_next_page,
            startCursor=get_node_ordering_field(nodes[0]) if len(nodes) else None,
            endCursor=get_node_ordering_field(nodes[-1]) if len(nodes) else None,
        )

        return RelayConnection(
            pageInfo=page_info, nodes=nodes, edges=[{'node': node} for node in nodes]
        )


class RelayQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass
