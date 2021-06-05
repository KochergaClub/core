import clsx from 'clsx';
import { useContext } from 'react';

import { NowThemeContext } from '../contexts';
import { NowFragment } from '../queries.generated';
import { HR } from './HR';

const Small: React.FC = ({ children }) => {
  const theme = useContext(NowThemeContext);
  return (
    <div className={clsx('text-gray-500', theme.tv ? 'text-base' : 'text-xs')}>
      {children}
    </div>
  );
};

interface Props {
  now: NowFragment;
}

const NowData: React.FC<Props> = ({ now: { total, customers } }) => {
  const theme = useContext(NowThemeContext);

  const inflect =
    (total % 100 < 10 || total % 100 > 20) &&
    [2, 3, 4].indexOf(total % 10) >= 0;

  customers = [
    { __typename: 'NowCustomer', first_name: 'fish', last_name: 'furry' },
    { __typename: 'NowCustomer', first_name: 'dog', last_name: 'golden' },
  ];

  return (
    <div>
      <div
        className={clsx(
          'font-intro flex flex-col items-center',
          theme.tv ? 'text-white' : 'text-gray-500',
          theme.tv ? 'text-5xl' : 'text-xl',
          theme.tv && 'mt-20 mb-10'
        )}
      >
        <label>Сейчас в Кочерге:</label>
        <div
          className={clsx(
            'leading-none',
            theme.tv ? 'mt-16' : 'mt-5',
            theme.inverted ? 'text-white' : 'text-black'
          )}
          style={{
            fontSize: theme.tv ? '400px' : '120px',
          }}
        >
          {total}
        </div>
        <div>человек{inflect ? 'а' : ''}</div>
      </div>
      <HR />

      {customers.length ? (
        <div className="flex flex-col items-center text-center">
          <div className={clsx(theme.tv && 'inline mb-3 text-2xl')}>
            <Small>В том числе:</Small>
            <ul
              className={clsx(
                'm-0 p-0 list-none leading-tight',
                theme.tv ? 'inline ml-2' : 'mb-3'
              )}
            >
              {customers.map((customer, i) => (
                <li className={clsx(theme.tv && 'inline')} key={i}>
                  {i > 0 && theme.tv && ', '}
                  {customer.first_name} {customer.last_name}
                </li>
              ))}
            </ul>
          </div>
          <Small>
            Отображение имени можно включить в{' '}
            {theme.tv ? (
              'личном кабинете'
            ) : (
              <a className="link" href="/my">
                личном кабинете
              </a>
            )}
            .
          </Small>
        </div>
      ) : null}
    </div>
  );
};

export default NowData;
