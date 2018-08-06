import logging
logger = logging.getLogger(__name__)

from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from kocherga.db import Session, Base

class EventPrototypeTag(Base):
    __tablename__ = "event_prototype_tags"
    __table_args__ = (
        UniqueConstraint('prototype_id', 'name'),
    )
    id = Column(Integer, primary_key=True)

    prototype_id = Column(Integer, ForeignKey("event_prototypes.prototype_id"), nullable=False)
    name = Column(String(40), nullable=False)

    prototype = relationship(
        "EventPrototype",
        back_populates="tags",
        single_parent=True
    )
