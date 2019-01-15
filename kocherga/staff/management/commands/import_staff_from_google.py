from django.conf import settings
from django.db import transaction
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

import gspread
import kocherga.google

from kocherga.staff.models import Member, AltEmail

@transaction.atomic
def import_spreadspeet_data():
    gc = kocherga.google.gspread_client()
    spreadsheet = gc.open_by_key(settings.KOCHERGA_TEAM_SPREADSHEET_KEY)
    worksheet = spreadsheet.worksheet("Сотрудники")

    rows = worksheet.get_all_records()
    rows = rows[1:]

    def row2member(row):
        primary_email = row["email"].lower()

        GENDERS = {
            'М': 'MALE',
            'Ж': 'FEMALE',
        }
        gender = None
        if row['Гендер']:
            gender = GENDERS[row['Гендер']]

        is_current = False
        if row['Статус'] == 'Текущий':
            is_current = True

        PAYMENT_TYPES = {
            'нал': 'CASH',
            'безнал': 'ELECTRONIC',
            '': '',
        }
        payment_type = PAYMENT_TYPES[row['Вид оплаты']]

        cm_card_id = row["Номер карты"]
        if cm_card_id:
            cm_card_id = int(cm_card_id)
        else:
            cm_card_id = None

        ROLES = {
            'Основатель': 'FOUNDER',
            'Менеджер': 'MANAGER',
            'Видеоменеджер': 'VIDEOMANAGER',
            'Админ': 'WATCHMAN',
            'Тренер': 'TRAINER',
            'Внешний консультант': 'CONSULTANT',
            'Волонтёр': 'VOLUNTEER',
            'Разработчик': 'VOLUNTEER',
            'Оператор админки': 'VOLUNTEER',
        }
        role = ROLES[row['Роль']]

        User = get_user_model()
        try:
            user = User.objects.get(email=primary_email)
        except User.DoesNotExist:
            user = User.objects.create_user(primary_email)

        member = Member.objects.create(
            short_name=row["Имя"],
            full_name=row["Имя, фамилия"],
            cm_login=row["Логин в КМ"],
            cm_card_id=cm_card_id,
            user=user,
            role=role,
            gender=gender,
            is_current=is_current,
            payment_type=payment_type,
            vk=row["В соцсетях"],
        )

        alt_emails = [
            e.strip().lower() for e in row["Альтернативные email'ы"].split(",")
        ]
        for alt_email in alt_emails:
            AltEmail.objects.create(member=member, email=alt_email)

    for row in rows:
        row2member(row)

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        import_spreadspeet_data()
