from datetime import datetime

from collections import defaultdict
import numpy as np
from tqdm import tqdm
import random
import itertools

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    Column,
    Float,
)

import kocherga.db
from kocherga.db import Session

class CookiePick(kocherga.db.Base):
    __tablename__ = "cookie_picks"

    pick_id = Column(Integer, primary_key=True)
    ts = Column(DateTime, default=datetime.now)
    cookie_id = Column(String(32), nullable=False)
    against_id = Column(String(32), nullable=False)
    position = Column(Integer)
    user = Column(String(255))
    time = Column(Integer)

#class CookieRating(kocherga.db.Base):
#    __tablename__ = "cookie_ratings"
#
#    cookie_id = Column(String(32), nullable=False)
#    rank = Column(Integer, nullable=False)
#    rating = Column(Float, nullable=False)

def calculate_rating():
    cookie_picks = Session().query(CookiePick).all()

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
        for _ in range(500):
            random.shuffle(vvv)
            for v in vvv:
                update_weight(w, v, lr=0.02)
                w[m] = 0.0
                w[m + 1] = 1.0
        marks[i] = w[:len(cookies)]


    mean_user_ratings = sorted([(k, marks[:, v].mean()) for k, v in cookies.items()], key=lambda x: -x[1])

    best_combination = None
    max_happy_users = 0
    threshold = 0.7
    for combination in itertools.combinations(cookies.keys(), 3):
        happy_users = sum(
            1 for user_marks in marks
            if any(
                user_marks[cookies[x]] > threshold for x in combination
            )
        )
        if happy_users > max_happy_users:
            best_combination = combination
            max_happy_users = happy_users

    print(best_combination)
    print(f'{max_happy_users} / {len(marks)}')
    for x in best_combination:
        print(cookies[x])
