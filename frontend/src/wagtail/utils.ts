import { FieldNode, FragmentDefinitionNode } from 'graphql';

import { FormField, FormShape } from '~/components/forms/types';

import { allBlockComponents, isKnownBlock } from './blocks';
import {
    StructureL0Fragment, StructureL1Fragment, StructureL2Fragment, StructureL3Fragment
} from './components/queries.generated';
import { AnyBlockFragment, StructureFragment } from './types';

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

const structureToFormField = (
  structure:
    | StructureL0Fragment
    | StructureL1Fragment
    | StructureL2Fragment
    | StructureL3Fragment,
  name: string
): FormField => {
  switch (structure.__typename) {
    case 'WagtailCharBlockStructure':
    case 'WagtailURLBlockStructure':
    case 'WagtailRichTextBlockStructure':
      return {
        type: 'string',
        name,
      };
    case 'WagtailBooleanBlockStructure':
      return {
        type: 'boolean',
        name,
      };
    case 'WagtailImageBlockStructure':
      return {
        type: 'number',
        name,
      };
    case 'WagtailStaticBlockStructure':
      return {
        type: 'string',
        name,
        readonly: true,
        default: 'static', // FIXME
      };
    case 'WagtailStructBlockStructure':
      if (!('child_blocks' in structure)) {
        throw new Error('Structure is too deeply nested');
      }

      // we can't just map on child_blocks since typescript is not smart enough
      const structShape: FormField[] = [];
      for (const child_block of structure.child_blocks) {
        structShape.push(
          structureToFormField(child_block.definition, child_block.name)
        );
      }
      return {
        type: 'shape',
        name,
        shape: structShape,
      };
    case 'WagtailListBlockStructure':
      if (!('child_block' in structure)) {
        throw new Error('Structure is too deeply nested');
      }
      return {
        type: 'list',
        name,
        field: structureToFormField(structure.child_block, 'item'),
      };
  }
};

export const structureToShape = (structure: StructureFragment): FormShape => {
  const formField = structureToFormField(structure, 'form');
  if (formField.type === 'shape') {
    return formField.shape;
  } else {
    return [formField];
  }
};

// via https://github.com/microsoft/TypeScript/issues/1897
type JsonSimple = string | number | boolean;
type JsonObject = {
  [x: string]: JsonSimple | JsonObject | JsonArray;
};
interface JsonArray extends Array<JsonSimple | JsonObject | JsonArray> {}

type Json = JsonSimple | JsonObject | JsonArray;

// TODO - compare value with block's shape
const blockValueToParams = (
  structure:
    | StructureL0Fragment
    | StructureL1Fragment
    | StructureL2Fragment
    | StructureL3Fragment,
  value: any
): Json => {
  switch (structure.__typename) {
    case 'WagtailStructBlockStructure':
      if (!('child_blocks' in structure)) {
        throw new Error('Structure is incomplete (too deeply nested?)');
      }
      if (typeof value !== 'object') {
        throw new Error(`Expected object, got ${value}`);
      }
      if (value instanceof Array) {
        throw new Error(`Expected non-array object, got array`);
      }
      // TODO - validate that there are no extra fields in value

      const result: Json = {};
      for (const child_block of structure.child_blocks) {
        const child_value = value[child_block.name]; // TODO - consider aliases
        result[child_block.name] = blockValueToParams(
          child_block.definition,
          child_value
        );
      }
      return result;
    case 'WagtailListBlockStructure':
      if (!('child_block' in structure)) {
        throw new Error('Structure is incomplete (too deeply nested?)');
      }
      if (!(value instanceof Array)) {
        throw new Error(`Expected array, got ${JSON.stringify(value)}`);
      }
      return value.map((subvalue) =>
        blockValueToParams(structure.child_block, subvalue)
      );
    case 'WagtailBooleanBlockStructure':
      if (typeof value !== 'boolean') {
        throw new Error(`Expected boolean, got ${value}`);
      }
      return value;
    case 'WagtailCharBlockStructure':
    case 'WagtailURLBlockStructure':
    case 'WagtailRichTextBlockStructure':
      if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${value}`);
      }
      return value;
    case 'WagtailImageBlockStructure':
      if (value.__typename !== 'WagtailImageRendition') {
        throw new Error(`Expected ImageRendition value, got ${value}`);
      }
      // TODO
      const originalImageId = value?.original_image?.id;
      if (!originalImageId) {
        throw new Error(
          "No original image ID, can't save image. " + JSON.stringify(value)
        );
      }
      return originalImageId;
    default:
      throw new Error(`Unknown type in structure: ${structure.__typename}`);
  }
};

export const blockToParams = (
  structure: StructureFragment,
  block: AnyBlockFragment
) => {
  const valueKey = getBlockValueKey(block);

  if (valueKey === undefined) {
    return null;
  }

  const value = (block as any)[valueKey];
  return blockValueToParams(structure, value);
};
