import Head from 'next/head';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { staticUrl } from '~/common/utils';
import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import {
    RatioPresentationPageFragment, RatioPresentationPageFragmentDoc
} from './fragments.generated';

const RemarkContainer = styled.div`
  width: 100%;
  height: 100vh;

  .slides-title h1 {
    text-align: center;
    margin-top: 25vh;
  }

  .slides-text {
    font-size: 24px;
  }
`;

const Remark: React.FC<{ source: string }> = ({ source }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    (window as any).remark.create({
      source: source.replace(/\r\n/g, '\n'),
      container: ref.current,
    });
  }, [source]);

  return (
    <RemarkContainer ref={ref}>
      <script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
    </RemarkContainer>
  );
};

const slide2remark = (slide: RatioPresentationPageFragment['slides'][0]) => {
  switch (slide.__typename) {
    case 'SlidesTitleBlock':
      return `
class: slides-title

# ${slide.title}
`;
    case 'SlidesTextBlock':
      return `
class: slides-text, middle, center

${slide.value}
`;
    case 'SlidesMermaidBlock':
      const escapeMap: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      };
      const escapeHTML = (str: string) =>
        str.replace(/[&<>'"]/g, (tag: string) => escapeMap[tag]);

      return `
<div class="mermaid">
${escapeHTML(slide.value)}
</div>
`;
    default:
      return '# Ошибка - неизвестный тип слайда';
  }
};

const slides2remark = (slides: RatioPresentationPageFragment['slides']) => {
  return slides.map(slide2remark).join('\n---\n');
};

const PresentationPage: NextWagtailPage<RatioPresentationPageFragment> = ({
  page,
}) => {
  const source = slides2remark(page.slides);

  console.log(source);

  useEffect(() => {
    (window as any).mermaid.initialize({ startOnLoad: false });
  }, []);

  return (
    <Page title={page.title} menu="team" chrome="none">
      <Head>
        <script src={staticUrl('mermaid/mermaid.min.js')} />
        <link rel="stylesheet" href={staticUrl('mermaid/mermaid.css')} />
      </Head>
      <Remark source={source} />
    </Page>
  );
};

PresentationPage.fragment = RatioPresentationPageFragmentDoc;

export default PresentationPage;
