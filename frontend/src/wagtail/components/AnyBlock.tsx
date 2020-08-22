import BasicLeadBlock from '../blocks/BasicLeadBlock';
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

const BLOCKS = {
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

type ComponentsMap = typeof BLOCKS;

type KnownTypename = keyof ComponentsMap;

type TypenameToFragment<T extends KnownTypename> = Parameters<
  ComponentsMap[T]
>[0];

type KnownBlockFragment = Parameters<ComponentsMap[keyof ComponentsMap]>[0];

const isKnownFragment = (
  block: AnyBlockFragment
): block is KnownBlockFragment => {
  return BLOCKS.hasOwnProperty(block.__typename);
};

const renderKnownBlock = <T extends KnownTypename>(
  block: TypenameToFragment<T>
): JSX.Element => {
  const BlockComponent = BLOCKS[block.__typename];
  return <BlockComponent {...(block as any)} />; // Almost there... sorry. I'll figure this out later.
};

const AnyBlock = (block: AnyBlockFragment) => {
  if (isKnownFragment(block)) {
    return renderKnownBlock(block);
  }
  return <DebugBlock typename={block.__typename || 'UNKNOWN'} />;
};

export default AnyBlock;
