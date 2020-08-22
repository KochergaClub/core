import * as Types from '../../apollo/types.generated';

import { Event_SummaryFragment } from '../../events/queries.generated';
import gql from 'graphql-tag';
import { Event_SummaryFragmentDoc } from '../../events/queries.generated';

export type GreyBlockFragment = (
  { __typename: 'GreyBlock' }
  & Pick<Types.GreyBlock, 'id'>
  & { grey_value: (
    { __typename: 'GreyBlockValue' }
    & Pick<Types.GreyBlockValue, 'header' | 'text'>
  ) }
);

export type BasicLeadBlockFragment = (
  { __typename: 'BasicLeadBlock' }
  & Pick<Types.BasicLeadBlock, 'id' | 'value'>
);

export type BasicParagraphBlockFragment = (
  { __typename: 'BasicParagraphBlock' }
  & Pick<Types.BasicParagraphBlock, 'id' | 'value'>
);

export type BasicTextBlockFragment = (
  { __typename: 'BasicTextBlock' }
  & Pick<Types.BasicTextBlock, 'id'>
  & { basic_text: (
    { __typename: 'BasicTextBlockValue' }
    & Pick<Types.BasicTextBlockValue, 'text' | 'centered'>
  ) }
);

export type ColumnsBasicBlockFragment = (
  { __typename: 'ColumnsBasicBlock' }
  & Pick<Types.ColumnsBasicBlock, 'id'>
  & { basic_columns: Array<(
    { __typename: 'ColumnsBasicBlockValue' }
    & Pick<Types.ColumnsBasicBlockValue, 'header' | 'text'>
  )> }
);

export type ColumnsButtonsBlockFragment = (
  { __typename: 'ColumnsButtonsBlock' }
  & Pick<Types.ColumnsButtonsBlock, 'id'>
  & { button_columns: Array<(
    { __typename: 'ColumnsButtonsBlockValue' }
    & Pick<Types.ColumnsButtonsBlockValue, 'title' | 'text' | 'caption' | 'link'>
    & { image: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'url'>
    ) }
  )> }
);

export type EventsListBlockFragment = (
  { __typename: 'EventsListBlock' }
  & Pick<Types.EventsListBlock, 'id'>
  & { events: Array<(
    { __typename: 'Event' }
    & Event_SummaryFragment
  )> }
);

export type BigContactsBlockFragment = (
  { __typename: 'BigContactsBlock' }
  & Pick<Types.BigContactsBlock, 'id'>
  & { contacts: (
    { __typename: 'BigContactsBlockValue' }
    & Pick<Types.BigContactsBlockValue, 'address' | 'phone' | 'email' | 'text'>
    & { map: (
      { __typename: 'WagtailGeo' }
      & Pick<Types.WagtailGeo, 'lat' | 'lng'>
    ) }
  ) }
);

export type PhotoRibbonBlockFragment = (
  { __typename: 'PhotoRibbonBlock' }
  & Pick<Types.PhotoRibbonBlock, 'id'>
  & { photos: Array<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )> }
);

export type MailchimpSubscribeBlockFragment = (
  { __typename: 'MailchimpSubscribeBlock' }
  & Pick<Types.MailchimpSubscribeBlock, 'id'>
  & { mailchimp: (
    { __typename: 'MailchimpSubscribeBlockValue' }
    & Pick<Types.MailchimpSubscribeBlockValue, 'news' | 'events' | 'trainings'>
  ) }
);

export type HeroFrontBlockFragment = (
  { __typename: 'HeroFrontBlock' }
  & Pick<Types.HeroFrontBlock, 'id'>
  & { hero: (
    { __typename: 'HeroFrontBlockValue' }
    & Pick<Types.HeroFrontBlockValue, 'title'>
    & { buttons: Array<(
      { __typename: 'HeroFrontBlock_buttonsValue' }
      & Pick<Types.HeroFrontBlock_ButtonsValue, 'title' | 'link'>
    )> }
  ) }
);

export type HrBlockFragment = (
  { __typename: 'HrBlock' }
  & Pick<Types.HrBlock, 'id'>
);

export type FrontPartnersBlockFragment = (
  { __typename: 'FrontPartnersBlock' }
  & Pick<Types.FrontPartnersBlock, 'id'>
  & { partners: Array<(
    { __typename: 'FrontPartnersBlockValue' }
    & Pick<Types.FrontPartnersBlockValue, 'link'>
    & { image: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'url'>
    ), image_x2: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'url'>
    ) }
  )> }
);

export type FrontSocialLinksBlockFragment = (
  { __typename: 'FrontSocialLinksBlock' }
  & Pick<Types.FrontSocialLinksBlock, 'id'>
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
export const BasicTextBlockFragmentDoc = gql`
    fragment BasicTextBlock on BasicTextBlock {
  id
  basic_text: value {
    text
    centered
  }
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
export const ColumnsButtonsBlockFragmentDoc = gql`
    fragment ColumnsButtonsBlock on ColumnsButtonsBlock {
  id
  button_columns: value {
    title
    text
    image(spec: "original") {
      url
    }
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
    buttons {
      title
      link
    }
  }
}
    `;
export const HrBlockFragmentDoc = gql`
    fragment HrBlock on HrBlock {
  id
}
    `;
export const FrontPartnersBlockFragmentDoc = gql`
    fragment FrontPartnersBlock on FrontPartnersBlock {
  id
  partners: value {
    link
    image(spec: "width-160") {
      url
    }
    image_x2: image(spec: "width-320") {
      url
    }
  }
}
    `;
export const FrontSocialLinksBlockFragmentDoc = gql`
    fragment FrontSocialLinksBlock on FrontSocialLinksBlock {
  id
}
    `;