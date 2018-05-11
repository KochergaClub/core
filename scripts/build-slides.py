#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import fire
import asyncio

import kocherga.ratio.builder

async def main(event_name):
    await kocherga.ratio.builder.build(event_name)

def run_script(event_name):
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait([main(event_name)]))

if __name__ == '__main__':
    fire.Fire(run_script)
