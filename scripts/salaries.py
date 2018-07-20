#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import fire
from datetime import datetime

import kocherga.money.salaries

def main(d=None):
    if d:
        d = datetime.strptime(d, '%Y-%m-%d').date()
    container = kocherga.money.salaries.calculate_new_salaries(d)
    container.print_all()

if __name__ == '__main__':
    fire.Fire(main)
