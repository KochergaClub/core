import React from 'react';

import { AnyInitialLoader, AnyScreen } from '../common/types';
import { WagtailPageType, RatioSectionPageType } from './types';

import FreeFormPage from './pages/FreeFormPage';
import RatioSectionIndexPage from './pages/RatioSectionIndexPage';
import RatioSectionPage from './pages/RatioSectionPage';
import RatioNotebookPage from './pages/RatioNotebookPage';
import BlogPostPage from './pages/BlogPostPage';

type AuxPages = { [key: number]: RatioSectionPageType };

interface Props {
  wagtailPage: WagtailPageType;

  // FIXME - move to NotebookSectionPage, proxy initial data logic to it
  ratioSectionPages?: AuxPages;
}

const UnknownPage = (props: WagtailPageType) => (
  <div>
    <h1>
      Unknown Wagtail page type: <code>{props.meta.type}</code>
    </h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

const AnyWagtailPage = (props: Props) => {
  const { wagtailPage } = props;
  switch (wagtailPage.meta_type) {
    case 'pages.FreeFormPage':
      return <FreeFormPage {...wagtailPage} />;
    case 'ratio.SectionIndexPage':
      return <RatioSectionIndexPage {...wagtailPage} />;
    case 'ratio.SectionPage':
      return <RatioSectionPage {...wagtailPage} />;
    case 'ratio.NotebookPage':
      return (
        <RatioNotebookPage
          wagtailPage={wagtailPage}
          ratioSectionPages={props.ratioSectionPages || {}}
        />
      );
    case 'blog.BlogPostPage':
      return <BlogPostPage {...wagtailPage} />;
    default:
      return <UnknownPage {...wagtailPage} />;
  }
};

type WagtailScreen = AnyScreen<WagtailPageType, Props>;
type WagtailInitialLoader = AnyInitialLoader<WagtailPageType, Props>;

const getInitialData: WagtailInitialLoader = async (
  { api },
  wagtailPage: WagtailPageType
) => {
  const props: Props = {
    wagtailPage,
  };

  if (wagtailPage.meta_type === 'ratio.NotebookPage') {
    const ids = wagtailPage.sections.map(section => section.value);

    const sectionPages: AuxPages = {};
    for (const id of ids) {
      const sectionPage = await api.callWagtail(`pages/${id}/?fields=*`);
      sectionPages[id] = sectionPage;
    }

    props.ratioSectionPages = sectionPages;
  }

  return props;
};

const screen: WagtailScreen = {
  component: AnyWagtailPage,
  getInitialData,
};

export default screen;
