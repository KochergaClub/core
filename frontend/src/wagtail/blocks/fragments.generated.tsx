import * as Types from '../../apollo/gen-types';

import gql from 'graphql-tag';

export type GreyBlockFragment = (
  { __typename?: 'GreyBlock' }
  & { grey_value: (
    { __typename?: 'GreyBlockValue' }
    & Pick<Types.GreyBlockValue, 'header' | 'text'>
  ) }
);

export type BasicLeadBlockFragment = (
  { __typename?: 'BasicLeadBlock' }
  & Pick<Types.BasicLeadBlock, 'value'>
);

export type BasicParagraphBlockFragment = (
  { __typename?: 'BasicParagraphBlock' }
  & Pick<Types.BasicParagraphBlock, 'value'>
);

export type ColumnsBasicBlockFragment = (
  { __typename?: 'ColumnsBasicBlock' }
  & { basic_columns: Array<(
    { __typename?: 'ColumnsBasicBlockColumn' }
    & Pick<Types.ColumnsBasicBlockColumn, 'header' | 'text'>
  )> }
);

export type ColumnsMembershipsBlockFragment = (
  { __typename?: 'ColumnsMembershipsBlock' }
  & { membership_columns: Array<(
    { __typename?: 'ColumnsMembershipsBlockColumn' }
    & Pick<Types.ColumnsMembershipsBlockColumn, 'title' | 'subtitle' | 'price' | 'description'>
  )> }
);

export type ColumnsButtonsBlockFragment = (
  { __typename?: 'ColumnsButtonsBlock' }
  & { button_columns: Array<(
    { __typename?: 'ColumnsButtonsBlockColumn' }
    & Pick<Types.ColumnsButtonsBlockColumn, 'title' | 'caption' | 'link'>
  )> }
);

export type EventsListBlockFragment = (
  { __typename?: 'EventsListBlock' }
  & Pick<Types.EventsListBlock, 'id'>
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
    { __typename?: 'WagtailImage' }
    & Pick<Types.WagtailImage, 'url'>
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
      { __typename?: 'HeroFrontBlockFeature' }
      & Pick<Types.HeroFrontBlockFeature, 'title' | 'link'>
      & { items: Array<(
        { __typename?: 'HeroFrontBlockItem' }
        & Pick<Types.HeroFrontBlockItem, 'text' | 'link'>
      )> }
    )> }
  ) }
);

export const GreyBlockFragmentDoc = gql`
    fragment GreyBlock on GreyBlock {
  grey_value: value {
    header
    text
  }
}
    `;
export const BasicLeadBlockFragmentDoc = gql`
    fragment BasicLeadBlock on BasicLeadBlock {
  value
}
    `;
export const BasicParagraphBlockFragmentDoc = gql`
    fragment BasicParagraphBlock on BasicParagraphBlock {
  value
}
    `;
export const ColumnsBasicBlockFragmentDoc = gql`
    fragment ColumnsBasicBlock on ColumnsBasicBlock {
  basic_columns: value {
    header
    text
  }
}
    `;
export const ColumnsMembershipsBlockFragmentDoc = gql`
    fragment ColumnsMembershipsBlock on ColumnsMembershipsBlock {
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
}
    `;
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