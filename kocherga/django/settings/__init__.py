import os


def get_tier():
    if "TIER" in os.environ:
        tier = os.environ["TIER"]
    else:
        try:
            with open("tier.txt") as f:
                tier = f.readline()
        except FileNotFoundError:
            tier = "dev"
    return tier


TIER = get_tier()
exec(f"from .{TIER.strip()} import *")
