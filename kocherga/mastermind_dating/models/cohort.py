import logging
logger = logging.getLogger(__name__)

from django.db import models

import subprocess
import typing
import json
import random

from kocherga.events.models import Event as KchEvent

from .user import User
from .vote import Vote
from .group import Group

from .. import rpc


class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    sent_emails = models.BooleanField(default=False)

    def populate_from_event(self):
        if not self.event:
            raise Exception("Cohort doesn't have an associated event")

        for kocherga_user in self.event.registered_users():
            User.objects.create(
                user=kocherga_user,
                cohort=self,
            )
            # TODO - remove everyone else (people can cancel their registrations)

    def send_invite_emails(self, force=False):
        if self.sent_emails and not force:
            raise Exception("Already sent invite emails")

        for user in self.users.all():
            user.send_invite_email()

        self.sent_emails = True
        self.save()

    def broadcast_solution(self):
        manager = rpc.get_client()
        manager.broadcast_solution(self.id)

    def run_solver(self):
        yall: typing.List[User] = list(self.users.filter(present=True).all())

        users: typing.List[User] = []
        votes = []
        for u in yall:
            uvotes = list(Vote.objects.filter(who=u).iterator())
            if len(uvotes) == 0:
                logger.info(
                    f"User {u.telegram_uid}({u.user.email}) is a {random.choice(['mushroom', 'cow', 'goat', 'user'])} "
                    f"and didn't vote. Will be skipped."
                )
                continue
            if len(uvotes) < len(yall) - 1:
                logger.info(
                    f"User {u.telegram_uid}({u.user.email}) is a {random.choice(['mushroom', 'cow', 'goat', 'user'])} "
                    f"and skipped some ({len(yall) - 1 - len(uvotes)}) users in voting."
                )
            else:
                logger.info(
                    f"User {u.telegram_uid}({u.user.email}) [OK]"
                )
            votes += uvotes
            users.append(u)

        votes = [vote for vote in votes if vote.whom in users]
        n = len(users)
        if len(votes) != n ** 2 - n:
            logger.info("Not enough votes to do solving")
            return None

        users.sort(key=lambda u: u.telegram_uid)
        votes.sort(key=lambda v: v.whom.telegram_uid)
        votes.sort(key=lambda v: v.who.telegram_uid)

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

        logger.info("Starting solver.")
        subprocess.run([
            "minizinc/minizinc",
            "mm-bot-model/model.mzn",
            "data.dzn"
        ], stdout=open("solution.json", mode='w'))

        solution = json.load(open("solution.json", mode="r"))
        logger.info(f"Got solution: {solution}")

        logger.info(f"Saving solution to db groups")
        ptg = solution["people_to_groups"]
        assert len(ptg) == len(users)
        passoc = dict()

        for i in range(len(ptg)):
            passoc[users[i]] = ptg[i]

        group_names = set(solution["people_to_groups"])
        groups = {group: [u for u in users if passoc[u] == group] for group in group_names}

        for group_id in groups.keys():
            group: typing.List[User] = groups[group_id]

            db_group = Group.objects.get_empty()
            for user in group:
                user.group = db_group
                user.save()
