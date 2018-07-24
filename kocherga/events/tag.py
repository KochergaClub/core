import logging
logger = logging.getLogger(__name__)

from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from kocherga.db import Session, Base

class EventTag(Base):
    __tablename__ = "event_tags"
    __table_args__ = (
        UniqueConstraint('event_id', 'name'),
    )
    id = Column(Integer, primary_key=True)

    event_id = Column(String(100), ForeignKey("events.google_id"), nullable=False)
    name = Column(String(40), nullable=False)


    event = relationship(
        "Event",
        back_populates="tags",
        single_parent=True
    )
