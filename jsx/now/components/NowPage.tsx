import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import baseStyled, {
  ThemedBaseStyledInterface,
  ThemeProvider,
} from 'styled-components';

import { NextPage } from 'next';

import Page from '~/components/Page';

import { selectNowData } from '../reducer';
import { loadNowData } from '../actions';

export type ThemeName = 'default' | 'tv';

interface Props {
  theme: ThemeName;
}

interface ThemeProps {
  inverted: boolean;
  tv: boolean;
}

const THEMES: { [k: string]: ThemeProps } = {
  default: {
    inverted: false,
    tv: false,
  },
  tv: {
    inverted: true,
    tv: true,
  },
};

const styled = baseStyled as ThemedBaseStyledInterface<ThemeProps>;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  ${props =>
    props.theme.inverted
      ? `
background-color: black;
color: white;
`
      : ''}
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 50px;

  ${props => (props.theme.tv ? 'max-width: 800px;' : 'max-width: 350px;')}
`;

const TopHeader = styled.header`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props => props.theme.tv && 'display: none;'}
`;

const TopHeaderLogo = styled.img`
  width: 100px;
  height: 100px;
`;

const TopHeaderLink = styled.a`
  font-family: 'Intro';
  font-size: 36px;
  margin-left: 10px;
  color: ${props => (props.theme.inverted ? 'white' : 'black')};
  text-decoration: none;
`;

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

const HR = styled.hr`
  border: 0;
  width: 100%;
  height: 1px;
  background-color: #999;
  margin-top: 50px;
  margin-bottom: 50px;

  ${props => (props.theme.tv ? 'display: none;' : '')}
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

const NowPage: NextPage<Props> = props => {
  const { theme } = props;

  const nowData = useSelector(selectNowData);
  const dispatch = useDispatch();

  if (!nowData) {
    throw new Error('now data is not loaded');
  }
  const { total } = nowData;

  let customers = [];
  customers.push({ first_name: 'Антон', last_name: 'Чайников' });
  customers.push({ first_name: 'Татьяна', last_name: 'Миропольская' });
  customers.push({ first_name: 'Майя', last_name: 'Плисова' });

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(loadNowData());
    }, 10000);
    return () => clearInterval(id);
  }, [dispatch, loadNowData]);

  const inflect =
    (total % 100 < 10 || total % 100 > 20) &&
    [2, 3, 4].indexOf(total % 10) >= 0;

  return (
    <Page title="Сейчас в Кочерге" noMenu noFooter noVkWidget>
      <ThemeProvider theme={THEMES[theme]}>
        <Container>
          <Main>
            <TopHeader>
              <a href="/">
                <TopHeaderLogo src="/static/logo.png" />
              </a>
              <TopHeaderLink href="/">Кочерга</TopHeaderLink>
            </TopHeader>
            <HR />
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
                    {customers.map(customer => (
                      <li>
                        {customer.first_name} {customer.last_name}
                      </li>
                    ))}
                  </NowCustomers>
                </NowCustomersLine>
                <Small>
                  Отображение имени можно включить в{' '}
                  {theme === 'tv' ? (
                    'личном кабинете'
                  ) : (
                    <a href="/my">личном кабинете</a>
                  )}
                  .
                </Small>
              </NowCustomersContainer>
            ) : null}
          </Main>
        </Container>
      </ThemeProvider>
    </Page>
  );
};

export default NowPage;
