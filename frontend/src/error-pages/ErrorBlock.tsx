import { staticUrl } from '~/common/utils';
import { Column } from '~/frontkit';

import { Code, code2title } from './codes';

interface Props {
  code: Code;
  title?: string;
}

const ErrorBlock: React.FC<Props> = ({ code, title }) => {
  return (
    <div className="mt-5 mb-12">
      <Column centered gutter={40}>
        <h1 style={{ fontSize: 40 }}>{code}</h1>
        <a href="/">
          <img
            src={staticUrl(`error-pages/${code}.jpg`)}
            style={{ width: 'auto', height: 300 }}
          />
        </a>
        <h1>{title || code2title[code]}</h1>
      </Column>
    </div>
  );
};

export default ErrorBlock;
