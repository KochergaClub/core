import { AnyBlockFragment } from '../types';
import AnchorBlock from './AnchorBlock';
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
import ImageWithTextBlock from './ImageWithTextBlock';
import LandingHeroBlock from './LandingHeroBlock';
import LandingTextBlock from './LandingTextBlock';
import MailchimpSubscribeBlock from './MailchimpSubscribeBlock';
import PhotoRibbonBlock from './PhotoRibbonBlock';
import SectionHeaderBlock from './SectionHeaderBlock';

export const allBlockComponents = {
  BasicCardBlock,
  SectionHeaderBlock,
  BasicTextBlock,
  ColumnsBasicBlock,
  ColumnsButtonsBlock,
  ImageWithTextBlock,
  EventsListBlock,
  BigContactsBlock,
  HeroFrontBlock,
  PhotoRibbonBlock,
  MailchimpSubscribeBlock,
  HrBlock,
  AnchorBlock,
  FrontPartnersBlock,
  FrontSocialLinksBlock,
  LandingHeroBlock,
  LandingTextBlock,
};

type ComponentsMap = typeof allBlockComponents;

export type KnownBlockFragment = Parameters<
  ComponentsMap[keyof ComponentsMap]
>[0];

export type KnownBlockTypename = KnownBlockFragment['__typename'];

export const isKnownBlock = (
  block: AnyBlockFragment
): block is KnownBlockFragment => {
  return allBlockComponents.hasOwnProperty(block.__typename);
};

export const isKnownBlockTypename = (
  typename: string
): typename is KnownBlockTypename => {
  return allBlockComponents.hasOwnProperty(typename);
};
