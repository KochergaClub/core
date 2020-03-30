import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';
import { NextPage } from '~/common/types';

import { Page } from '~/components';

import TemplateList from '~/image-templater/components/TemplateList';

const ImageTemplaterIndexPage: NextPage = () => {
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
