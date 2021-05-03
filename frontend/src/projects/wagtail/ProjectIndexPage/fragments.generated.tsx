import * as Types from '../../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../../cms/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../../cms/queries.generated';
export type ProjectIndexPageFragment = (
  { __typename: 'ProjectIndexPage' }
  & Pick<Types.ProjectIndexPage, 'active_description'>
  & { active_projects: Array<(
    { __typename: 'ProjectPage' }
    & ProjectPage_SummaryFragment
  )>, inactive_projects: Array<(
    { __typename: 'ProjectPage' }
    & ProjectPage_SummaryFragment
  )> }
  & CommonWagtailPage_ProjectIndexPage_Fragment
);

export type ProjectPage_SummaryFragment = (
  { __typename: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'summary' | 'activity_summary' | 'is_active'>
  & { image: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url' | 'width' | 'height'>
  ) }
  & CommonWagtailPage_ProjectPage_Fragment
);

export const ProjectPage_SummaryFragmentDoc: DocumentNode<ProjectPage_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectPage_summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"activity_summary"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-500x300","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions]};
export const ProjectIndexPageFragmentDoc: DocumentNode<ProjectIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectIndexPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"active_description"}},{"kind":"Field","alias":{"kind":"Name","value":"active_projects"},"name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"is_active"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectPage_summary"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive_projects"},"name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"is_active"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectPage_summary"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...ProjectPage_SummaryFragmentDoc.definitions]};