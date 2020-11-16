import uuid
from dataclasses import dataclass
from enum import Enum
from typing import Dict

import requests
from django.conf import settings


def execute(data):
    if not settings.KKM_SERVER:
        raise Exception("KKM_SERVER is not set in settings")

    r = requests.post(
        settings.KKM_SERVER + '/Execute',
        verify=settings.KKM_SERVER_CERT,
        auth=('User', settings.KKM_USER_PASSWORD),
        json=data,
    )
    r.raise_for_status()
    return r.json()


def _check_settings():
    if not settings.KKT_NUMBER:
        raise Exception("KKT_NUMBER is not configured")
    if not settings.KKT_CASHIER:
        raise Exception("KKT_CASHIER is not configured")


def getTextRequest(text):
    _check_settings()

    return {
        'Command': 'RegisterCheck',  # Команда серверу.
        'KktNumber': settings.KKT_NUMBER,  # Заводской номер ККМ для поиска.
        # Уникальный идентификатор команды.
        # Любая строка из 40 символов - должна быть уникальна для каждой подаваемой команды.
        # По этому идентификатору можно запросить результат выполнения команды.
        # Поле не обязательно.
        'IdCommand': str(uuid.uuid4()),
        # Это фискальный или не фискальный чек
        'IsFiscalCheck': False,
        # Тип чека;
        # 0 – продажа;                             10 – покупка;
        # 1 – возврат продажи;                     11 - возврат покупки;
        # 8 - продажа только по ЕГАИС (обычный чек ККМ не печатается)
        # 9 - возврат продажи только по ЕГАИС (обычный чек ККМ не печатается)
        'TypeCheck': 0,
        # Печатать чек на бумагу
        'NotPrint': False,
        # Количество копий документа
        'NumberCopies': 0,
        # Продавец, тег ОФД 1021
        'CashierName': settings.KKT_CASHIER['name'],
        # ИНН продавца тег ОФД 1203
        'CashierVATIN': settings.KKT_CASHIER['inn'],
        # Строки чека
        'CheckStrings': [
            {
                'PrintText': {
                    'Text': text,
                    'Font': 1,  # 1-4, 0 - по настройкам ККМ
                    'Intensity': 0,  # 1-15, 0 - по настройкам ККМ
                },
            },
        ],
    }


def getInfoRequest():
    return {
        'Command': 'GetDataKKT',
        'NumDevice': 0,
        'IdCommand': str(uuid.uuid4()),
    }


class SignMethodCalculation(Enum):
    # Признак способа расчета. тег ОФД 1214. Для ФФД.1.05 и выше обязательное поле
    # 1: "ПРЕДОПЛАТА 100% (Полная предварительная оплата до момента передачи предмета расчета)"
    PRE_PAYMENT_100 = 1
    PRE_PAYMENT = 2
    ADVANCE = 3
    FULL_PAYMENT = 4
    PARTIAL_PAYMENT_AND_CREDIT = 5
    CREDIT_TRANSFER = 6
    CREDIT_PAYMENT = 7


sign_method_calculation_descriptions: Dict[SignMethodCalculation, str] = {
    SignMethodCalculation.PRE_PAYMENT_100: "ПРЕДОПЛАТА 100% "
    "(Полная предварительная оплата до момента передачи предмета расчета)",
    SignMethodCalculation.PRE_PAYMENT: "ПРЕДОПЛАТА "
    "(Частичная предварительная оплата до момента передачи предмета расчета)",
    SignMethodCalculation.ADVANCE: "АВАНС",
    SignMethodCalculation.FULL_PAYMENT: "ПОЛНЫЙ РАСЧЕТ "
    "(Полная оплата, в том числе с учетом аванса в момент передачи предмета расчета)",
    SignMethodCalculation.PARTIAL_PAYMENT_AND_CREDIT: "ЧАСТИЧНЫЙ РАСЧЕТ И КРЕДИТ "
    "(Частичная оплата предмета расчета в момент его передачи с последующей оплатой в кредит)",
    SignMethodCalculation.CREDIT_TRANSFER: "ПЕРЕДАЧА В КРЕДИТ "
    "(Передача предмета расчета без его оплаты в момент его передачи с последующей оплатой в кредит)",
    SignMethodCalculation.CREDIT_PAYMENT: "ОПЛАТА КРЕДИТА "
    "(Оплата предмета расчета после его передачи с оплатой в кредит)",
}


@dataclass
class OnlineCheck:
    email: str
    title: str
    sum: int
    signMethodCalculation: SignMethodCalculation


