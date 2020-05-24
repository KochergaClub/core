import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Page } from '~/components';

import { NextWagtailPage } from '~/wagtail/types';

import {
  RatioPresentationPageFragment,
  RatioPresentationPageFragmentDoc,
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
  }, [source, ref.current]);

  return (
    <RemarkContainer ref={ref}>
      <script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
    </RemarkContainer>
  );
};

const PresentationPage: NextWagtailPage<RatioPresentationPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team" chrome="none">
      <Remark source={page.source} />
    </Page>
  );
};

PresentationPage.fragment = RatioPresentationPageFragmentDoc;

export default PresentationPage;
