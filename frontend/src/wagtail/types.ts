import { NextPageContext } from '~/common/types';

export interface WagtailPageProps {
  id: number;
  meta: {
    type: string;
    slug: string;
    html_url: string;
  };

  // This field doesn't come from the server, we fill it in pages/wagtail-any.
  // It's necessary because TypeScript doesn't support nested tagged unions (yet).
  meta_type: string;

  title: string;
}

// copy-pasted from next-js types to patch getInitialProps context type
export type NextWagtailPageContext<
  P extends WagtailPageProps
> = NextPageContext & {
  wagtailPage: P;
};

export type NextWagtailPage<P extends WagtailPageProps, E extends {} = {}> = {
  (props: { wagtailPage: P } & E): JSX.Element | null;
  getInitialProps?(ctx: NextWagtailPageContext<P>): Promise<E>;
};
