from datetime import datetime
import pandas as pd

import kocherga.google
import kocherga.watchmen
import kocherga.db

def export_to_db():
    gc = kocherga.google.gspread_client()
    gs = gc.open_by_key(kocherga.watchmen.WATCHMEN_SPREADSHEET_KEY)
    gw = gs.worksheet('Деньги')
    df = pd.DataFrame(gw.get_all_records())
    df = df[df.Дата != '']
    df.Дата = df.Дата.map(lambda date_str: datetime.strptime(date_str, '%d.%m.%Y').date())

    df.to_sql(
        'cashier', kocherga.db.connect(),
        if_exists='replace',
        index_label='id',
    )
