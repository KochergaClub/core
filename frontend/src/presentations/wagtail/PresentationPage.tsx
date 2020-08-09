import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';

import dynamic from 'next/dynamic';

import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import { PresentationPageFragment, PresentationPageFragmentDoc } from './fragments.generated';

const RevealView = dynamic(() => import('../components/RevealView'), {
  ssr: false,
});

const PresentationPage: NextWagtailPage<PresentationPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team" chrome="none" noWhitespace={true}>
      <RevealView slides={page.slides} />
    </Page>
  );
};

PresentationPage.fragment = PresentationPageFragmentDoc;

export default PresentationPage;
