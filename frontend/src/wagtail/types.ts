import { DocumentNode } from 'graphql';

import { WagtailBlockStructureQuery } from './components/queries.generated';
import { FreeFormPageFragment } from './queries.generated';

export interface AnyWagtailPage {
  id: string;
  title: string;
}

export interface NextWagtailPage<P extends AnyWagtailPage> {
  (props: { page: P }): JSX.Element | null;
  fragment: DocumentNode;
}

export type AnyBlockFragment = FreeFormPageFragment['body'][0];

interface BaseWagtailBlock {
  id: string;
}

export interface BlockComponent<P extends BaseWagtailBlock> {
  (props: P): JSX.Element | null;
  fragment: DocumentNode;
}

export type StructureFragment = WagtailBlockStructureQuery['result'];
