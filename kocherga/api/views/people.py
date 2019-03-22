import logging
logger = logging.getLogger(__name__)

from rest_framework.response import Response
from rest_framework.decorators import api_view

import time

import kocherga.cm.tools

stats_cached_ts = None
stats_cached = None
CACHE_PERIOD = 5


@api_view()
def now(request):
    global stats_cached
    global stats_cached_ts

    now_ts = time.time()
    if stats_cached_ts and now_ts - stats_cached_ts < CACHE_PERIOD:
        logger.debug("return now stats from cache")
        return Response(stats_cached)

    stats = kocherga.cm.tools.now_stats()

    result = {
        "total": stats["total"],
        "customers": [
            {
                "first_name": c.first_name,
                "last_name": c.last_name,
                "card_id": c.card_id,
            }
            for c in stats["customers"]
            if c.privacy_mode == "public"
        ]
    }

    stats_cached = result
    stats_cached_ts = now_ts
    logger.debug("updated now stats")

    return Response(result)
