import { NextPage } from '~/common/types';

import Page from '~/components/Page';

import TemplateList from '~/image-templater/components/TemplateList';

import { loadTemplates } from '~/image-templater/features/templates';

const ImageTemplaterIndexPage: NextPage = () => {
  return (
    <Page title="Шаблоны картинок" team>
      <Page.Title>Шаблоны картинок</Page.Title>
      <Page.Main>
        <TemplateList />
      </Page.Main>
    </Page>
  );
};

ImageTemplaterIndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadTemplates());
  return {};
};

export default ImageTemplaterIndexPage;
