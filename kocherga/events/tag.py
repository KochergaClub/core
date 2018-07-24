import logging
logger = logging.getLogger(__name__)

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from kocherga.db import Session, Base

class EventTag(Base):
    __tablename__ = "event_tags"
    id = Column(Integer, primary_key=True)

    event_id = Column(String(100), ForeignKey("events.google_id"))
    tag = Column(String(40), nullable=False)

    event = relationship("Event", back_populates="tags")
