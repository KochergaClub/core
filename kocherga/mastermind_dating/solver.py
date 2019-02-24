import asyncio
import json
import logging
import os
import random
import subprocess
import typing

from aiogram import Bot
from django.template.loader import render_to_string

from . import models as db

logging.basicConfig(level="DEBUG")
log = logging.getLogger("mm-bot-solver")


def run_solver(cohort: db.Cohort):
    yall: typing.List[db.User] = \
        [user for user in db.User.objects.filter(cohort=cohort).iterator()]

    users: typing.List[db.User] = []
    votes = []
    for u in yall:
        uvotes = list(db.Vote.objects.filter(who=u).iterator())
        if len(uvotes) == 0:
            log.info(
                f"User {u.telegram_uid}({u.user.email}) is a {random.choice(['mushroom', 'cow', 'goat', 'user'])} and "
                f"didn't vote. Will be skipped."
            )
            continue
        if len(uvotes) < len(yall) - 1:
            log.info(
                f"User {u.telegram_uid}({u.user.email}) is a {random.choice(['mushroom', 'cow', 'goat', 'user'])} and "
                f"skipped some ({len(yall) - 1 - len(uvotes)}) users in voting."
            )
        else:
            log.info(
                f"User {u.telegram_uid}({u.user.email}) [OK]"
            )
        votes += uvotes
        users.append(u)

    votes = [vote for vote in votes if vote.whom in users]
    n = len(users)
    if len(votes) != n ** 2 - n:
        log.info("Not enough votes to do solving")
        return None

    users.sort(key=lambda u: u.telegram_uid)
    votes.sort(key=lambda v: v.whom.telegram_uid)
    votes.sort(key=lambda v: v.who.telegram_uid)

    with open('users.json', 'w') as fh:
        json.dump([user.user_id for user in users], fh)

    userlist = [users]

    def prepare_data():
        builder = []
        for i in range(n):
            builder.append('|\n')
            for j in range(n):
                if i == j:
                    vote = 0
                else:
                    vote = votes[(i * n + j) - ((i * n + j) // (n + 1) + 1)].how
                builder.append(f"{['Y', 'O', 'N'][vote]},")
        builder.append('|')

        unames = ",".join(map(lambda a: f"p{a}", range(n)))
        dataset = "".join(builder)

        return (
                   f"people={{{unames}}};"
                   "max_p_per_group = 5;"
                   f"max_Ns = {n * n};"
                   f"marks=[{dataset}];"
               )

    with open("data.dzn", mode="w") as f:
        f.write(prepare_data())

    log.info("Starting solver.")
    subprocess.run(["minizinc/minizinc", "mm-bot-model/model.mzn", "data.dzn"], stdout=open("solution.json", mode='w'))
    solution = json.load(open("solution.json", mode="r"))
    log.info(f"Got solution: {solution}")


async def broadcast_solution(bot: Bot):
    with open('users.json') as fh:
        users = [
            db.User.objects.get(pk=user_id)
            for user_id in json.load(fh)
        ]

    solution = json.load(open("solution.json"))
    log.info(f"Broadcasting solution: {solution}")

    ptg = solution["people_to_groups"]
    assert len(ptg) == len(users)
    passoc = dict()

    for i in range(len(ptg)):
        passoc[users[i]] = ptg[i]

    group_names = set(solution["people_to_groups"])
    groups = {group: [u for u in users if passoc[u] == group] for group in group_names}
    tasks: typing.List[typing.Awaitable] = []

    # === Broadcast
    log.info(f"Starting broadcast, final data: {groups}")
    for group_id in groups.keys():
        group: typing.List[db.User] = groups[group_id]

        for user in group:
            message = render_to_string("mastermind_dating/bot/group_assembled.md", {
                "users": set(group) - {user}
            })
            tasks.append(asyncio.create_task(
                bot.send_message(
                    user.chat_id, message,
                    parse_mode="Markdown"
                )
            ))

    log.info(f"Awaiting {len(tasks)} to finish")
    for task in tasks:
        await task
    log.info(f"Broadcast complete")
