import clsx from 'clsx';
import { useContext, useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { staticUrl } from '~/common/utils';
import { ApolloQueryResults, Page } from '~/components';

import { HR } from '../components/HR';
import NowData from '../components/NowData';
import { NowTheme, NowThemeContext } from '../contexts';
import { NowDocument } from '../queries.generated';

export type ThemeName = 'default' | 'tv';

interface Props {
  themeName: ThemeName;
}

const THEMES: { [k: string]: NowTheme } = {
  default: {
    inverted: false,
    tv: false,
  },
  tv: {
    inverted: true,
    tv: true,
  },
};

const Container: React.FC = ({ children }) => {
  const theme = useContext(NowThemeContext);

  return (
    <div
      className={clsx(
        'w-full min-h-screen',
        theme.inverted && 'bg-black text-white'
      )}
    >
      {children}
    </div>
  );
};

const Main: React.FC = ({ children }) => {
  const theme = useContext(NowThemeContext);

  return (
    <div
      className="flex flex-col justify-center align-center mx-auto pb-12"
      style={{ maxWidth: theme.tv ? 800 : 350 }}
    >
      {children}
    </div>
  );
};

const NowPage: NextApolloPage<Props> = ({ themeName }) => {
  const theme = THEMES[themeName];

  const nowQueryResults = useQuery(NowDocument);

  useEffect(() => {
    const id = setInterval(() => {
      nowQueryResults.refetch();
    }, 10000);
    return () => clearInterval(id);
  }, [nowQueryResults]);

  return (
    <Page title="Сейчас в Кочерге" chrome="none" noWhitespace>
      <NowThemeContext.Provider value={theme}>
        <Container>
          <Main>
            <header
              className={clsx(
                'mt-3 flex justify-center items-center',
                theme.tv && 'hidden'
              )}
            >
              <a href="/">
                <img className="w-24 h-24" src={staticUrl('logo.png')} />
              </a>
              <a
                className={clsx(
                  'font-intro ml-2 no-underline text-4xl',
                  theme.inverted ? 'text-white' : 'text-black'
                )}
                href="/"
              >
                Кочерга
              </a>
            </header>
            <HR />
            <ApolloQueryResults {...nowQueryResults}>
              {({ data: { now } }) => <NowData now={now} />}
            </ApolloQueryResults>
          </Main>
        </Container>
      </NowThemeContext.Provider>
    </Page>
  );
};

NowPage.getInitialProps = async ({ query }) => {
  let themeName: ThemeName = 'default';
  if (query.theme === 'tv') {
    themeName = query.theme;
  }

  return { themeName };
};

export default withApollo(NowPage);
