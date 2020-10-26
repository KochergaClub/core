class GenericError:
    def __init__(self, message: str):
        self.message = message


# Wrapper around exceptions to work around an annoying graphql issue:
# graphql-core interprents returned exceptions as errors to be re-raised
# (see https://github.com/graphql-python/graphql-core/issues/72 for details)
class BoxedError:
    def __init__(self, error: Exception):
        self.error = error
