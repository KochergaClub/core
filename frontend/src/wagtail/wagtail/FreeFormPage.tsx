import { Page } from '~/components';

import WagtailBlocks from '../components/WagtailBlocks';
import { FreeFormPageFragment, FreeFormPageFragmentDoc } from '../queries.generated';
import { NextWagtailPage } from '../types';

const FreeFormPage: NextWagtailPage<FreeFormPageFragment> = ({ page }) => {
  return (
    <Page title={page.title}>
      <WagtailBlocks blocks={page.body} />
    </Page>
  );
};

FreeFormPage.fragment = FreeFormPageFragmentDoc;

export default FreeFormPage;
