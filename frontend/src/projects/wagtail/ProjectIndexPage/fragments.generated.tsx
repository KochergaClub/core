import * as Types from '../../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../../cms/queries.generated';
import gql from 'graphql-tag';
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

export const ProjectPage_SummaryFragmentDoc = gql`
    fragment ProjectPage_summary on ProjectPage {
  ...CommonWagtailPage
  summary
  activity_summary
  is_active
  image(spec: "fill-500x300") {
    id
    url
    width
    height
  }
}
    ${CommonWagtailPageFragmentDoc}`;
export const ProjectIndexPageFragmentDoc = gql`
    fragment ProjectIndexPage on ProjectIndexPage {
  ...CommonWagtailPage
  active_description
  active_projects: projects(is_active: true) {
    ...ProjectPage_summary
  }
  inactive_projects: projects(is_active: false) {
    ...ProjectPage_summary
  }
}
    ${CommonWagtailPageFragmentDoc}
${ProjectPage_SummaryFragmentDoc}`;