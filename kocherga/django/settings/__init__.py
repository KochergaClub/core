def get_tier():
    try:
        with open("tier.txt") as f:
            tier = f.readline()
    except FileNotFoundError:
        tier = "dev"
    return tier


TIER = get_tier()
exec(f"from .{TIER.strip()} import *")
