import { Page } from '~/components';

import { NextWagtailPage } from '../types';

import {
  FreeFormPageFragment,
  FreeFormPageFragmentDoc,
} from '../queries.generated';

import WagtailBlocks from '../components/WagtailBlocks';

const FreeFormPage: NextWagtailPage<FreeFormPageFragment> = ({ page }) => {
  return (
    <Page title={page.title}>
      <WagtailBlocks blocks={page.body} />
    </Page>
  );
};

FreeFormPage.fragment = FreeFormPageFragmentDoc;

export default FreeFormPage;
