from datetime import timedelta
import os.path

from PIL import Image, ImageFont, ImageDraw

import locale
locale.setlocale(locale.LC_TIME, locale.normalize('ru'))

from werkzeug.utils import secure_filename

class ImageStorage:
    def __init__(self, directory):
        self.directory = directory

        self.font_dir = os.path.join(self.directory, 'fonts')
        self.assets_dir = os.path.join(self.directory, 'assets')
        self.event_dir = os.path.join(self.directory, 'event_image')
        self.mailchimp_dir = os.path.join(self.directory, 'mailchimp')

        for d in (self.font_dir, self.assets_dir, self.event_dir, self.mailchimp_dir):
            if not os.path.exists(d):
                os.mkdir(d)

    def event_image_file(self, event_id, image_type):
        return os.path.join(self.event_dir, secure_filename('{}.{}.jpg'.format(image_type, event_id)))

    def schedule_file(self, start_date):
        filename = os.path.join(self.mailchimp_dir, secure_filename('{}.jpg'.format(start_date.strftime('%Y-%m-%d'))))

        if not os.path.isfile(filename):
            image = self.create_mailchimp_image(start_date)
            image.save(filename)

        return filename

    def font(self, name, size):
        name2file = {
            'Intro': 'Intro.otf',
            'LucidaGrande': 'LucidaGrande.ttc',
        }
        return ImageFont.truetype(
            os.path.join(self.font_dir, name2file[name]),
            size
        )

    def create_mailchimp_image(self, start_date):
        WIDTH = 900
        HEIGHT = 260
        RIGHT_HALF_WIDTH = WIDTH - HEIGHT
        image = Image.new('RGB', (WIDTH, HEIGHT), color='white')
        draw = ImageDraw.Draw(image)

        logo = Image.open(
            os.path.join(
                self.assets_dir,
                'vk-logo-without-text.png'
            )
        )
        logo = logo.resize((HEIGHT, HEIGHT), resample=Image.BICUBIC)

        fnt_h1 = self.font('Intro', 96)
        fnt_h2 = self.font('Intro', 36)
        fnt_dash = self.font('LucidaGrande', 36)

        image.paste(logo)

        l1 = 'Кочерга'
        l1_size = fnt_h1.getsize(l1)
        l1_x = HEIGHT + (RIGHT_HALF_WIDTH - l1_size[0]) / 2
        l1_y = HEIGHT / 2 - l1_size[1]

        l2 = 'Расписание мероприятий'
        l2_size = fnt_h2.getsize(l2)
        l2_x = HEIGHT + (RIGHT_HALF_WIDTH - l2_size[0]) / 2
        l2_y = HEIGHT / 2 + 15

        draw.text((l1_x, l1_y), l1, font=fnt_h1, fill='black')
        draw.text((l2_x, l2_y), l2, font=fnt_h2, fill='black')

        end_date = start_date + timedelta(days=6)
        start_day = str(start_date.day)
        end_day = str(end_date.day)

        months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

        l3_start = str(start_date.day) + ' '
        if start_date.month != end_date.month:
            l3_start += str(months[start_date.month - 1]) + ' '

        l3_end = ' ' + str(end_date.day) + ' ' + str(months[end_date.month - 1])
        l3_dash = '—'

        l3_heigth = l2_size[1]
        l3_width = fnt_h2.getsize(l3_start)[0] + fnt_dash.getsize(l3_dash)[0] + fnt_h2.getsize(l3_end)[0]
        l3_x = HEIGHT + (RIGHT_HALF_WIDTH - l3_width) / 2
        l3_y = l2_y + l2_size[1] + 5

        draw.text((l1_x, l1_y), l1, font=fnt_h1, fill='black')
        draw.text((l2_x, l2_y), l2, font=fnt_h2, fill='black')

        draw.text((l3_x, l3_y), l3_start, font=fnt_h2, fill='black')
        draw.text((l3_x + fnt_h2.getsize(l3_start)[0], l3_y - 8), l3_dash, font=fnt_dash, fill='black')
        draw.text((l3_x + fnt_h2.getsize(l3_start)[0] + fnt_dash.getsize(l3_dash)[0], l3_y), l3_end, font=fnt_h2, fill='black')

        return image
