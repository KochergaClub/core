#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import kocherga.events.timepad
import kocherga.email.lists

def main():
    timepad_subscribers = kocherga.events.timepad.get_all_subscribers()

    kocherga.email.lists.populate_main_list(timepad_subscribers)

if __name__ == '__main__':
    main()
