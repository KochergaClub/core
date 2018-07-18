#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

from kocherga.events.event import Event
from kocherga.db import Session

events = Session().query(Event).all()
for e in events:
    e.migrate_images()

Session().commit()
