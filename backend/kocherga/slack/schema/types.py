from kocherga.graphql import g

SlackUser = g.ObjectType('SlackUser', g.fields({'slack_id': str, 'image_url': str}))
