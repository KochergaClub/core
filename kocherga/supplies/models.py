from datetime import datetime

import math
from collections import defaultdict
import numpy as np
from tqdm import tqdm
import random
import itertools
import json
import re
import requests
import hashlib

from django.db import models

class Cookie(models.Model):
    class Meta:
        db_table = 'cookies'

    id = models.CharField(max_length=32, primary_key=True)
    title = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    price = models.FloatField()
    weight = models.FloatField()
    prodway_page = models.CharField(max_length=255)
    prodway_image = models.CharField(max_length=255)

def dt_now():
    return datetime.now(TZ)

class CookiePick(models.Model):
    class Meta:
        db_table = 'cookie_picks'

    pick_id = models.AutoField(primary_key=True)
    ts = models.DateTimeField(default=dt_now)
    cookie_id = models.CharField(max_length=32)
    against_id = models.CharField(max_length=32)
    position = models.IntegerField()
    user = models.CharField(max_length=255)
    time = models.IntegerField()


class CookieCombinationItem(models.Model):
    class Meta:
        db_table = 'cookie_combination_items'
        unique_together = (
            ('combination', 'position_id'),
        )

    id = models.AutoField(primary_key=True)

    combination = models.ForeignKey('CookieCombination', on_delete=models.CASCADE)
    position_id = models.IntegerField()
    cookie_id = models.CharField(max_length=32)

    @property
    def image_link(self):
        return f'http://cookies.kocherga.club/images/{self.cookie_id}'


class CookieCombination(models.Model):
    class Meta:
        db_table = 'cookie_combinations'

    combination_id = models.AutoField(primary_key=True)
    happy_users = models.IntegerField()
    total_users = models.IntegerField()


def calculate_best_combinations(limit=50, learning_steps=500, threshold=0.6, combination_size=3):
    cookie_picks = CookiePick.objects.all()

    cookies = defaultdict(lambda: len(cookies)) # https://wchargin.github.io/posts/a-cute-autoincrementing-id-table-in-one-line-of-python/
    votes = defaultdict(list)

    for vote in cookie_picks:
        if vote.cookie_id == '' or vote.against_id == '':
            continue
        votes[vote.user].append((cookies[vote.cookie_id], cookies[vote.against_id]))

    def update_weight(w, v, lr=0.1):
        x = w[v[0]] - w[v[1]]
        d = 1.0 - np.exp(x - 1)
        w[v[0]] = min(w[v[0]] + d * lr, 1.0)
        w[v[1]] = max(w[v[1]] - d * lr, 0.0)

    marks = np.zeros((len(votes), len(cookies)))

    votes_num = []

    for i, vvv in tqdm(enumerate(votes.values()), total=len(votes)):
        votes_num.append(len(vvv))
        # continue
        m = len(cookies) #max(max(x, y) for x, y in vvv)
        vvv = vvv[:]
        vvv += [(i, m) for i in range(m)]
        vvv += [(m + 1, i) for i in range(m)]

        w = [0.5] * (m + 2)
        for _ in range(learning_steps):
            random.shuffle(vvv)
            for v in vvv:
                update_weight(w, v, lr=0.02)
                w[m] = 0.0
                w[m + 1] = 1.0
        marks[i] = w[:len(cookies)]


    mean_user_ratings = sorted([(k, marks[:, v].mean()) for k, v in cookies.items()], key=lambda x: -x[1])

    ctuple2rating = {}

    for ctuple in tqdm(
            itertools.combinations(
                cookies.keys(), combination_size
            ),
            total=(
                math.factorial(len(cookies)) /
                (math.factorial(len(cookies) - combination_size) * math.factorial(combination_size))
            )
    ):
        happy_users = sum(
            1 for user_marks in marks
            if any(
                user_marks[cookies[x]] > threshold for x in ctuple
            )
        )
        ctuple2rating[ctuple] = happy_users

    for combination in CookieCombination.objects.all():
        combination.delete()

    for ctuple in itertools.islice(sorted(ctuple2rating.keys(), key=lambda a: ctuple2rating[a], reverse=True), limit):
        combination = CookieCombination(
            happy_users=ctuple2rating[ctuple],
            total_users=len(marks),
        )
        combination.items = [
            CookieCombinationItem(cookie_id=cookie_id, position_id=i)
            for (i, cookie_id) in enumerate(ctuple)
        ]
        combination.save()

def generate_wiki_rating(limit=10):
    result = '{|class="wikitable"\n'

    partials = []
    for combination in CookieCombination.objects.order_by('-happy_users'):
        partial = f'| {combination.happy_users}\n'
        for item in combination.items:
            partial += f'| <img src="{item.image_link}" style="width: 200px; height: auto">\n'

        partials.append(partial)

    return result + '|-\n'.join(partials) + '|}'

def fetch_cookies_info():
    BASE = 'http://prodway.ru'
    MAX_PRICE_PER_KG = 250

    def _get_page_urls(n):
        r = requests.get(f'{BASE}/vesovoe-pechene-pirozhennoe/?PAGEN_1={n}')
        r.raise_for_status()
        for match in re.findall(r'<a class="image-wrapper" href="(.*?)">', r.text):
            yield match

    def _fetch_page(p):
        print(p)
        r = requests.get(f'{BASE}{p}')
        r.raise_for_status()

        match = re.search(r'<h1\s+class="header_grey">(.*?)</h1>', r.text)
        title = match.group(1)

        match = re.search(r'<div\s+class="slider-images"\s+id="slider_images">\s+<a\s+rel=\'images\'\s+href="(.*?)"', r.text)
        image = match.group(1)

        match = re.search(r'<div\s+class="current"\s+id="price">(\d+.\d+) руб</div>', r.text)
        price = float(match.group(1))

        match = re.match(r'(.*?)\s*(\d.*)$', title)
        (title, weight) = match.groups()

        return {
            'title': title,
            'weight': weight,
            'image': image,
            'price': price,
        }


    def _process_cookie(data):
        title = data['title']

        match = re.match(r'(.*?)\s*(\d.*)$', title)
        (title, weight) = match.groups()

        title = title.replace('&quot;', '"')

        weight = re.sub(r'\s*кг\.?', '', weight)
        weight = weight.replace(',', '.')
        try:
            weight = float(weight)
        except:
            print(f"Weird weight {weight} for {title}, skipping")
            return

        data['title'] = title
        data['weight'] = weight

        kg_price = int(data["price"] / weight)
        if kg_price > MAX_PRICE_PER_KG:
            print(f"Price per kg is too high ({kg_price}) for {title}, skipping")
            return

        return Cookie(
            title=title,
            weight=weight,
            price=data['price'],
            prodway_image=data['image'],
        )


    urls = []
    for i in range(1, 6):
        for url in _get_page_urls(i):
            urls.append(url)

    result = []
    for url in urls:
        data = _fetch_page(url)
        cookie = _process_cookie(data)
        if not cookie:
            continue

        cookie.prodway_page = url

        r = requests.get(BASE + cookie['image'])
        r.raise_for_status()

        filename = hashlib.md5(cookie['title'].encode('utf-8')).hexdigest()
        with open('images/' + filename, 'wb') as fh:
            fh.write(r.content)

        cookie.id = filename

        cookie.save()
