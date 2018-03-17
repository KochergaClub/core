#!/usr/bin/env python
import pathlib, sys
sys.path.append(Path(__file__).parent)

import kocherga.importer.daemon

kocherga.importer.daemon.run()
