#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import fire

def main(event_type, event_id):
    kocherga.ratio.users.sheet2mailchimp(event_type, event_id)

if __name__ == '__main__':
    fire.Fire(main)
