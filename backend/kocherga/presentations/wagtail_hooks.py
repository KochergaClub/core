import wagtail.admin.rich_text.editors.draftail.features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import (
    InlineStyleElementHandler,
)
from wagtail.core import hooks


# documentation: https://docs.wagtail.io/en/latest/advanced_topics/customisation/extending_draftail.html
@hooks.register('register_rich_text_features')
def register_bad_feature(features):
    feature_name = 'bad'
    type_ = 'BAD'

    # Configure how Draftail handles the feature in its toolbar.
    control = {
        'type': type_,
        'label': '👎',
        'description': 'Bad',
        'style': {'color': 'red'},
    }

    # Call register_editor_plugin to register the configuration for Draftail.
    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.InlineStyleFeature(control)
    )

    # Call register_converter_rule to register the content transformation conversion.
    features.register_converter_rule(
        'contentstate',
        feature_name,
        {
            'from_database_format': {
                'span[class=bad]': InlineStyleElementHandler(type_)
            },
            'to_database_format': {
                'style_map': {type_: {'element': 'span', 'props': {'class': 'bad'}}}
            },
        },
    )
