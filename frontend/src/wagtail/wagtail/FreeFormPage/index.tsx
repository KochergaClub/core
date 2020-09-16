import { gql } from '@apollo/client';

import { Page } from '~/components';

import WagtailBlocks from '../../components/WagtailBlocks';
import { NextWagtailPage } from '../../types';
import { FreeFormPageFragment, FreeFormPageFragmentDoc } from './index.generated';
import SpecialOffer from './SpecialOffer';

const FreeFormPage: NextWagtailPage<FreeFormPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} description={page.meta.description}>
      <SpecialOffer />
      <WagtailBlocks blocks={page.body} />
    </Page>
  );
};

export const rawFragment = gql`
  fragment FreeFormPage on FreeFormPage {
    ...CommonWagtailPage
    body {
      __typename
      id
      ...BasicLeadBlock
      ...BasicTextBlock
      ...SectionHeaderBlock
      ...BasicCardBlock
      ...GreyBlock
      ...ColumnsBasicBlock
      ...ColumnsButtonsBlock
      ...EventsListBlock
      ...BigContactsBlock
      ...PhotoRibbonBlock
      ...MailchimpSubscribeBlock
      ...HeroFrontBlock
      ...HrBlock
      ...FrontPartnersBlock
      ...FrontSocialLinksBlock
    }
  }
`;

FreeFormPage.fragment = FreeFormPageFragmentDoc;

export default FreeFormPage;
