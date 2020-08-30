import { FieldNode, FragmentDefinitionNode } from 'graphql';

import { allBlockComponents, isKnownBlock } from './blocks';
import { AnyBlockFragment } from './types';

export const typenameToBackendBlockName = (typename: string) => {
  const parts = Array.from(typename.matchAll(/([A-Z][a-z]*)/g)).map(
    (match) => match[0]
  );
  if (parts[parts.length - 1] !== 'Block') {
    throw new Error(`Invalid typename ${typename}, should end with ...Block`);
  }

  return parts
    .slice(0, -1)
    .map((p) => p.toLowerCase())
    .join('_');
};

export const getBlockValueKey = (
  block: AnyBlockFragment
): string | undefined => {
  const typename = block.__typename;
  if (!isKnownBlock(block)) {
    throw new Error(`Unknown block ${typename}`);
  }

  const blockComponent = allBlockComponents[block.__typename];
  const fieldSelections = (blockComponent.fragment
    .definitions[0] as FragmentDefinitionNode).selectionSet.selections.filter(
    (s) => s.kind === 'Field'
  ) as FieldNode[];

  const valueSelection = fieldSelections.find(
    (selection) => selection.name.value === 'value'
  );
  if (!valueSelection) {
    // That's probably ok, some blocks don't have values (but we should check the block's shape just to be
    // safe).
    return;
  }

  const valueKey = valueSelection.alias?.value || 'value';
  return valueKey;
};
