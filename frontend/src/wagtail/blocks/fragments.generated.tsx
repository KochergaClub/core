import * as Types from '../../apollo/types.generated';

import { Event_SummaryFragment } from '../../events/queries.generated';
import gql from 'graphql-tag';
import { Event_SummaryFragmentDoc } from '../../events/queries.generated';

export type GreyBlockFragment = (
  { __typename?: 'GreyBlock' }
  & Pick<Types.GreyBlock, 'id'>
  & { grey_value: (
    { __typename?: 'GreyBlockValue' }
    & Pick<Types.GreyBlockValue, 'header' | 'text'>
  ) }
);

export type BasicLeadBlockFragment = (
  { __typename?: 'BasicLeadBlock' }
  & Pick<Types.BasicLeadBlock, 'id' | 'value'>
);

export type BasicParagraphBlockFragment = (
  { __typename?: 'BasicParagraphBlock' }
  & Pick<Types.BasicParagraphBlock, 'id' | 'value'>
);

export type ColumnsBasicBlockFragment = (
  { __typename?: 'ColumnsBasicBlock' }
  & Pick<Types.ColumnsBasicBlock, 'id'>
  & { basic_columns: Array<(
    { __typename?: 'ColumnsBasicBlockValue' }
    & Pick<Types.ColumnsBasicBlockValue, 'header' | 'text'>
  )> }
);

export type ColumnsMembershipsBlockFragment = (
  { __typename?: 'ColumnsMembershipsBlock' }
  & Pick<Types.ColumnsMembershipsBlock, 'id'>
  & { membership_columns: Array<(
    { __typename?: 'ColumnsMembershipsBlockValue' }
    & Pick<Types.ColumnsMembershipsBlockValue, 'title' | 'subtitle' | 'price' | 'description'>
  )> }
);

export type ColumnsButtonsBlockFragment = (
  { __typename?: 'ColumnsButtonsBlock' }
  & Pick<Types.ColumnsButtonsBlock, 'id'>
  & { button_columns: Array<(
    { __typename?: 'ColumnsButtonsBlockValue' }
    & Pick<Types.ColumnsButtonsBlockValue, 'title' | 'caption' | 'link'>
  )> }
);

export type EventsListBlockFragment = (
  { __typename?: 'EventsListBlock' }
  & Pick<Types.EventsListBlock, 'id'>
  & { events: Array<(
    { __typename?: 'Event' }
    & Event_SummaryFragment
  )> }
);

export type BigContactsBlockFragment = (
  { __typename?: 'BigContactsBlock' }
  & Pick<Types.BigContactsBlock, 'id'>
  & { contacts: (
    { __typename?: 'BigContactsBlockValue' }
    & Pick<Types.BigContactsBlockValue, 'address' | 'phone' | 'email' | 'text'>
    & { map: (
      { __typename?: 'WagtailGeo' }
      & Pick<Types.WagtailGeo, 'lat' | 'lng'>
    ) }
  ) }
);

export type PhotoRibbonBlockFragment = (
  { __typename?: 'PhotoRibbonBlock' }
  & Pick<Types.PhotoRibbonBlock, 'id'>
  & { photos: Array<(
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )> }
);

export type MailchimpSubscribeBlockFragment = (
  { __typename?: 'MailchimpSubscribeBlock' }
  & Pick<Types.MailchimpSubscribeBlock, 'id'>
  & { mailchimp: (
    { __typename?: 'MailchimpSubscribeBlockValue' }
    & Pick<Types.MailchimpSubscribeBlockValue, 'news' | 'events' | 'trainings'>
  ) }
);

export type HeroFrontBlockFragment = (
  { __typename?: 'HeroFrontBlock' }
  & Pick<Types.HeroFrontBlock, 'id'>
  & { hero: (
    { __typename?: 'HeroFrontBlockValue' }
    & Pick<Types.HeroFrontBlockValue, 'title'>
    & { features: Array<(
      { __typename?: 'HeroFrontBlock_featuresValue' }
      & Pick<Types.HeroFrontBlock_FeaturesValue, 'title' | 'link'>
      & { items: Array<(
        { __typename?: 'HeroFrontBlock_features_itemsValue' }
        & Pick<Types.HeroFrontBlock_Features_ItemsValue, 'text' | 'link'>
      )> }
    )> }
  ) }
);

export const GreyBlockFragmentDoc = gql`
    fragment GreyBlock on GreyBlock {
  id
  grey_value: value {
    header
    text
  }
}
    `;
export const BasicLeadBlockFragmentDoc = gql`
    fragment BasicLeadBlock on BasicLeadBlock {
  id
  value
}
    `;
export const BasicParagraphBlockFragmentDoc = gql`
    fragment BasicParagraphBlock on BasicParagraphBlock {
  id
  value
}
    `;
export const ColumnsBasicBlockFragmentDoc = gql`
    fragment ColumnsBasicBlock on ColumnsBasicBlock {
  id
  basic_columns: value {
    header
    text
  }
}
    `;
export const ColumnsMembershipsBlockFragmentDoc = gql`
    fragment ColumnsMembershipsBlock on ColumnsMembershipsBlock {
  id
  membership_columns: value {
    title
    subtitle
    price
    description
  }
}
    `;
export const ColumnsButtonsBlockFragmentDoc = gql`
    fragment ColumnsButtonsBlock on ColumnsButtonsBlock {
  id
  button_columns: value {
    title
    caption
    link
  }
}
    `;
export const EventsListBlockFragmentDoc = gql`
    fragment EventsListBlock on EventsListBlock {
  id
  events {
    ...Event_Summary
  }
}
    ${Event_SummaryFragmentDoc}`;
export const BigContactsBlockFragmentDoc = gql`
    fragment BigContactsBlock on BigContactsBlock {
  id
  contacts: value {
    map {
      lat
      lng
    }
    address
    phone
    email
    text
  }
}
    `;
export const PhotoRibbonBlockFragmentDoc = gql`
    fragment PhotoRibbonBlock on PhotoRibbonBlock {
  id
  photos: value(spec: "min-400x320") {
    id
    url
  }
}
    `;
export const MailchimpSubscribeBlockFragmentDoc = gql`
    fragment MailchimpSubscribeBlock on MailchimpSubscribeBlock {
  id
  mailchimp: value {
    news
    events
    trainings
  }
}
    `;
export const HeroFrontBlockFragmentDoc = gql`
    fragment HeroFrontBlock on HeroFrontBlock {
  id
  hero: value {
    title
    features {
      title
      link
      items {
        text
        link
      }
    }
  }
}
    `;