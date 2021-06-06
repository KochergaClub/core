import { staticUrl } from '~/common/utils';

import { Code, code2title } from './codes';

interface Props {
  code: Code;
  title?: string;
}

const ErrorBlock: React.FC<Props> = ({ code, title }) => {
  return (
    <div className="mt-16 mb-12">
      <div className="flex flex-col items-center">
        <div className="text-gray-600 text-8xl mb-4">{code}</div>
        <div className="text-gray-700 text-xl sm:text-3xl mb-12">
          {title || code2title[code]}
        </div>
        <a href="/">
          <img
            src={staticUrl(`error-pages/${code}.jpg`)}
            className="max-w-xs sm:max-w-md"
          />
        </a>
      </div>
    </div>
  );
};

export default ErrorBlock;
