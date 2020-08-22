import { AnyBlockFragment } from '../types';
import BasicLeadBlock from './BasicLeadBlock';
import BasicTextBlock from './BasicTextBlock';
import BigContactsBlock from './BigContactsBlock';
import ColumnsBasicBlock from './ColumnsBasicBlock';
import ColumnsButtonsBlock from './ColumnsButtonsBlock';
import EventsListBlock from './EventsListBlock';
import FrontPartnersBlock from './FrontPartnersBlock';
import FrontSocialLinksBlock from './FrontSocialLinksBlock';
import GreyBlock from './GreyBlock';
import HeroFrontBlock from './HeroFrontBlock';
import HrBlock from './HrBlock';
import MailchimpSubscribeBlock from './MailchimpSubscribeBlock';
import PhotoRibbonBlock from './PhotoRibbonBlock';

export const allBlockComponents = {
  BasicLeadBlock,
  GreyBlock,
  BasicTextBlock,
  ColumnsBasicBlock,
  ColumnsButtonsBlock,
  EventsListBlock,
  BigContactsBlock,
  HeroFrontBlock,
  PhotoRibbonBlock,
  MailchimpSubscribeBlock,
  HrBlock,
  FrontPartnersBlock,
  FrontSocialLinksBlock,
};

type ComponentsMap = typeof allBlockComponents;

type KnownBlockFragment = Parameters<ComponentsMap[keyof ComponentsMap]>[0];

export const isKnownBlock = (
  block: AnyBlockFragment
): block is KnownBlockFragment => {
  return allBlockComponents.hasOwnProperty(block.__typename);
};
