import { useSelector } from 'react-redux';

import { NextPage } from '~/common/types';
import { Page } from '~/components';

import { loadTemplate, selectTemplate } from '../features/templateItem';

import ViewingTemplateScreen from '../components/ViewingTemplateScreen';

interface Props {}

const ImageTemplaterDetailsPage: NextPage<Props> = () => {
  const template = useSelector(selectTemplate);

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
  await dispatch(loadTemplate(slug));
  return {};
};

export default ImageTemplaterDetailsPage;
