name2schema = {}

field = lambda name: { 'name': name, 'type': str }

name2schema['vk-image'] = {
    'fields': [field(x) for x in ('header', 'title', 'date', 'time', 'background_image')]
}

name2schema['mailchimp'] = {
    'fields': [field(x) for x in ('start_date', 'end_date')],
}

name2schema['workshop-badge'] = {
    'fields': [field('date_text')],
}
