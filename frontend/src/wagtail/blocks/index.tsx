import { AnyBlockFragment } from '../types';
import BasicCardBlock from './BasicCardBlock';
import BasicTextBlock from './BasicTextBlock';
import BigContactsBlock from './BigContactsBlock';
import ColumnsBasicBlock from './ColumnsBasicBlock';
import ColumnsButtonsBlock from './ColumnsButtonsBlock';
import EventsListBlock from './EventsListBlock';
import FrontPartnersBlock from './FrontPartnersBlock';
import FrontSocialLinksBlock from './FrontSocialLinksBlock';
import HeroFrontBlock from './HeroFrontBlock';
import HrBlock from './HrBlock';
import LandingHeroBlock from './LandingHeroBlock';
import MailchimpSubscribeBlock from './MailchimpSubscribeBlock';
import PhotoRibbonBlock from './PhotoRibbonBlock';
import SectionHeaderBlock from './SectionHeaderBlock';

export const allBlockComponents = {
  BasicCardBlock,
  SectionHeaderBlock,
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
  LandingHeroBlock,
};

type ComponentsMap = typeof allBlockComponents;

export type KnownBlockFragment = Parameters<
  ComponentsMap[keyof ComponentsMap]
>[0];

export const isKnownBlock = (
  block: AnyBlockFragment
): block is KnownBlockFragment => {
  return allBlockComponents.hasOwnProperty(block.__typename);
};
