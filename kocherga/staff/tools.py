from .models import Member


def members(include_former=False):
    result = list(Member.objects.all())
    if not include_former:
        result = [m for m in result if m.is_current]

    return result


def find_member_by_short_name(short_name):
    return next(filter(lambda m: m.short_name == short_name, members()), None)


def find_member_by_email(email):
    for member in members():
        if member.user.email.lower() == email.lower():
            return member
        if email.lower() in [a.email for a in member.alt_emails.all()]:
            return member
    return None


def add_member(email, role):
    # add to wiki
    # add to slack
    # add to CM
    # add to Google Drive
    # add to calendar
    raise NotImplementedError
