#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import kocherga.importer.daemon

import fire

def main(name=None):
    if name:
        kocherga.importer.daemon.run_one(name)
    else:
        kocherga.importer.daemon.run()

if __name__ == '__main__':
    fire.Fire(main)
