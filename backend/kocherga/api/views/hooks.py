import logging

logger = logging.getLogger(__name__)

import kocherga.community.models
import kocherga.ratio.models
import kocherga.slack.client
import kocherga.tilda.models
from django.conf import settings
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes

# Routes for external hooks.

VK_SECRET = settings.KOCHERGA_VK['callback_secret']


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def r_vk_callback(request):
    payload = request.data

    req_secret = payload["secret"]
    assert req_secret == VK_SECRET

    # sorry for hardcode, I'll fix this later with https://vk.com/dev/groups.addCallbackServer
    if payload["type"] == "confirmation" and payload["group_id"] == 99973027:
        return HttpResponse("f4cc4bd9")

    channel = '#vk_support'

    obj = payload["object"]
    group_id = payload["group_id"]

    def notify(prefix, link):
        # TODO - notify kocherga.slack.channels instead for faster hook
        result = kocherga.slack.client.client().api_call(
            "chat.postMessage",
            text=f'{prefix}: {link}\n>>> {obj["text"]}',
            channel=channel,
        )
        if not result['ok']:
            raise Exception("Slack notification failed")

    if payload["type"] == "message_new":
        notify(
            'Новое сообщение вк-сообществу',
            f'https://vk.com/gim{group_id}?sel={obj["from_id"]}',
        )
    elif payload["type"] == "wall_reply_new":
        notify(
            'Новый комментарий',
            f'https://vk.com/wall-{group_id}_{obj["post_id"]}?reply={obj["id"]}',
        )
    elif payload["type"] == "wall_post_new":
        notify('Новый пост', f'https://vk.com/wall-{group_id}_{obj["id"]}')
    elif payload["type"] == "board_post_new":
        notify(
            'Новый комментарий в обсуждении',
            f'https://vk.com/topic-{group_id}_{obj["topic_id"]}?post={obj["id"]}',
        )
    elif payload["type"] == "photo_comment_new":
        notify(
            'Новый комментарий к фотографии',
            f'https://vk.com/photo-{group_id}_{obj["photo_id"]}',
        )
    elif payload["type"] == "video_comment_new":
        notify(
            'Новый комментарий к видеозаписи',
            f'https://vk.com/video-{group_id}_{obj["video_id"]}',
        )
    elif payload["type"] == "market_comment_new":
        notify(
            'Новый комментарий к товару',
            f'https://vk.com/club{group_id}?w=product-{group_id}_{obj["item_id"]}',
        )

    return HttpResponse("ok")


@api_view()
@permission_classes((permissions.AllowAny,))
def r_tilda_webhook(request):
    page_id = request.query_params.get('pageid', None)
    if page_id is not None:
        # TODO - register notification and export in background job, as recommended in http://help-ru.tilda.ws/api
        kocherga.tilda.models.TildaPage.objects.import_page(page_id)
    return HttpResponse("ok")


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def r_generate_promocode_webhook(request):
    # Tilda sends test request when adding new webhooks
    if request.data.get('test', '') == 'test':
        return HttpResponse('test response')

    email = (
        request.data.get('EMAIL')
        or request.data.get('email')
        or request.data.get('Email')
    )
    if not email:
        raise Exception("Email is not set")

    training_slug = request.data.get('training')
    if not training_slug:
        raise Exception("training is not set")

    training = kocherga.ratio.models.Training.objects.get(slug=training_slug)
    training.send_unique_promocode(email)

    return HttpResponse('ok')


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def r_create_community_lead_webhook(request):
    # Tilda sends test request when adding new webhooks
    if request.data.get('test', '') == 'test':
        return HttpResponse('test response')

    email = (
        request.data.get('EMAIL')
        or request.data.get('email')
        or request.data.get('Email')
    )
    if not email:
        raise Exception("Email is not set")

    name = request.data.get('name')
    if not name:
        raise Exception("name is not set")

    phone = request.data.get('phone', '')

    description = f"""
        Email: {email}<br />
        Phone: {phone}
    """

    lead = kocherga.community.models.Lead(
        name=name,
        description=description,
    )
    lead.full_clean()
    lead.save()

    return HttpResponse('ok')
