import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { CommonWagtailPageFragment } from '~/cms/queries.generated';

import { WagtailBlockStructureQuery } from './components/queries.generated';
import { FreeFormPageFragment } from './wagtail/FreeFormPage/index.generated';

export interface NextWagtailPage<P extends CommonWagtailPageFragment> {
  (props: { page: P }): JSX.Element | null;
  fragment: TypedDocumentNode<P, unknown>;
}

export type AnyBlockFragment = FreeFormPageFragment['body'][0];

interface BaseWagtailBlock {
  id: string;
}

export interface BlockComponent<P extends BaseWagtailBlock> {
  (props: P): JSX.Element | null;
  fragment: TypedDocumentNode<P, unknown>;
}

export type StructureFragment = WagtailBlockStructureQuery['result'];
