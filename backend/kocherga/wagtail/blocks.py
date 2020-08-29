from typing import List, Any, Tuple, Dict
from dataclasses import dataclass

from wagtail.core.blocks import FieldBlock

from . import forms


class URLOrAbsolutePathBlock(FieldBlock):
    "Copy-pasted from wagtail's URLBlock."

    def __init__(
        self,
        required=True,
        help_text=None,
        max_length=None,
        min_length=None,
        validators=(),
        **kwargs,
    ):
        self.field = forms.URLOrAbsolutePathField(
            required=required,
            help_text=help_text,
            max_length=max_length,
            min_length=min_length,
            validators=validators,
        )
        super().__init__(**kwargs)

    class Meta:
        icon = "site"


BlockType = Any  # TODO - stricter type


@dataclass
class BlockRegistryEntry:
    tags: List[str]
    block: BlockType


class BlocksRegistry:
    entries: Dict[str, BlockRegistryEntry]

    def __init__(self):
        self.entries = {}

    def register_list(self, tag: str, blocks: List[Tuple[str, BlockType]]):
        # TODO - check for duplicates (store entries in dict?)
        for (name, block) in blocks:
            if name in self.entries:
                raise Exception("Duplicate name {name}, already registered")
            self.entries[name] = BlockRegistryEntry(block=block, tags=[tag])

    def by_tag(self, tag: str):
        return [
            (name, entry.block)
            for name, entry in self.entries.items()
            if tag in entry.tags
        ]

    def by_name(self, name: str):
        return self.entries[name].block


registry = BlocksRegistry()  # singleton
