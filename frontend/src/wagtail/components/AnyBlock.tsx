import BasicLeadBlock from '../blocks/BasicLeadBlock';
import BasicParagraphBlock from '../blocks/BasicParagraphBlock';
import BasicTextBlock from '../blocks/BasicTextBlock';
import BigContactsBlock from '../blocks/BigContactsBlock';
import ColumnsBasicBlock from '../blocks/ColumnsBasicBlock';
import ColumnsButtonsBlock from '../blocks/ColumnsButtonsBlock';
import DebugBlock from '../blocks/DebugBlock';
import EventsListBlock from '../blocks/EventsListBlock';
import FrontPartnersBlock from '../blocks/FrontPartnersBlock';
import FrontSocialLinksBlock from '../blocks/FrontSocialLinksBlock';
import GreyBlock from '../blocks/GreyBlock';
import HeroFrontBlock from '../blocks/HeroFrontBlock';
import HrBlock from '../blocks/HrBlock';
import MailchimpSubscribeBlock from '../blocks/MailchimpSubscribeBlock';
import PhotoRibbonBlock from '../blocks/PhotoRibbonBlock';
import { AnyBlockFragment } from '../types';

const AnyBlock = (block: AnyBlockFragment) => {
  switch (block.__typename) {
    case 'BasicLeadBlock':
      return <BasicLeadBlock {...block} />;
    case 'GreyBlock':
      return <GreyBlock {...block} />;
    case 'BasicParagraphBlock':
      return <BasicParagraphBlock {...block} />;
    case 'BasicTextBlock':
      return <BasicTextBlock {...block} />;
    case 'ColumnsBasicBlock':
      return <ColumnsBasicBlock {...block} />;
    case 'ColumnsButtonsBlock':
      return <ColumnsButtonsBlock {...block} />;
    case 'EventsListBlock':
      return <EventsListBlock {...block} />;
    case 'BigContactsBlock':
      return <BigContactsBlock {...block} />;
    case 'HeroFrontBlock':
      return <HeroFrontBlock {...block} />;
    case 'PhotoRibbonBlock':
      return <PhotoRibbonBlock {...block} />;
    case 'MailchimpSubscribeBlock':
      return <MailchimpSubscribeBlock {...block} />;
    case 'HrBlock':
      return <HrBlock {...block} />;
    case 'FrontPartnersBlock':
      return <FrontPartnersBlock {...block} />;
    case 'FrontSocialLinksBlock':
      return <FrontSocialLinksBlock {...block} />;
    default:
      return <DebugBlock typename={block.__typename || 'UNKNOWN'} />;
  }
};

export default AnyBlock;
