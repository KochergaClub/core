#!/usr/bin/env python3
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

def main():
    from kocherga.mastermind_dating.run_bot import init
    init()

if __name__ == "__main__":
    import os, django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kocherga.django.settings")
    django.setup()

    main()
