import { FieldNode, FragmentDefinitionNode } from 'graphql';

import { FieldShape, FormShape } from '~/components/forms/types';

import { allBlockComponents, isKnownBlock } from './blocks';
import {
    StructureCommonFragment, StructureL1Fragment, StructureL2Fragment, StructureL3Fragment
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

const structureToFieldShape = (
  structure:
    | StructureCommonFragment
    | StructureL1Fragment
    | StructureL2Fragment
    | StructureL3Fragment,
  name: string
): FieldShape => {
  if (!structure.__typename) {
    throw new Error('Expected __typename to be set');
  }
  switch (structure.__typename) {
    case 'WagtailCharBlockStructure':
    case 'WagtailURLBlockStructure':
      return {
        type: 'string',
        name,
        title: structure.label,
        optional: !structure.required,
      };
    case 'WagtailRichTextBlockStructure':
      return {
        type: 'richtext',
        name,
        title: structure.label,
        optional: !structure.required,
      };
    case 'WagtailBooleanBlockStructure':
      return {
        type: 'boolean',
        name,
        title: structure.label,
        optional: !structure.required,
      };
    case 'WagtailImageBlockStructure':
      return {
        type: 'image',
        name,
        title: structure.label,
        optional: !structure.required,
        valueAsNumber: true, // wagtail block refuses to validate if we pass a quoted string as image id
      };
    case 'WagtailStaticBlockStructure':
      throw new Error('Deep static blocks are not supported');
    case 'WagtailStructBlockStructure':
      if (!('child_blocks' in structure)) {
        throw new Error('Structure is too deeply nested');
      }

      // we can't just map on child_blocks since typescript is not smart enough
      const structShape: FieldShape[] = [];
      for (const child_block of structure.child_blocks) {
        structShape.push(
          structureToFieldShape(child_block.definition, child_block.name)
        );
      }
      return {
        type: 'shape',
        name,
        title: structure.label,
        shape: structShape,
      };
    case 'WagtailListBlockStructure':
      if (!('child_block' in structure)) {
        throw new Error('Structure is too deeply nested');
      }
      const itemShape = structureToFieldShape(structure.child_block, 'item');
      if (itemShape.type !== 'shape') {
        throw new Error('Lists of non-struct values are not supported');
      }
      return {
        type: 'shape-list',
        name,
        title: structure.label,
        shape: itemShape.shape,
      };
  }
};

export const structureToShape = (structure: StructureFragment): FormShape => {
  if (structure.__typename === 'WagtailStaticBlockStructure') {
    return []; // special case - empty form
  }
  const fieldShape = structureToFieldShape(structure, 'form');
  if (fieldShape.type === 'shape') {
    return fieldShape.shape;
  } else {
    return [fieldShape];
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
    | StructureCommonFragment
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
      return parseInt(originalImageId, 10);
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
