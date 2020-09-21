import { FragmentDefinitionNode } from 'graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export const dedupeFragments = <Operation, Variables>(
  document: DocumentNode<Operation, Variables>
): DocumentNode<Operation, Variables> => {
  const seenFragments = new Set();

  return {
    ...document,
    definitions: document.definitions.filter((definition) => {
      if (definition.kind === 'FragmentDefinition') {
        const fragmentDefinition = definition as FragmentDefinitionNode;

        const fragmentName = fragmentDefinition.name.value;

        if (seenFragments.has(fragmentName)) {
          return false;
        }

        seenFragments.add(fragmentName);
      }

      return true;
    }),
  };
};
