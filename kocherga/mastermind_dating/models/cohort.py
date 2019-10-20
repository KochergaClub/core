import logging
logger = logging.getLogger(__name__)

from django.db import models

import subprocess
from typing import List
import json
import random

from kocherga.events.models import Event as KchEvent

from .participant import Participant
from .vote import Vote
from .group import Group

from .. import rpc


class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    leader_telegram_uid = models.CharField(max_length=100, blank=True)  # will be added to the newly created groups

    def populate_from_event(self):
        if not self.event:
            raise Exception("Cohort doesn't have an associated event")

        for kocherga_user in self.event.registered_users():
            (participant, _) = Participant.objects.get_or_create(
                user=kocherga_user,
                cohort=self,
            )
        # TODO - remove stale participants (people can cancel their registrations)

    def send_invite_emails(self, force=False):
        for participant in self.participants.all():
            if not participant.invite_email_sent:
                participant.send_invite_email()

    def broadcast_solution(self):
        manager = rpc.get_client()
        manager.broadcast_solution(self.id)

    def get_participants_and_votes(self):
        yall: List[Participant] = list(self.participants.filter(present=True).all())

        participants: List[Participant] = []
        votes = []
        for u in yall:
            uvotes = list(Vote.objects.filter(who=u).iterator())
            if len(uvotes) == 0:
                handle = random.choice(['mushroom', 'cow', 'goat', 'participant'])
                logger.info(
                    f"Participant {u.telegram_uid}({u.user.email}) is a {handle} "
                    f"and didn't vote. Will be skipped."
                )
                continue
            if len(uvotes) < len(yall) - 1:
                handle = random.choice(['mushroom', 'cow', 'goat', 'participant'])
                logger.info(
                    f"Participant {u.telegram_uid}({u.user.email}) is a {handle} "
                    f"and skipped some ({len(yall) - 1 - len(uvotes)}) participants in voting."
                )
            else:
                logger.info(
                    f"Participant {u.telegram_uid}({u.user.email}) [OK]"
                )
            votes += uvotes
            participants.append(u)

        votes = [vote for vote in votes if vote.whom in participants]
        n = len(participants)
        if len(votes) != n ** 2 - n:
            raise Exception("Not enough votes to do solving")

        participants.sort(key=lambda u: u.telegram_uid)
        votes.sort(key=lambda v: v.whom.telegram_uid)
        votes.sort(key=lambda v: v.who.telegram_uid)

        return (participants, votes)

    def get_solver_data(self):
        (participants, votes) = self.get_participants_and_votes()
        n = len(participants)

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
            f"people={{{unames}}};\n"
            "max_p_per_group = 5;\n"
            f"max_Ns = 0;\n"
            f"marks=[{dataset}];\n"
        )

    def run_solver(self):
        data = self.get_solver_data()
        with open("data.dzn", mode="w") as f:
            f.write(data)

        (participants, votes) = self.get_participants_and_votes()  # duplicate effort

        logger.info("Starting solver.")
        subprocess.run([
            "minizinc/minizinc",
            "mm-bot-model/model.mzn",
            "data.dzn"
            "--time-limit",
            "30000",
        ], stdout=open("solution.json", mode='w'))

        solution = json.load(open("solution.json", mode="r"))
        logger.info(f"Got solution: {solution}")

        logger.info(f"Saving solution to db groups")
        ptg = solution["people_to_groups"]
        assert len(ptg) == len(participants)
        passoc = dict()

        for i in range(len(ptg)):
            passoc[participants[i]] = ptg[i]

        group_names = set(solution["people_to_groups"])
        groups = {group: [u for u in participants if passoc[u] == group] for group in group_names}

        for group_id in groups.keys():
            group: List[Participant] = groups[group_id]

            db_group = Group.objects.get_empty()
            for participant in group:
                participant.group = db_group
                participant.save()
