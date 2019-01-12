import logging
logger = logging.getLogger(__name__)

from django.http import JsonResponse
from django.views.decorators.http import require_safe

import time

import kocherga.cm.scraper

stats_cached_ts = None
stats_cached = None
CACHE_PERIOD = 5

@require_safe
def now(request):
    global stats_cached
    global stats_cached_ts

    now_ts = time.time()
    if stats_cached_ts and now_ts - stats_cached_ts < CACHE_PERIOD:
        logger.debug("return now stats from cache")
        return JsonResponse(stats_cached)

    stats = kocherga.cm.scraper.now_stats()

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
    logger.info("updated now stats")

    return JsonResponse(result)
