import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/moon.css';

import dynamic from 'next/dynamic';

import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import {
    RatioPresentationPageFragment, RatioPresentationPageFragmentDoc
} from './fragments.generated';

const RevealView = dynamic(() => import('../components/RevealView'), {
  ssr: false,
});

const PresentationPage: NextWagtailPage<RatioPresentationPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team" chrome="none" noWhitespace={true}>
      <RevealView slides={page.slides} />
    </Page>
  );
};

PresentationPage.fragment = RatioPresentationPageFragmentDoc;

export default PresentationPage;
