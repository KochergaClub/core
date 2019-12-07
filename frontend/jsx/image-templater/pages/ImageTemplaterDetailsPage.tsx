import React from 'react';
import { useSelector } from 'react-redux';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadTemplateByName } from '~/image-templater/actions';
import { selectViewingTemplate } from '~/image-templater/selectors';

import ViewingTemplateScreen from '~/image-templater/components/ViewingTemplateScreen';

interface Props {}

const ImageTemplaterDetailsPage: NextPage<Props> = () => {
  const template = useSelector(selectViewingTemplate);

  if (!template) {
    return <div>Внутренняя ошибка. Не удалось загрузить шаблон.</div>;
  }

  return (
    <Page title={`${template.name} | Шаблон картинки`} team>
      <Page.Main>
        <ViewingTemplateScreen />
      </Page.Main>
    </Page>
  );
};

ImageTemplaterDetailsPage.getInitialProps = async ({
  store: { dispatch },
  query,
}) => {
  const slug = query.slug as string;
  await dispatch(loadTemplateByName(slug));
  return {};
};

export default ImageTemplaterDetailsPage;