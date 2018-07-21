from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    Column,
)

import kocherga.db

class CookiePick(kocherga.db.Base):
    __tablename__ = "cookie_picks"

    pick_id = Column(Integer, primary_key=True)
    ts = Column(DateTime, default=datetime.now)
    cookie_id = Column(String(32), nullable=False)
    against_id = Column(String(32), nullable=False)
    position = Column(Integer)
    user = Column(String(255))
    time = Column(Integer)
