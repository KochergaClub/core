import kocherga.db

def test_create():
    print(kocherga.db.DB_FILE)
    kocherga.db.create_all()
