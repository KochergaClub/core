import * as Types from '../../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../../cms/queries.generated';
import { Event_SummaryFragment } from '../../../events/queries.generated';
import { TelegramChatFragment } from '../../../telegram/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../../cms/queries.generated';
import { Event_SummaryFragmentDoc } from '../../../events/queries.generated';
import { TelegramChatFragmentDoc } from '../../../telegram/queries.generated';
export type ProjectPageFragment = (
  { __typename: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'summary' | 'body' | 'is_active' | 'activity_summary'>
  & { image: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  ), upcoming_events: Array<(
    { __typename: 'Event' }
    & Event_SummaryFragment
  )>, telegram_chats: Array<(
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  )> }
  & CommonWagtailPage_ProjectPage_Fragment
);

export const ProjectPageFragmentDoc: DocumentNode<ProjectPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"activity_summary"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-1080x400","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upcoming_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event_Summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"telegram_chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TelegramChat"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...Event_SummaryFragmentDoc.definitions,...TelegramChatFragmentDoc.definitions]};