def getCheckRequest(check: OnlineCheck):
    _check_settings()

    return {
        # Команда серверу
        'Command': 'RegisterCheck',
        # Заводской номер ККМ для поиска.
        'KktNumber': settings.KKT_NUMBER,
        'IdCommand': str(uuid.uuid4()),
        # Это фискальный или не фискальный чек
        'IsFiscalCheck': True,
        # Тип чека;
        # 0 – продажа;                             10 – покупка;
        # 1 – возврат продажи;                     11 - возврат покупки;
        # 8 - продажа только по ЕГАИС (обычный чек ККМ не печатается)
        # 9 - возврат продажи только по ЕГАИС (обычный чек ККМ не печатается)
        'TypeCheck': 0,
        # Не печатать чек на бумагу
        'NotPrint': False,  # TODO - true
        # Количество копий документа
        'NumberCopies': 0,
        'CashierName': settings.KKT_CASHIER['name'],
        'CashierVATIN': settings.KKT_CASHIER['inn'],
        # Телефон или е-Майл покупателя, тег ОФД 1008
        # Если чек не печатается (NotPrint = true) то указывать обязательно
        # Формат: Телефон +{Ц} или Email {С}@{C}
        'ClientAddress': check.email,
        # Строки чека
        'CheckStrings': [
            {
                'Register': {
                    # Наименование товара 64 символа
                    'Name': check.title,
                    'Quantity': 1,
                    # Цена за шт. без скидки (2 знака после запятой)
                    'Price': check.sum,
                    # Конечная сумма строки с учетом всех скидок/наценок; (2 знака после запятой)
                    'Amount': check.sum,
                    # Отдел, по которому ведется продажа
                    'Department': 0,
                    # НДС в процентах или ТЕГ НДС:
                    # 0 (НДС 0%),
                    # 10 (НДС 10%),
                    # 20 (НДС 20%),
                    # -1 (НДС не облагается),
                    # 120 (НДС 20/120),
                    # 110 (НДС 10/110)
                    'Tax': -1,
                    'SignMethodCalculation': check.signMethodCalculation.value,
                    # Признак предмета расчета. тег ОФД 1212. Для ФФД.1.05 и выше обязательное поле
                    # 1: "ТОВАР (наименование и иные сведения, описывающие товар)"
                    # 2: "ПОДАКЦИЗНЫЙ ТОВАР (наименование и иные сведения, описывающие товар)"
                    # 3: "РАБОТА (наименование и иные сведения, описывающие работу)"
                    # 4: "УСЛУГА (наименование и иные сведения, описывающие услугу)"
                    # 5: "СТАВКА АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
                    # 6: "ВЫИГРЫШ АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
                    # 7: "ЛОТЕРЕЙНЫЙ БИЛЕТ (при осуществлении деятельности по проведению лотерей)"
                    # 8: "ВЫИГРЫШ ЛОТЕРЕИ (при осуществлении деятельности по проведению лотерей)"
                    # 9: "ПРЕДОСТАВЛЕНИЕ РИД (предоставлении прав на использование результатов интеллектуальной
                    #     деятельности или средств индивидуализации)"
                    # 10: "ПЛАТЕЖ (аванс, задаток, предоплата, кредит, взнос в счет оплаты, пени, штраф, вознаграждение,
                    #     бонус и иной аналогичный предмет расчета)"
                    # 11: "АГЕНТСКОЕ ВОЗНАГРАЖДЕНИЕ (вознаграждение (банковского)платежного агента/субагента,
                    #     комиссионера, поверенного или иным агентом)"
                    # 12: "СОСТАВНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, состоящем из предметов, каждому из которых
                    #     может быть присвоено вышестоящее значение"
                    # 13: "ИНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, не относящемуся к предметам расчета, которым
                    # может быть присвоено вышестоящее значение"
                    'SignCalculationObject': 4,
                },
            },
        ],
        # Наличная оплата (2 знака после запятой)
        'Cash': 0,
        # Сумма электронной оплаты (2 знака после запятой)
        'ElectronicPayment': check.sum,
        # Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        'AdvancePayment': 0,
        # Сумма постоплатой(в кредит) (2 знака после запятой)
        'Credit': 0,
        # Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
        'CashProvision': 0,
    }


def getCloseShiftRequest():
    _check_settings()

    return {
        # Команда серверу
        'Command': "CloseShift",
        # Номер устройства. Если 0 то первое не блокированное на сервере
        'NumDevice': 0,
        'CashierName': settings.KKT_CASHIER['name'],
        'CashierVATIN': settings.KKT_CASHIER['inn'],
        # Не печатать чек на бумагу
        'NotPrint': True,
        # Id устройства. Строка. Если = "" то первое не блокированное на сервере
        'IdDevice': "",
        # Уникальный идентификатор команды.
        # Любая строка из 40 символов - должна быть уникальна для каждой подаваемой команды.
        # По этому идентификатору можно запросить результат выполнения команды.
        'IdCommand': str(uuid.uuid4()),
    }
