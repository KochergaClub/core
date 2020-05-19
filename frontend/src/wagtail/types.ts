import { DocumentNode } from 'graphql';

export interface AnyWagtailPage {
  id: string;
  title: string;
}

export interface NextWagtailPage<P extends AnyWagtailPage> {
  (props: { page: P }): JSX.Element | null;
  fragment: DocumentNode;
}
