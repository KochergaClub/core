from kocherga.graphql import g

from typing import Optional

EventsFeedback = g.ObjectType(
    'EventsFeedback',
    fields=g.fields(
        {
            'id': 'ID!',
            'overall_score': Optional[int],
            'recommend_score': Optional[int],
            'content_score': Optional[int],
            'conductor_score': Optional[int],
            'source_friend': bool,
            'source_vk': bool,
            'source_fb': bool,
            'source_timepad': bool,
            'source_email': bool,
            'source_website': bool,
            'custom_source': Optional[str],
            'comment': Optional[str],
        }
    ),
)
