import * as Types from '../apollo/types.generated';

import { EventsPublicEvent_SummaryFragment } from '../events/queries.generated';
import gql from 'graphql-tag';
import { EventsPublicEvent_SummaryFragmentDoc } from '../events/queries.generated';

export type ProjectPage_SummaryFragment = (
  { __typename?: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'id' | 'title' | 'summary' | 'activity_summary' | 'is_active'>
  & { meta: (
    { __typename?: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ), image: (
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'url' | 'width' | 'height'>
  ) }
);

export type ProjectIndexPageFragment = (
  { __typename?: 'ProjectIndexPage' }
  & Pick<Types.ProjectIndexPage, 'id' | 'title'>
  & { projects: Array<(
    { __typename?: 'ProjectPage' }
    & ProjectPage_SummaryFragment
  )> }
);

export type ProjectPageFragment = (
  { __typename?: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'id' | 'title' | 'summary' | 'body' | 'is_active' | 'activity_summary'>
  & { image: (
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'url'>
  ), upcoming_events: Array<(
    { __typename?: 'Event' }
    & EventsPublicEvent_SummaryFragment
  )> }
);

export const ProjectPage_SummaryFragmentDoc = gql`
    fragment ProjectPage_summary on ProjectPage {
  id
  meta {
    slug
  }
  title
  summary
  activity_summary
  is_active
  image(spec: "fill-500x300") {
    url
    width
    height
  }
}
    `;
export const ProjectIndexPageFragmentDoc = gql`
    fragment ProjectIndexPage on ProjectIndexPage {
  id
  title
  projects {
    ...ProjectPage_summary
  }
}
    ${ProjectPage_SummaryFragmentDoc}`;
export const ProjectPageFragmentDoc = gql`
    fragment ProjectPage on ProjectPage {
  id
  title
  summary
  body
  is_active
  activity_summary
  image(spec: "fill-1080x400") {
    url
  }
  upcoming_events {
    ...EventsPublicEvent_Summary
  }
}
    ${EventsPublicEvent_SummaryFragmentDoc}`;