# Grap - it's like GraphQL, but 40% shorter.

This is yet another GraphQL library for Python.

For now it's hosted in Kocherga core repo, but if all goes well it might make sense to release it on PyPI someday.

# Rationale

Why another GraphQL library?

See my explanation [here](https://github.com/graphql-python/graphene/issues/1238).

# Disclaimer

In case this package ever becomes popular: I probably won't be able to allocate much time towards maintaining this package outside of my own goals.

I'm not sure if this should discourage you from using it, though. On one hand, using well-maintained libraries is always nice. On the other hand, `grap` is designed to be non-intrusive (see `Rationale` section above) and you'll always be able to fallback to raw `graphql-core` API if you need anything that `grap` doesn't provide.
