import Page from '~/components/Page';

import Navigation from './Navigation';

interface Props {
  htmlTitle: string;
}

const CmApp: React.FC<Props> = ({ htmlTitle, children }) => {
  return (
    <Page title={`${htmlTitle} | Cafe Menagerie`} team>
      <Page.Title>Cafe Menagerie</Page.Title>
      <Page.Main>
        <Navigation />
        {children}
      </Page.Main>
    </Page>
  );
};

export default CmApp;
