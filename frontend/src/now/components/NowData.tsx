import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import HR from './HR';

import { NowFragment } from '../queries.generated';

const NowContainer = styled.div`
  font-family: 'Intro';
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => (props.theme.tv ? 'white' : '#666')};
  font-size: ${props => (props.theme.tv ? '50px' : '20px')};

  ${props =>
    props.theme.tv &&
    `margin-top: 80px;
margin-bottom: 40px;
`};
`;

const NowValue = styled.div`
  color: ${props => (props.theme.inverted ? 'white' : 'black')};
  font-size: ${props => (props.theme.tv ? '400px' : '120px')};
  margin-top: ${props => (props.theme.tv ? '60px' : '20px')};
  line-height: 0.75;
`;

const Small = styled.small`
  font-size: ${props => (props.theme.tv ? '16px' : '12px')};
  color: #666;
`;

const NowCustomersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NowCustomersLine = styled.div`
  ${props =>
    props.theme.tv &&
    `
display: inline;
margin-bottom: 12px;

> * {
  font-size: 24px;
}
`}
`;

const NowCustomers = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 1.2;

  ${props =>
    props.theme.tv
      ? `
display: inline;
margin-left: 8px;
> li {
  display: inline;
}

> li + li::before {
  display: inline;
  content: ', ';
}
`
      : 'margin-bottom: 10px;'}
`;

interface Props {
  now: NowFragment;
}

const NowData: React.FC<Props> = ({ now: { total, customers } }) => {
  const themeContext = useContext(ThemeContext);

  const inflect =
    (total % 100 < 10 || total % 100 > 20) &&
    [2, 3, 4].indexOf(total % 10) >= 0;

  return (
    <div>
      <NowContainer>
        <label>Сейчас в Кочерге:</label>
        <NowValue>{total}</NowValue>
        <div>человек{inflect ? 'а' : ''}</div>
      </NowContainer>
      <HR />

      {customers.length ? (
        <NowCustomersContainer>
          <NowCustomersLine>
            <Small>В том числе:</Small>
            <NowCustomers>
              {customers.map((customer, i) => (
                <li key={i}>
                  {customer.first_name} {customer.last_name}
                </li>
              ))}
            </NowCustomers>
          </NowCustomersLine>
          <Small>
            Отображение имени можно включить в{' '}
            {themeContext === 'tv' ? (
              'личном кабинете'
            ) : (
              <a href="/my">личном кабинете</a>
            )}
            .
          </Small>
        </NowCustomersContainer>
      ) : null}
    </div>
  );
};

export default NowData;
