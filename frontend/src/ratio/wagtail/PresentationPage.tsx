import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import {
    RatioPresentationPageFragment, RatioPresentationPageFragmentDoc
} from './fragments.generated';

const RemarkContainer = styled.div`
  width: 100%;
  height: 100vh;
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
      return '# ' + slide.title;
    default:
      return 'TODO';
  }
};

const slides2remark = (slides: RatioPresentationPageFragment['slides']) => {
  return slides.map(slide2remark).join('\n---\n');
};

const PresentationPage: NextWagtailPage<RatioPresentationPageFragment> = ({
  page,
}) => {
  const source = slides2remark(page.slides);
  return (
    <Page title={page.title} menu="team" chrome="none">
      <Remark source={source} />
    </Page>
  );
};

PresentationPage.fragment = RatioPresentationPageFragmentDoc;

export default PresentationPage;
