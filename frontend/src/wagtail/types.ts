import { DocumentNode } from 'graphql';

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
