import { AnyPageType } from './pages/types';

import { NextPageContext } from '~/common/types';

// copy-pasted from next-js types to patch getInitialProps context type
export type NextWagtailPageContext<P extends AnyPageType> = NextPageContext & {
  wagtailPage: P;
};

export type NextWagtailPage<P extends AnyPageType, E extends {} = {}> = {
  (props: { wagtailPage: P } & E): JSX.Element | null;
  getInitialProps?(ctx: NextWagtailPageContext<P>): Promise<E>;
};
