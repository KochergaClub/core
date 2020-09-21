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
  & Pick<Types.ProjectPage, 'id' | 'title' | 'summary' | 'activity_summary' | 'is_active'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ), image: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url' | 'width' | 'height'>
  ) }
);

export const ProjectPage_SummaryFragmentDoc: DocumentNode<ProjectPage_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectPage_summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"activity_summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"is_active"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-500x300","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"width"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"height"},"arguments":[],"directives":[]}]}}]}}]};
export const ProjectIndexPageFragmentDoc: DocumentNode<ProjectIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectIndexPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"active_description"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"active_projects"},"name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"is_active"},"value":{"kind":"BooleanValue","value":true}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectPage_summary"},"directives":[]}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive_projects"},"name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"is_active"},"value":{"kind":"BooleanValue","value":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectPage_summary"},"directives":[]}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...ProjectPage_SummaryFragmentDoc.definitions]};