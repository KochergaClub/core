#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import kocherga.importer.daemon

def main():
    kocherga.importer.daemon.run()

if __name__ == '__main__':
    main()
