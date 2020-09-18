import * as Types from '../../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../../cms/queries.generated';
import { Event_SummaryFragment } from '../../../events/queries.generated';
import gql from 'graphql-tag';
import { CommonWagtailPageFragmentDoc } from '../../../cms/queries.generated';
import { Event_SummaryFragmentDoc } from '../../../events/queries.generated';

export type ProjectPageFragment = (
  { __typename: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'summary' | 'body' | 'is_active' | 'activity_summary'>
  & { image: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  ), upcoming_events: Array<(
    { __typename: 'Event' }
    & Event_SummaryFragment
  )> }
  & CommonWagtailPage_ProjectPage_Fragment
);

export const ProjectPageFragmentDoc = gql`
    fragment ProjectPage on ProjectPage {
  ...CommonWagtailPage
  summary
  body
  is_active
  activity_summary
  image(spec: "fill-1080x400") {
    id
    url
  }
  upcoming_events {
    ...Event_Summary
  }
}
    ${CommonWagtailPageFragmentDoc}
${Event_SummaryFragmentDoc}`;