import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { initApolloClient } from '~/apollo/client';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => {
            if (ctx.req && props.pageProps.apolloState) {
              // We're on server and are rendering a apollo-based page.
              // Let's fix an issue: apolloClient on server should be initialized with req (and with proper cookies).
              // I'm not sure why apollo tries to fetch queries on this (third) rendering pass since we don't wait for any queries here with getDataFromTree;
              // but I know empirically that this can happen and cause "access denied" backend errors on evenman and probably other pages.
              // ...Sigh. Hopefully React Suspense will save us from this mess later on.
              const apolloClient = initApolloClient(
                props.pageProps.apolloState,
                ctx.req
              );
              return sheet.collectStyles(
                <App
                  {...props}
                  pageProps={{ ...props.pageProps, apolloClient }}
                />
              );
            }
            return sheet.collectStyles(<App {...props} />);
          },
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
