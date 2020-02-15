import styled from 'styled-components';

import { Page } from '~/components';

import { NextWagtailPage } from '~/wagtail/types';
import { staticUrl } from '~/common/utils';

import {
  RatioSectionPageFragment,
  RatioSectionPageFragmentDoc,
} from '../fragments.generated';

import Main from './Main';

const Container = styled.div`
  @font-face {
    font-family: 'Intro Book';
    src: url('${staticUrl('fonts/intro-pack/Intro-Book.otf')}');
  }

  font-family: 'Intro Book';
  max-width: 800px;
  margin: 0 auto;
`;

const SectionPage: NextWagtailPage<RatioSectionPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} chrome="none" team>
      <Container>
        <Main {...page} />
      </Container>
    </Page>
  );
};

SectionPage.fragment = RatioSectionPageFragmentDoc;

export default SectionPage;
