from kocherga.graphql import helpers
from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.wagtail import graphql_utils as wagtail_utils

from ... import models

RatioTestimonialProduct = DjangoObjectType(
    'RatioTestimonialProduct',
    model=models.TestimonialProduct,
    db_fields=[
        'id',
        'title',
        'color',
        'link',
    ],
)

RatioTestimonial = DjangoObjectType(
    'RatioTestimonial',
    model=models.Testimonial,
    db_fields=[
        'id',
        'author_name',
        'author_description',
    ],
    extra_fields={
        'author_image': wagtail_utils.image_rendition_field(
            models.Testimonial, 'author_image'
        ),
        'text': wagtail_utils.richtext_field(models.Testimonial, 'text'),
        'product': RatioTestimonialProduct,
    },
)

RatioTestimonialConnection = helpers.ConnectionType(RatioTestimonial)
