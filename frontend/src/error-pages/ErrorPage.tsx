import Page from '../components/Page';
import ErrorBlock from './ErrorBlock';

import { Code, code2title } from './codes';

interface Props {
  code: Code;
}

const ErrorPage: React.FC<Props> = ({ code }) => (
  <Page title={code2title[code]} chrome="none">
    <Page.Main>
      <ErrorBlock code={code} />
    </Page.Main>
  </Page>
);

export default ErrorPage;
