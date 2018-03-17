#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import kocherga.importer.daemon

kocherga.importer.daemon.run()
