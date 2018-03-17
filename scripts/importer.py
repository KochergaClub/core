#!/usr/bin/env python
import pathlib, sys
sys.path.append(pathlib.Path(__file__).parent)

import kocherga.importer.daemon

kocherga.importer.daemon.run()
