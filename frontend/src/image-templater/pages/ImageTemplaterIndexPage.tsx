import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';

import { TemplateListBlock } from '../components/TemplateListBlock';

const ImageTemplaterIndexPage: NextApolloPage = () => {
  return (
    <Page title="Шаблоны картинок" menu="team">
      <Page.Title>Шаблоны картинок</Page.Title>
      <Page.Main>
        <TemplateListBlock />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(ImageTemplaterIndexPage));
