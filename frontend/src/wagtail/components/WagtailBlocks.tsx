// Stream of Wagtail blocks rendered in order based on their type.

import WagtailBlockContainer from './WagtailBlockContainer';

import { FreeFormPageFragment } from '../queries.generated';

import BasicLeadBlock from '../blocks/BasicLeadBlock';
import BigContactsBlock from '../blocks/BigContactsBlock';
import ColumnsBasicBlock from '../blocks/ColumnsBasicBlock';
import ColumnsButtonsBlock from '../blocks/ColumnsButtonsBlock';
import ColumnsMembershipsBlock from '../blocks/ColumnsMembershipsBlock';
import DebugBlock from '../blocks/DebugBlock';
import EventsListBlock from '../blocks/EventsListBlock';
import GreyBlock from '../blocks/GreyBlock';
import HeroFrontBlock from '../blocks/HeroFrontBlock';
import MailchimpSubscribeBlock from '../blocks/MailchimpSubscribeBlock';
import PhotoRibbonBlock from '../blocks/PhotoRibbonBlock';

export type AnyBlockFragment = FreeFormPageFragment['body'][0];

interface Props {
  blocks: AnyBlockFragment[];
}

const AnyBlock = (block: AnyBlockFragment) => {
  switch (block.__typename) {
    case 'BasicLeadBlock':
      return <BasicLeadBlock {...block} />;
    case 'GreyBlock':
      return <GreyBlock {...block} />;
    case 'BasicParagraphBlock':
      throw new Error('BasicParagraphBlock is not implemented');
    case 'ColumnsBasicBlock':
      return <ColumnsBasicBlock {...block} />;
    case 'ColumnsMembershipsBlock':
      return <ColumnsMembershipsBlock {...block} />;
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
    default:
      return <DebugBlock typename={block.__typename || 'UNKNOWN'} />;
  }
};

export default function WagtailBlocks({ blocks }: Props) {
  return (
    <div>
      {blocks.map((block) => (
        <WagtailBlockContainer key={block.id} block={block}>
          <AnyBlock {...block} />
        </WagtailBlockContainer>
      ))}
    </div>
  );
}
