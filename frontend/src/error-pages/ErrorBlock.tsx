import { Column } from '@kocherga/frontkit';

import { staticUrl } from '~/common/utils';
import { Code, code2title } from './codes';

interface Props {
  code: Code;
  title?: string;
}

const ErrorBlock: React.FC<Props> = ({ code, title }) => {
  return (
    <Column centered style={{ marginTop: 20, marginBottom: 50 }} gutter={40}>
      <h1 style={{ fontSize: 40 }}>{code}</h1>
      <a href="/">
        <img
          src={staticUrl(`error-pages/${code}.jpg`)}
          style={{ width: 'auto', height: 300 }}
        />
      </a>
      <h1>{title || code2title[code]}</h1>
    </Column>
  );
};

export default ErrorBlock;
