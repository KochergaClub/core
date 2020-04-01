import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import TemplateList from '../components/TemplateList';

const ImageTemplaterIndexPage: NextApolloPage = () => {
  return (
    <Page title="Шаблоны картинок" menu="team">
      <Page.Title>Шаблоны картинок</Page.Title>
      <Page.Main>
        <TemplateList />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(ImageTemplaterIndexPage));
