import { useEffect } from 'react';

import baseStyled, {
  ThemedBaseStyledInterface,
  ThemeProvider,
} from 'styled-components';

import { withApollo, NextApolloPage } from '~/apollo';

import { staticUrl } from '~/common/utils';

import { Page, ApolloQueryResults } from '~/components';

import HR from '../components/HR';
import NowData from '../components/NowData';

import { useNowQuery } from '../queries.generated';

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

const NowPage: NextApolloPage<Props> = props => {
  const { theme } = props;

  const nowQueryResults = useNowQuery();

  useEffect(() => {
    const id = setInterval(() => {
      nowQueryResults.refetch();
    }, 10000);
    return () => clearInterval(id);
  }, [nowQueryResults]);

  return (
    <Page title="Сейчас в Кочерге" chrome="none" noWhitespace>
      <ThemeProvider theme={THEMES[theme]}>
        <Container>
          <Main>
            <TopHeader>
              <a href="/">
                <TopHeaderLogo src={staticUrl('logo.png')} />
              </a>
              <TopHeaderLink href="/">Кочерга</TopHeaderLink>
            </TopHeader>
            <HR />
            <ApolloQueryResults {...nowQueryResults}>
              {({ data: { now } }) => <NowData now={now} />}
            </ApolloQueryResults>
          </Main>
        </Container>
      </ThemeProvider>
    </Page>
  );
};

NowPage.getInitialProps = async ({ query }) => {
  let theme: ThemeName = 'default';
  if (query.theme === 'tv') {
    theme = query.theme;
  }

  return { theme };
};

export default withApollo(NowPage);
