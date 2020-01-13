// Stream of Wagtail blocks rendered in order based on their type.

import { formatDate } from '~/common/utils';

import { FreeFormPageFragment } from './queries.generated';

export type AnyBlockFragment = FreeFormPageFragment['body'][0];

interface Props {
  blocks: AnyBlockFragment[];
}

import BasicLeadBlock from './blocks/BasicLeadBlock';
import GreyBlock from './blocks/GreyBlock';

import ColumnsBasicBlock from './blocks/ColumnsBasicBlock';
import ColumnsMembershipsBlock from './blocks/ColumnsMembershipsBlock';
import ColumnsButtonsBlock from './blocks/ColumnsButtonsBlock';

import EventsListBlock from './blocks/EventsListBlock';
import BigContactsBlock from './blocks/BigContactsBlock';
import HeroFrontBlock from './blocks/HeroFrontBlock';
import PhotoRibbonBlock from './blocks/PhotoRibbonBlock';
import MailchimpSubscribeBlock from './blocks/MailchimpSubscribeBlock';

import DebugBlock from './blocks/DebugBlock';

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
      {blocks.map(block => (
        <AnyBlock key={block.id} {...block} />
      ))}
    </div>
  );
}

// export const loadBlockData = async (
//   block: AnyBlockFragment,
//   api: API
// ): Promise<BlockType> => {
//   switch (block.type) {
//     case 'events_list':
//       const from_date = new Date();
//       const events = (await api.call(
//         `public_events?from_date=${formatDate(from_date, 'yyyy-MM-dd')}`,
//         'GET'
//       )) as ServerPublicEvent[];
//
//       return {
//         ...block,
//         data: { events },
//       };
//     default:
//       return block;
//   }
// };
