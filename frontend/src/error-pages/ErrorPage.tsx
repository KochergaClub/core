import Head from 'next/head';

import Page from '../components/Page';
import { Code, code2title } from './codes';
import ErrorBlock from './ErrorBlock';

interface Props {
  code: Code;
}

const ErrorPage: React.FC<Props> = ({ code }) => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <Page title={code2title[code]} chrome="none" noWhitespace>
      <Page.Main>
        <ErrorBlock code={code} />
      </Page.Main>
    </Page>
  </>
);

export default ErrorPage;
