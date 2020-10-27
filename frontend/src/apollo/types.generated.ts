export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AnalyticsBovStat = {
  __typename?: 'AnalyticsBovStat';
  date: Scalars['String'];
  count: Scalars['Int'];
  total_income: Scalars['Int'];
};

/**
 * Describes the current user.
 * 
 * If user is not signed in, `is_authenticated` field will be false and all other fields will be empty.
 */
export type AuthCurrentUser = {
  __typename?: 'AuthCurrentUser';
  id: Scalars['ID'];
  is_authenticated: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  is_staff?: Maybe<Scalars['Boolean']>;
  permissions: Array<Scalars['String']>;
};

export type AuthGroup = {
  __typename?: 'AuthGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<AuthPermission>;
  users: Array<AuthUser>;
};

export type AuthLoginCredentialsInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type AuthLoginInput = {
  credentials: AuthLoginCredentialsInput;
  result: Scalars['String'];
};

export type AuthLoginResult = {
  __typename?: 'AuthLoginResult';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<AuthCurrentUser>;
  registered?: Maybe<Scalars['Boolean']>;
};

export type AuthLogoutResult = {
  __typename?: 'AuthLogoutResult';
  ok?: Maybe<Scalars['Boolean']>;
};

export type AuthPermission = {
  __typename?: 'AuthPermission';
  id: Scalars['ID'];
  name: Scalars['String'];
  users: Array<AuthUser>;
};

export type AuthSendMagicLinkInput = {
  email: Scalars['String'];
  next?: Maybe<Scalars['String']>;
};

export type AuthSendMagicLinkResult = {
  __typename?: 'AuthSendMagicLinkResult';
  ok?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type AuthSetMyNamesInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type AuthSetMyNamesResult = {
  __typename?: 'AuthSetMyNamesResult';
  error?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AuthSetPasswordInput = {
  old_password?: Maybe<Scalars['String']>;
  new_password: Scalars['String'];
};

export type AuthSetPasswordResult = {
  __typename?: 'AuthSetPasswordResult';
  error?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  id: Scalars['ID'];
  email: Scalars['String'];
  staff_member?: Maybe<StaffMember>;
  external_accounts: Array<ExternalServiceAccount>;
};

export type BasicCardBlock = WagtailBlock & {
  __typename?: 'BasicCardBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type BasicLeadBlock = WagtailBlock & {
  __typename?: 'BasicLeadBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type BasicResult = {
  __typename?: 'BasicResult';
  ok?: Maybe<Scalars['Boolean']>;
};

export type BasicTextBlock = WagtailBlock & {
  __typename?: 'BasicTextBlock';
  id: Scalars['ID'];
  value: BasicTextBlockValue;
};

export type BasicTextBlockValue = {
  __typename?: 'BasicTextBlockValue';
  text: Scalars['String'];
  centered: Scalars['Boolean'];
};

export type BigContactsBlock = WagtailBlock & {
  __typename?: 'BigContactsBlock';
  id: Scalars['ID'];
  value: BigContactsBlockValue;
};

export type BigContactsBlockValue = {
  __typename?: 'BigContactsBlockValue';
  map: WagtailGeo;
  address: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  text: Scalars['String'];
};

export type BlogIndexPage = WagtailPage & {
  __typename?: 'BlogIndexPage';
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
  subtitle: Scalars['String'];
  posts: Array<BlogPostPage>;
};

export type BlogPostAuthor = {
  __typename?: 'BlogPostAuthor';
  name: Scalars['String'];
  description: Scalars['String'];
  image: WagtailImageRendition;
};


export type BlogPostAuthorImageArgs = {
  spec: Scalars['String'];
};

export type BlogPostPage = WagtailPage & {
  __typename?: 'BlogPostPage';
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
  date: Scalars['String'];
  summary: Scalars['String'];
  body: Scalars['String'];
  authors: Array<BlogPostAuthor>;
};

export type CashierCreatePaymentInput = {
  amount: Scalars['Int'];
  whom: Scalars['ID'];
  comment: Scalars['String'];
};

export type CashierPayment = {
  __typename?: 'CashierPayment';
  id: Scalars['ID'];
  amount: Scalars['Int'];
  created_dt: Scalars['String'];
  redeem_dt?: Maybe<Scalars['String']>;
  comment: Scalars['String'];
  is_redeemed: Scalars['Boolean'];
  whom: AuthUser;
};

export type CashierPaymentConnection = {
  __typename?: 'CashierPaymentConnection';
  pageInfo: PageInfo;
  nodes: Array<CashierPayment>;
  edges: Array<CashierPaymentEdge>;
};

export type CashierPaymentEdge = {
  __typename?: 'CashierPaymentEdge';
  node: CashierPayment;
};

export type Cm2CreateCustomerInput = {
  card_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type Cm2CreateOrderInput = {
  customer?: Maybe<Scalars['ID']>;
};

export type Cm2Customer = {
  __typename?: 'Cm2Customer';
  id: Scalars['ID'];
  card_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  orders: Cm2OrderConnection;
};


export type Cm2CustomerOrdersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Cm2CustomerConnection = {
  __typename?: 'Cm2CustomerConnection';
  pageInfo: PageInfo;
  nodes: Array<Cm2Customer>;
  edges: Array<Cm2CustomerEdge>;
};

export type Cm2CustomerEdge = {
  __typename?: 'Cm2CustomerEdge';
  node: Cm2Customer;
};

export type Cm2Order = {
  __typename?: 'Cm2Order';
  id: Scalars['ID'];
  start: Scalars['String'];
  end?: Maybe<Scalars['String']>;
  customer?: Maybe<Cm2Customer>;
  value: Scalars['Int'];
};

export type Cm2OrderConnection = {
  __typename?: 'Cm2OrderConnection';
  pageInfo: PageInfo;
  nodes: Array<Cm2Order>;
  edges: Array<Cm2OrderEdge>;
};

export type Cm2OrderEdge = {
  __typename?: 'Cm2OrderEdge';
  node: Cm2Order;
};

export type ColumnsBasicBlock = WagtailBlock & {
  __typename?: 'ColumnsBasicBlock';
  id: Scalars['ID'];
  value: Array<ColumnsBasicBlockValue>;
};

export type ColumnsBasicBlockValue = {
  __typename?: 'ColumnsBasicBlockValue';
  header: Scalars['String'];
  text: Scalars['String'];
};

export type ColumnsButtonsBlock = WagtailBlock & {
  __typename?: 'ColumnsButtonsBlock';
  id: Scalars['ID'];
  value: Array<ColumnsButtonsBlockValue>;
};

export type ColumnsButtonsBlockValue = {
  __typename?: 'ColumnsButtonsBlockValue';
  title: Scalars['String'];
  text: Scalars['String'];
  image: WagtailImageRendition;
  caption: Scalars['String'];
  link: Scalars['String'];
};


export type ColumnsButtonsBlockValueImageArgs = {
  spec: Scalars['String'];
};

export type CreateRatioTicketTypeInput = {
  training_id: Scalars['ID'];
  price: Scalars['Int'];
  name: Scalars['String'];
};

export type DeleteRatioTicketTypeInput = {
  id: Scalars['ID'];
};

export type EmailMailchimpCategory = {
  __typename?: 'EmailMailchimpCategory';
  id: Scalars['ID'];
  title: Scalars['String'];
  category_id: Scalars['String'];
  interests: Array<EmailMailchimpInterest>;
};

export type EmailMailchimpInterest = {
  __typename?: 'EmailMailchimpInterest';
  id: Scalars['ID'];
  interest_id: Scalars['String'];
  name: Scalars['String'];
  subscriber_count: Scalars['Int'];
  category: EmailMailchimpCategory;
};

export type EmailSubscribeChannel = {
  __typename?: 'EmailSubscribeChannel';
  id: Scalars['ID'];
  slug: Scalars['String'];
  interests: Array<EmailMailchimpInterest>;
  log: EmailSubscribeChannelLogConnection;
};


export type EmailSubscribeChannelLogArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type EmailSubscribeChannelCreateInput = {
  slug: Scalars['String'];
  interest_ids: Array<Scalars['ID']>;
};

export type EmailSubscribeChannelLog = {
  __typename?: 'EmailSubscribeChannelLog';
  id: Scalars['ID'];
  dt: Scalars['String'];
  email: Scalars['String'];
};

export type EmailSubscribeChannelLogConnection = {
  __typename?: 'EmailSubscribeChannelLogConnection';
  pageInfo: PageInfo;
  nodes: Array<EmailSubscribeChannelLog>;
  edges: Array<EmailSubscribeChannelLogEdge>;
};

export type EmailSubscribeChannelLogEdge = {
  __typename?: 'EmailSubscribeChannelLogEdge';
  node: EmailSubscribeChannelLog;
};

export type Event = {
  __typename?: 'Event';
  start: Scalars['String'];
  end: Scalars['String'];
  title: Scalars['String'];
  summary: Scalars['String'];
  registration_type: Scalars['String'];
  pricing_type: Scalars['String'];
  realm: Scalars['String'];
  published: Scalars['Boolean'];
  event_type: Scalars['String'];
  id: Scalars['ID'];
  event_id: Scalars['ID'];
  description: Scalars['String'];
  image?: Maybe<WagtailImageRendition>;
  project?: Maybe<ProjectPage>;
  public_tags: Array<Scalars['String']>;
  announcements: EventsAnnouncements;
  my_ticket?: Maybe<MyEventsTicket>;
  tags: Array<Scalars['String']>;
  public_google_event?: Maybe<EventsGoogleEvent>;
  zoom_meeting?: Maybe<ZoomMeeting>;
  prototype?: Maybe<EventsPrototype>;
  visitors?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  created: Scalars['String'];
  updated: Scalars['String'];
  location: Scalars['String'];
  room: Scalars['String'];
  zoom_link: Scalars['String'];
  timing_description_override: Scalars['String'];
  tickets: Array<EventsTicket>;
  feedbacks: Array<EventsFeedback>;
};


export type EventDescriptionArgs = {
  format?: Maybe<EventsMarkupFormat>;
};


export type EventImageArgs = {
  spec: Scalars['String'];
};

export type EventAddTagInput = {
  event_id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventAnnounceInput = {
  event_id: Scalars['ID'];
  target: EventAnnounceTarget;
};

export enum EventAnnounceTarget {
  Vk = 'VK',
  Fb = 'FB',
  Timepad = 'TIMEPAD'
}

export type EventConnection = {
  __typename?: 'EventConnection';
  pageInfo: PageInfo;
  nodes: Array<Event>;
  edges: Array<EventEdge>;
};

export type EventCreateInput = {
  start: Scalars['String'];
  end: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type EventCreateResult = {
  __typename?: 'EventCreateResult';
  ok?: Maybe<Scalars['Boolean']>;
  event: Event;
};

export type EventDeleteInput = {
  event_id: Scalars['ID'];
};

export type EventDeleteTagInput = {
  event_id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  node: Event;
};

export type EventGenerateOpenViduTokenInput = {
  event_id: Scalars['ID'];
};

export type EventGenerateOpenViduTokenResult = {
  __typename?: 'EventGenerateOpenViduTokenResult';
  token: Scalars['String'];
};

export type EventGenerateZoomLinkInput = {
  event_id: Scalars['ID'];
};

export type EventMoveInput = {
  event_id: Scalars['ID'];
  start: Scalars['String'];
};

export type EventNotification = {
  __typename?: 'EventNotification';
  type: Scalars['String'];
  id: Scalars['ID'];
};

export type EventPrototypeAddTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventPrototypeCancelDateInput = {
  id: Scalars['ID'];
  date: Scalars['String'];
};

export type EventPrototypeCreateInput = {
  title: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timing_description_override?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  weekday: Scalars['Int'];
  hour: Scalars['Int'];
  minute: Scalars['Int'];
  length: Scalars['Int'];
  project_slug?: Maybe<Scalars['String']>;
  vk_group_name?: Maybe<Scalars['String']>;
  timepad_category_code?: Maybe<Scalars['String']>;
};

export type EventPrototypeDeleteTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventPrototypeNewEventInput = {
  id: Scalars['ID'];
  ts: Scalars['Int'];
};

export type EventPrototypeSetImageInput = {
  id: Scalars['ID'];
  image_id: Scalars['ID'];
};

export type EventPrototypeUpdateInput = {
  id: Scalars['ID'];
  active?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timing_description_override?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  weekday?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  project_slug?: Maybe<Scalars['String']>;
  vk_group_name?: Maybe<Scalars['String']>;
  timepad_category_code?: Maybe<Scalars['String']>;
};

export type EventPrototypeUpdateResult = {
  __typename?: 'EventPrototypeUpdateResult';
  ok: Scalars['Boolean'];
  prototype: EventsPrototype;
};

export type EventSearchItem = {
  __typename?: 'EventSearchItem';
  event: Event;
};

export type EventSetAnnounceUrlInput = {
  event_id: Scalars['ID'];
  target: EventAnnounceTarget;
  url: Scalars['String'];
};

export type EventSetEventTypeInput = {
  event_id: Scalars['ID'];
  event_type: Scalars['String'];
};

export type EventSetImageFromUrlInput = {
  event_id: Scalars['ID'];
  url: Scalars['String'];
};

export type EventSetPricingTypeInput = {
  event_id: Scalars['ID'];
  pricing_type: Scalars['String'];
};

export type EventSetRealmInput = {
  event_id: Scalars['ID'];
  realm: Scalars['String'];
};

export type EventSetZoomLinkInput = {
  event_id: Scalars['ID'];
  zoom_link: Scalars['String'];
};

export type EventTimepadAnnouncementUpdateInput = {
  event_id: Scalars['ID'];
  prepaid_tickets?: Maybe<Scalars['Boolean']>;
  category_code?: Maybe<Scalars['String']>;
};

export type EventUpdateInput = {
  event_id: Scalars['ID'];
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  visitors?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  event_type?: Maybe<Scalars['String']>;
  registration_type?: Maybe<Scalars['String']>;
  pricing_type?: Maybe<Scalars['String']>;
  realm?: Maybe<Scalars['String']>;
  timing_description_override?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  zoom_link?: Maybe<Scalars['String']>;
  prototype_id?: Maybe<Scalars['ID']>;
  project_slug?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['ID']>;
};

export type EventUpdateResult = {
  __typename?: 'EventUpdateResult';
  ok?: Maybe<Scalars['Boolean']>;
  event: Event;
};

export type EventVkAnnouncementSetImageInput = {
  event_id: Scalars['ID'];
  image_id: Scalars['ID'];
};

export type EventVkAnnouncementUpdateInput = {
  event_id: Scalars['ID'];
  group?: Maybe<Scalars['String']>;
};

export type EventsAnnouncementFb = {
  __typename?: 'EventsAnnouncementFb';
  link: Scalars['String'];
  group: Scalars['String'];
};

export type EventsAnnouncementTimepad = {
  __typename?: 'EventsAnnouncementTimepad';
  link: Scalars['String'];
  category_code: Scalars['String'];
  prepaid_tickets: Scalars['Boolean'];
};

export type EventsAnnouncementVk = {
  __typename?: 'EventsAnnouncementVk';
  link: Scalars['String'];
  group: Scalars['String'];
  image?: Maybe<WagtailImageRendition>;
};


export type EventsAnnouncementVkImageArgs = {
  spec: Scalars['String'];
};

export type EventsAnnouncements = {
  __typename?: 'EventsAnnouncements';
  timepad: EventsAnnouncementTimepad;
  vk: EventsAnnouncementVk;
  fb: EventsAnnouncementFb;
};

export type EventsFeedback = {
  __typename?: 'EventsFeedback';
  id: Scalars['ID'];
  overall_score?: Maybe<Scalars['Int']>;
  recommend_score?: Maybe<Scalars['Int']>;
  content_score?: Maybe<Scalars['Int']>;
  conductor_score?: Maybe<Scalars['Int']>;
  source_friend: Scalars['Boolean'];
  source_vk: Scalars['Boolean'];
  source_fb: Scalars['Boolean'];
  source_timepad: Scalars['Boolean'];
  source_email: Scalars['Boolean'];
  source_website: Scalars['Boolean'];
  custom_source?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};

export type EventsFeedbackCreateInput = {
  event_id: Scalars['ID'];
  overall_score?: Maybe<Scalars['Int']>;
  recommend_score?: Maybe<Scalars['Int']>;
  content_score?: Maybe<Scalars['Int']>;
  conductor_score?: Maybe<Scalars['Int']>;
  source_friend: Scalars['Boolean'];
  source_vk: Scalars['Boolean'];
  source_fb: Scalars['Boolean'];
  source_timepad: Scalars['Boolean'];
  source_email: Scalars['Boolean'];
  source_website: Scalars['Boolean'];
  custom_source?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};

export type EventsFeedbackCreateResult = {
  __typename?: 'EventsFeedbackCreateResult';
  ok?: Maybe<Scalars['Boolean']>;
  feedback: EventsFeedback;
};

export type EventsFeedbackDeleteInput = {
  id: Scalars['ID'];
};

export type EventsFilterInput = {
  event_type?: Maybe<Scalars['String']>;
};

export type EventsGoogleCalendar = {
  __typename?: 'EventsGoogleCalendar';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type EventsGoogleEvent = {
  __typename?: 'EventsGoogleEvent';
  google_id: Scalars['String'];
  html_link: Scalars['String'];
  id: Scalars['ID'];
};

export type EventsListBlock = WagtailBlock & {
  __typename?: 'EventsListBlock';
  id: Scalars['ID'];
  events: Array<Event>;
};

export enum EventsMarkupFormat {
  Source = 'SOURCE',
  Plain = 'PLAIN'
}

export type EventsPrototype = {
  __typename?: 'EventsPrototype';
  id: Scalars['ID'];
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  timing_description_override: Scalars['String'];
  active: Scalars['Boolean'];
  weekday: Scalars['Int'];
  hour: Scalars['Int'];
  minute: Scalars['Int'];
  length: Scalars['Int'];
  project?: Maybe<ProjectPage>;
  tags: Array<Scalars['String']>;
  image?: Maybe<WagtailImageRendition>;
  suggested_dates: Array<Scalars['String']>;
  instances: Array<Event>;
  vk_group?: Maybe<VkGroup>;
  timepad_category?: Maybe<TimepadCategory>;
};


export type EventsPrototypeImageArgs = {
  spec: Scalars['String'];
};


export type EventsPrototypeSuggested_DatesArgs = {
  until_ts?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type EventsPrototypeInstancesArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type EventsTicket = {
  __typename?: 'EventsTicket';
  id: Scalars['ID'];
  status: Scalars['String'];
  user: AuthUser;
};

export type EventsWeeklyDigest = {
  __typename?: 'EventsWeeklyDigest';
  id: Scalars['ID'];
  start: Scalars['String'];
  image?: Maybe<WagtailImageRendition>;
  mailchimp: EventsWeeklyDigestMailchimp;
  telegram: EventsWeeklyDigestTelegram;
  vk: EventsWeeklyDigestVk;
};


export type EventsWeeklyDigestImageArgs = {
  spec: Scalars['String'];
};

export type EventsWeeklyDigestMailchimp = {
  __typename?: 'EventsWeeklyDigestMailchimp';
  link?: Maybe<Scalars['String']>;
};

export type EventsWeeklyDigestPostMailchimpInput = {
  text?: Maybe<Scalars['String']>;
};

export type EventsWeeklyDigestTelegram = {
  __typename?: 'EventsWeeklyDigestTelegram';
  link?: Maybe<Scalars['String']>;
};

export type EventsWeeklyDigestUpdateResult = {
  __typename?: 'EventsWeeklyDigestUpdateResult';
  ok?: Maybe<Scalars['Boolean']>;
  digest: EventsWeeklyDigest;
};

export type EventsWeeklyDigestVk = {
  __typename?: 'EventsWeeklyDigestVk';
  link?: Maybe<Scalars['String']>;
};

export type ExternalService = {
  slug: Scalars['String'];
  accounts: Array<ExternalServiceAccount>;
};

export type ExternalServiceAccount = {
  service: ExternalService;
};

export type FaqEntry = {
  __typename?: 'FaqEntry';
  id: Scalars['ID'];
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type FaqPage = WagtailPage & {
  __typename?: 'FaqPage';
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
  summary: Scalars['String'];
  prev_page?: Maybe<FaqPage>;
  next_page?: Maybe<FaqPage>;
  entries: Array<FaqEntry>;
  subpages: Array<FaqPage>;
};

export type FolderPage = WagtailPage & {
  __typename?: 'FolderPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
};

export type FreeFormPage = WagtailPage & {
  __typename?: 'FreeFormPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  body: Array<WagtailBlock>;
};

export type FrontPartnersBlock = WagtailBlock & {
  __typename?: 'FrontPartnersBlock';
  id: Scalars['ID'];
  value: Array<FrontPartnersBlockValue>;
};

export type FrontPartnersBlockValue = {
  __typename?: 'FrontPartnersBlockValue';
  link: Scalars['String'];
  image: WagtailImageRendition;
};


export type FrontPartnersBlockValueImageArgs = {
  spec: Scalars['String'];
};

export type FrontSocialLinksBlock = WagtailBlock & {
  __typename?: 'FrontSocialLinksBlock';
  id: Scalars['ID'];
};

export type GenericError = {
  __typename?: 'GenericError';
  message: Scalars['String'];
};

export type GreyBlock = WagtailBlock & {
  __typename?: 'GreyBlock';
  id: Scalars['ID'];
  value: GreyBlockValue;
};

export type GreyBlockValue = {
  __typename?: 'GreyBlockValue';
  header: Scalars['String'];
  text: Scalars['String'];
};

export type HeroFrontBlock = WagtailBlock & {
  __typename?: 'HeroFrontBlock';
  id: Scalars['ID'];
  value: HeroFrontBlockValue;
};

export type HeroFrontBlockValue = {
  __typename?: 'HeroFrontBlockValue';
  title: Scalars['String'];
  buttons: Array<HeroFrontBlock_ButtonsValue>;
};

export type HeroFrontBlock_ButtonsValue = {
  __typename?: 'HeroFrontBlock_buttonsValue';
  title: Scalars['String'];
  link: Scalars['String'];
  highlight: Scalars['Boolean'];
};

export type HrBlock = WagtailBlock & {
  __typename?: 'HrBlock';
  id: Scalars['ID'];
};

export type ImageTemplate = {
  __typename?: 'ImageTemplate';
  name: Scalars['ID'];
  schema: ImageTemplateSchema;
  sizes: ImageTemplateSizes;
};

export type ImageTemplateSchema = {
  __typename?: 'ImageTemplateSchema';
  fields: Array<ImageTemplateSchemaField>;
};

export type ImageTemplateSchemaField = {
  __typename?: 'ImageTemplateSchemaField';
  name: Scalars['String'];
  value_type: Scalars['String'];
  default?: Maybe<Scalars['String']>;
};

export type ImageTemplateSizes = {
  __typename?: 'ImageTemplateSizes';
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type Importer = {
  __typename?: 'Importer';
  name: Scalars['ID'];
};

export type KkmRegisterCheckInput = {
  email: Scalars['String'];
  title: Scalars['String'];
  sum: Scalars['Int'];
  sign_method_calculation: Scalars['Int'];
};

export type KkmRegisterCheckResult = {
  __typename?: 'KkmRegisterCheckResult';
  status: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type MailchimpSubscribeBlock = WagtailBlock & {
  __typename?: 'MailchimpSubscribeBlock';
  id: Scalars['ID'];
  value: MailchimpSubscribeBlockValue;
};

export type MailchimpSubscribeBlockValue = {
  __typename?: 'MailchimpSubscribeBlockValue';
  news: Scalars['Boolean'];
  events: Scalars['Boolean'];
  trainings: Scalars['Boolean'];
};

export type MastermindDatingCohort = {
  __typename?: 'MastermindDatingCohort';
  id: Scalars['ID'];
  leader_telegram_uid: Scalars['String'];
  event?: Maybe<Event>;
  participants: Array<MastermindDatingParticipant>;
  groups: Array<MastermindDatingGroup>;
};

export type MastermindDatingCohortMutationResult = {
  __typename?: 'MastermindDatingCohortMutationResult';
  cohort: MastermindDatingCohort;
};

export type MastermindDatingGroup = {
  __typename?: 'MastermindDatingGroup';
  id: Scalars['ID'];
  telegram_invite_link: Scalars['String'];
  participants: Array<MastermindDatingParticipant>;
};

export type MastermindDatingParticipant = {
  __typename?: 'MastermindDatingParticipant';
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  voted_for: Scalars['Boolean'];
  present: Scalars['Boolean'];
  invite_email_sent: Scalars['Boolean'];
  photo?: Maybe<Scalars['String']>;
  user: AuthUser;
  cohort: MastermindDatingCohort;
};

export type MastermindDatingParticipantMutationResult = {
  __typename?: 'MastermindDatingParticipantMutationResult';
  participant: MastermindDatingParticipant;
};

export type Mutation = {
  __typename?: 'Mutation';
  wagtailUploadImageFromUrl: WagtailUploadImageFromUrlResult;
  authAddUserToGroup: Scalars['Boolean'];
  authRemoveUserFromGroup: Scalars['Boolean'];
  authLogin: AuthLoginResult;
  authSetPassword: AuthSetPasswordResult;
  authLogout: AuthLogoutResult;
  authSendMagicLink: AuthSendMagicLinkResult;
  authSetMyNames: AuthSetMyNamesResult;
  zadarmaSetMemberForPbxCall: Scalars['Boolean'];
  fbMarketingAudienceUploadRatioTickets: BasicResult;
  myPrivacyModeSet?: Maybe<Scalars['Boolean']>;
  cm2CreateOrder: Cm2Order;
  cm2CreateCustomer: Cm2Customer;
  cm2CloseOrder: Scalars['Boolean'];
  watchmenCreateWatchman: Scalars['Boolean'];
  watchmenUpdateShift: WatchmenShift;
  watchmenSetWatchmanPriority: Scalars['Boolean'];
  watchmenSetWatchmanGrade: Scalars['Boolean'];
  cashierCreatePayment?: Maybe<Scalars['Boolean']>;
  cashierRedeemPayment?: Maybe<Scalars['Boolean']>;
  kkmRegisterCheck: KkmRegisterCheckResult;
  myEventsTicketUnregister: MyEventsTicket;
  myEventsTicketRegister: MyEventsTicket;
  myEventsTicketRegisterAnon: MyEventsTicket;
  eventCreate: EventCreateResult;
  eventUpdate: EventUpdateResult;
  eventDelete: BasicResult;
  eventSetEventType: EventUpdateResult;
  eventSetRealm: EventUpdateResult;
  eventSetPricingType: EventUpdateResult;
  eventSetZoomLink: EventUpdateResult;
  eventGenerateZoomLink: EventUpdateResult;
  eventAddTag: EventUpdateResult;
  eventDeleteTag: EventUpdateResult;
  eventSetImageFromUrl: EventUpdateResult;
  eventMove: EventUpdateResult;
  eventGenerateOpenViduToken: EventGenerateOpenViduTokenResult;
  eventPrototypeCreate: EventPrototypeUpdateResult;
  eventPrototypeUpdate: EventPrototypeUpdateResult;
  eventPrototypeCancelDate: BasicResult;
  eventPrototypeNewEvent: BasicResult;
  eventPrototypeAddTag: EventPrototypeUpdateResult;
  eventPrototypeDeleteTag: EventPrototypeUpdateResult;
  eventPrototypeSetImage: EventPrototypeUpdateResult;
  eventsWeeklyDigestPostVk: EventsWeeklyDigestUpdateResult;
  eventsWeeklyDigestPostTelegram: EventsWeeklyDigestUpdateResult;
  eventsWeeklyDigestPostMailchimp: EventsWeeklyDigestUpdateResult;
  vkWikiScheduleUpdate?: Maybe<BasicResult>;
  eventTimepadAnnouncementUpdate?: Maybe<EventUpdateResult>;
  eventVkAnnouncementUpdate?: Maybe<EventUpdateResult>;
  eventVkAnnouncementSetImage?: Maybe<EventUpdateResult>;
  eventAnnounce?: Maybe<EventUpdateResult>;
  eventSetAnnounceUrl?: Maybe<EventUpdateResult>;
  eventsFeedbackCreate: EventsFeedbackCreateResult;
  eventsFeedbackDelete: BasicResult;
  staffGrantGooglePermissionsToMember?: Maybe<Scalars['Boolean']>;
  staffFireMember?: Maybe<Scalars['Boolean']>;
  staffUnfireMember?: Maybe<Scalars['Boolean']>;
  ratioAddTraining: RatioTraining;
  ratioAddTicket: RatioTicket;
  ratioPaymentAdd: RatioPaymentAddResult;
  ratioPaymentDelete: BasicResult;
  ratioPaymentFiscalize: Scalars['Boolean'];
  ratioPaymentFiscalizedManually: RatioPaymentFiscalizedManuallyResult;
  ratioPaymentSetStatus: RatioPaymentSetStatusResult;
  ratioTrainingCopyScheduleFrom: Scalars['Boolean'];
  ratioTrainingAddDay: Scalars['Boolean'];
  ratioTrainingSyncParticipantsToMailchimp: Scalars['Boolean'];
  ratioTrainingSendEmail: RatioTrainingSendEmailResult;
  ratioCreateOrder: RatioCreateOrderResult;
  ratioConfirmOrder: RatioConfirmOrderResult;
  createRatioTicketType: RatioTicketType;
  updateRatioTicketType: RatioTicketType;
  deleteRatioTicketType: BasicResult;
  mastermindDatingCreateCohort: MastermindDatingCohortMutationResult;
  mastermindDatingPopulateCohortFromEvent: MastermindDatingCohortMutationResult;
  mastermindDatingSendInviteEmails: MastermindDatingCohortMutationResult;
  mastermindDatingClearAllGroups: MastermindDatingCohortMutationResult;
  mastermindDatingRunSolver: MastermindDatingCohortMutationResult;
  mastermindDatingBroadcastSolution: MastermindDatingCohortMutationResult;
  mastermindDatingDeleteCohort: BasicResult;
  mastermindDatingCreateGroup: MastermindDatingCohortMutationResult;
  mastermindDatingSetEventForCohort: MastermindDatingCohortMutationResult;
  mastermindDatingUnsetEventForCohort: MastermindDatingCohortMutationResult;
  mastermindDatingCreateParticipant: MastermindDatingParticipantMutationResult;
  mastermindDatingActivateVoting: MastermindDatingParticipantMutationResult;
  mastermindDatingSetPresenceStatus: MastermindDatingParticipantMutationResult;
  wagtailEditPageBodyBlocks: WagtailEditPageBodyBlocksResult;
  emailSubscribeChannelDelete?: Maybe<Scalars['Boolean']>;
  emailSubscribeChannelCreate?: Maybe<Scalars['Boolean']>;
  emailSubscribeChannelAddEmail?: Maybe<Scalars['Boolean']>;
  myEmailResubscribe?: Maybe<Scalars['Boolean']>;
  myEmailUnsubscribe?: Maybe<Scalars['Boolean']>;
  myEmailSubscribeToInterest: Scalars['Boolean'];
  myEmailUnsubscribeFromInterest: Scalars['Boolean'];
  tildaImportAll?: Maybe<BasicResult>;
  tildaImport?: Maybe<BasicResult>;
  openviduGenerateRoomToken: OpenviduGenerateRoomTokenResult;
};


export type MutationWagtailUploadImageFromUrlArgs = {
  input: WagtailUploadImageFromUrlInput;
};


export type MutationAuthAddUserToGroupArgs = {
  group_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationAuthRemoveUserFromGroupArgs = {
  group_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationAuthLoginArgs = {
  input: AuthLoginInput;
};


export type MutationAuthSetPasswordArgs = {
  input: AuthSetPasswordInput;
};


export type MutationAuthSendMagicLinkArgs = {
  input: AuthSendMagicLinkInput;
};


export type MutationAuthSetMyNamesArgs = {
  input: AuthSetMyNamesInput;
};


export type MutationZadarmaSetMemberForPbxCallArgs = {
  member_id: Scalars['ID'];
  pbx_call_id: Scalars['ID'];
};


export type MutationMyPrivacyModeSetArgs = {
  mode: Scalars['String'];
};


export type MutationCm2CreateOrderArgs = {
  input: Cm2CreateOrderInput;
};


export type MutationCm2CreateCustomerArgs = {
  input: Cm2CreateCustomerInput;
};


export type MutationCm2CloseOrderArgs = {
  id: Scalars['ID'];
};


export type MutationWatchmenCreateWatchmanArgs = {
  params: WatchmenCreateWatchmanInput;
};


export type MutationWatchmenUpdateShiftArgs = {
  params: WatchmenUpdateShiftInput;
};


export type MutationWatchmenSetWatchmanPriorityArgs = {
  params: WatchmenSetWatchmanPriorityInput;
};


export type MutationWatchmenSetWatchmanGradeArgs = {
  params: WatchmenSetWatchmanGradeInput;
};


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput;
};


export type MutationCashierRedeemPaymentArgs = {
  id: Scalars['ID'];
};


export type MutationKkmRegisterCheckArgs = {
  params: KkmRegisterCheckInput;
};


export type MutationMyEventsTicketUnregisterArgs = {
  event_id: Scalars['ID'];
};


export type MutationMyEventsTicketRegisterArgs = {
  event_id: Scalars['ID'];
};


export type MutationMyEventsTicketRegisterAnonArgs = {
  input: MyEventsTicketRegisterAnonInput;
};


export type MutationEventCreateArgs = {
  input: EventCreateInput;
};


export type MutationEventUpdateArgs = {
  input: EventUpdateInput;
};


export type MutationEventDeleteArgs = {
  input: EventDeleteInput;
};


export type MutationEventSetEventTypeArgs = {
  input: EventSetEventTypeInput;
};


export type MutationEventSetRealmArgs = {
  input: EventSetRealmInput;
};


export type MutationEventSetPricingTypeArgs = {
  input: EventSetPricingTypeInput;
};


export type MutationEventSetZoomLinkArgs = {
  input: EventSetZoomLinkInput;
};


export type MutationEventGenerateZoomLinkArgs = {
  input: EventGenerateZoomLinkInput;
};


export type MutationEventAddTagArgs = {
  input: EventAddTagInput;
};


export type MutationEventDeleteTagArgs = {
  input: EventDeleteTagInput;
};


export type MutationEventSetImageFromUrlArgs = {
  input: EventSetImageFromUrlInput;
};


export type MutationEventMoveArgs = {
  input: EventMoveInput;
};


export type MutationEventGenerateOpenViduTokenArgs = {
  input: EventGenerateOpenViduTokenInput;
};


export type MutationEventPrototypeCreateArgs = {
  input: EventPrototypeCreateInput;
};


export type MutationEventPrototypeUpdateArgs = {
  input: EventPrototypeUpdateInput;
};


export type MutationEventPrototypeCancelDateArgs = {
  input: EventPrototypeCancelDateInput;
};


export type MutationEventPrototypeNewEventArgs = {
  input: EventPrototypeNewEventInput;
};


export type MutationEventPrototypeAddTagArgs = {
  input: EventPrototypeAddTagInput;
};


export type MutationEventPrototypeDeleteTagArgs = {
  input: EventPrototypeDeleteTagInput;
};


export type MutationEventPrototypeSetImageArgs = {
  input: EventPrototypeSetImageInput;
};


export type MutationEventsWeeklyDigestPostMailchimpArgs = {
  input: EventsWeeklyDigestPostMailchimpInput;
};


export type MutationEventTimepadAnnouncementUpdateArgs = {
  input: EventTimepadAnnouncementUpdateInput;
};


export type MutationEventVkAnnouncementUpdateArgs = {
  input: EventVkAnnouncementUpdateInput;
};


export type MutationEventVkAnnouncementSetImageArgs = {
  input: EventVkAnnouncementSetImageInput;
};


export type MutationEventAnnounceArgs = {
  input: EventAnnounceInput;
};


export type MutationEventSetAnnounceUrlArgs = {
  input: EventSetAnnounceUrlInput;
};


export type MutationEventsFeedbackCreateArgs = {
  input: EventsFeedbackCreateInput;
};


export type MutationEventsFeedbackDeleteArgs = {
  input: EventsFeedbackDeleteInput;
};


export type MutationStaffGrantGooglePermissionsToMemberArgs = {
  id: Scalars['ID'];
};


export type MutationStaffFireMemberArgs = {
  id: Scalars['ID'];
};


export type MutationStaffUnfireMemberArgs = {
  id: Scalars['ID'];
};


export type MutationRatioAddTrainingArgs = {
  params: RatioAddTrainingInput;
};


export type MutationRatioAddTicketArgs = {
  input: RatioAddTicketInput;
};


export type MutationRatioPaymentAddArgs = {
  input: RatioPaymentAddInput;
};


export type MutationRatioPaymentDeleteArgs = {
  payment_id: Scalars['ID'];
};


export type MutationRatioPaymentFiscalizeArgs = {
  payment_id: Scalars['ID'];
};


export type MutationRatioPaymentFiscalizedManuallyArgs = {
  payment_id: Scalars['ID'];
};


export type MutationRatioPaymentSetStatusArgs = {
  input: RatioPaymentSetStatusInput;
};


export type MutationRatioTrainingCopyScheduleFromArgs = {
  params: RatioTrainingCopyScheduleFromInput;
};


export type MutationRatioTrainingAddDayArgs = {
  params: RatioTrainingAddDayInput;
};


export type MutationRatioTrainingSyncParticipantsToMailchimpArgs = {
  training_id: Scalars['ID'];
};


export type MutationRatioTrainingSendEmailArgs = {
  input: RatioTrainingSendEmailInput;
};


export type MutationRatioCreateOrderArgs = {
  input: RatioCreateOrderInput;
};


export type MutationRatioConfirmOrderArgs = {
  input: RatioConfirmOrderInput;
};


export type MutationCreateRatioTicketTypeArgs = {
  input: CreateRatioTicketTypeInput;
};


export type MutationUpdateRatioTicketTypeArgs = {
  input: UpdateRatioTicketTypeInput;
};


export type MutationDeleteRatioTicketTypeArgs = {
  input: DeleteRatioTicketTypeInput;
};


export type MutationMastermindDatingPopulateCohortFromEventArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingSendInviteEmailsArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingClearAllGroupsArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingRunSolverArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingBroadcastSolutionArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingDeleteCohortArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingCreateGroupArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingSetEventForCohortArgs = {
  cohort_id: Scalars['ID'];
  event_id: Scalars['ID'];
};


export type MutationMastermindDatingUnsetEventForCohortArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingCreateParticipantArgs = {
  cohort_id: Scalars['ID'];
  email: Scalars['String'];
};


export type MutationMastermindDatingActivateVotingArgs = {
  participant_id: Scalars['ID'];
};


export type MutationMastermindDatingSetPresenceStatusArgs = {
  participant_id: Scalars['ID'];
  present: Scalars['Boolean'];
};


export type MutationWagtailEditPageBodyBlocksArgs = {
  input: WagtailEditPageBodyBlocksInput;
};


export type MutationEmailSubscribeChannelDeleteArgs = {
  slug: Scalars['String'];
};


export type MutationEmailSubscribeChannelCreateArgs = {
  params: EmailSubscribeChannelCreateInput;
};


export type MutationEmailSubscribeChannelAddEmailArgs = {
  slug: Scalars['String'];
  email: Scalars['String'];
};


export type MutationMyEmailSubscribeToInterestArgs = {
  interest_id: Scalars['ID'];
};


export type MutationMyEmailUnsubscribeFromInterestArgs = {
  interest_id: Scalars['ID'];
};


export type MutationTildaImportArgs = {
  input: TildaImportInput;
};

export type My = {
  __typename?: 'My';
  user: AuthCurrentUser;
  membership?: Maybe<MyCmCustomer>;
  tickets: MyEventsTicketConnection;
  email_subscription: MyEmailSubscription;
};


export type MyTicketsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type MyCmCustomer = {
  __typename?: 'MyCmCustomer';
  card_id: Scalars['Int'];
  subscription_until?: Maybe<Scalars['String']>;
  last_visit?: Maybe<Scalars['String']>;
  total_spent: Scalars['Int'];
  privacy_mode: Scalars['String'];
  orders_count: Scalars['Int'];
  orders: Array<MyCmOrder>;
};

export type MyCmOrder = {
  __typename?: 'MyCmOrder';
  order_id: Scalars['ID'];
  start_dt: Scalars['String'];
  end_dt?: Maybe<Scalars['String']>;
};

export type MyEmailSubscription = {
  __typename?: 'MyEmailSubscription';
  status: Scalars['String'];
  interests?: Maybe<Array<MyEmailSubscriptionInterest>>;
};

export type MyEmailSubscriptionInterest = {
  __typename?: 'MyEmailSubscriptionInterest';
  id: Scalars['ID'];
  name: Scalars['String'];
  subscribed?: Maybe<Scalars['Boolean']>;
};

export type MyEventsTicket = {
  __typename?: 'MyEventsTicket';
  id: Scalars['ID'];
  event: Event;
  status: Scalars['String'];
  created?: Maybe<Scalars['String']>;
  zoom_link?: Maybe<Scalars['String']>;
};

export type MyEventsTicketConnection = {
  __typename?: 'MyEventsTicketConnection';
  pageInfo: PageInfo;
  nodes: Array<MyEventsTicket>;
  edges: Array<MyEventsTicketEdge>;
};

export type MyEventsTicketEdge = {
  __typename?: 'MyEventsTicketEdge';
  node: MyEventsTicket;
};

export type MyEventsTicketRegisterAnonInput = {
  event_id: Scalars['ID'];
  email: Scalars['String'];
  subscribed_to_newsletter?: Maybe<Scalars['Boolean']>;
};

export type NowCustomer = {
  __typename?: 'NowCustomer';
  card_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type NowInfo = {
  __typename?: 'NowInfo';
  total: Scalars['Int'];
  customers: Array<NowCustomer>;
};

export type OpenviduGenerateRoomTokenResult = {
  __typename?: 'OpenviduGenerateRoomTokenResult';
  token: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type PageSearchItem = {
  __typename?: 'PageSearchItem';
  page: WagtailPage;
};

export type PhotoRibbonBlock = WagtailBlock & {
  __typename?: 'PhotoRibbonBlock';
  id: Scalars['ID'];
  value: Array<WagtailImageRendition>;
};


export type PhotoRibbonBlockValueArgs = {
  spec: Scalars['String'];
};

export type PresentationPage = WagtailPage & {
  __typename?: 'PresentationPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  slides: Array<WagtailBlock>;
};

export type ProjectIndexPage = WagtailPage & {
  __typename?: 'ProjectIndexPage';
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
  active_description: Scalars['String'];
  projects: Array<ProjectPage>;
};


export type ProjectIndexPageProjectsArgs = {
  is_active?: Maybe<Scalars['Boolean']>;
};

export type ProjectPage = WagtailPage & {
  __typename?: 'ProjectPage';
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
  summary: Scalars['String'];
  activity_summary?: Maybe<Scalars['String']>;
  is_active: Scalars['Boolean'];
  body: Scalars['String'];
  image: WagtailImageRendition;
  upcoming_events: Array<Event>;
  telegram_chats: Array<TelegramChat>;
};


export type ProjectPageImageArgs = {
  spec: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  wagtailPage?: Maybe<WagtailPage>;
  wagtailPages: Array<WagtailPage>;
  wagtailImage?: Maybe<WagtailImage>;
  wagtailImageSearch: WagtailImageSearchResult;
  wagtailBlockStructure: WagtailBlockStructure;
  wagtailRenderBlock: WagtailRenderBlockResult;
  search: SearchResult;
  authGroupsAll: Array<AuthGroup>;
  authPermissionsAll: Array<AuthPermission>;
  zadarmaPbxCalls: ZadarmaPbxCallConnection;
  zadarmaPbxCall: ZadarmaPbxCall;
  importers: Array<Importer>;
  now: NowInfo;
  cm2Customers: Cm2CustomerConnection;
  cm2Orders: Cm2OrderConnection;
  cm2Customer: Cm2Customer;
  cm2Order: Cm2Order;
  watchmenWatchmenAll: Array<WatchmenWatchman>;
  watchmenGradesAll: Array<WatchmenGrade>;
  watchmenShifts: Array<WatchmenShift>;
  cashierPayments: CashierPaymentConnection;
  analyticsBovStats: Array<AnalyticsBovStat>;
  events: EventConnection;
  event?: Maybe<Event>;
  eventsPrototype: EventsPrototype;
  eventsPrototypes: Array<EventsPrototype>;
  publicEvents: EventConnection;
  publicEvent?: Maybe<Event>;
  vkGroups: Array<VkGroup>;
  timepadCategories: Array<TimepadCategory>;
  eventsWeeklyDigestCurrent: EventsWeeklyDigest;
  eventsPublicGoogleCalendar?: Maybe<EventsGoogleCalendar>;
  staffMembersAll: Array<StaffMember>;
  staffMember: StaffMember;
  ratioTrainings: RatioTrainingConnection;
  ratioTrainingBySlug: RatioTraining;
  ratioTrainersAll: Array<RatioTrainer>;
  ratioTrainingEmailPrototype: Scalars['String'];
  ratioTicketTypes: Array<RatioTicketType>;
  ratioOrders: RatioOrderConnection;
  mastermindDatingCohorts: Array<MastermindDatingCohort>;
  mastermindDatingCohortById: MastermindDatingCohort;
  projects: Array<ProjectPage>;
  specialOffer?: Maybe<SpecialOffer>;
  emailMailchimpCategoriesAll: Array<EmailMailchimpCategory>;
  emailSubscribeChannelsAll: Array<EmailSubscribeChannel>;
  imageTemplatesAll: Array<ImageTemplate>;
  imageTemplateBySlug: ImageTemplate;
  telegramChats: Array<TelegramChat>;
  tildaPage?: Maybe<TildaPage>;
  tildaPages: Array<TildaPage>;
  externalServices: Array<ExternalService>;
  my: My;
};


export type QueryWagtailPageArgs = {
  page_id?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
  preview_token?: Maybe<Scalars['String']>;
};


export type QueryWagtailImageArgs = {
  input: WagtailImageInput;
};


export type QueryWagtailImageSearchArgs = {
  input: WagtailImageSearchInput;
};


export type QueryWagtailBlockStructureArgs = {
  input: WagtailBlockStructureInput;
};


export type QueryWagtailRenderBlockArgs = {
  input: WagtailRenderBlockInput;
};


export type QuerySearchArgs = {
  input: SearchInput;
};


export type QueryZadarmaPbxCallsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryZadarmaPbxCallArgs = {
  pbx_call_id: Scalars['ID'];
};


export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCm2CustomerArgs = {
  id: Scalars['ID'];
};


export type QueryCm2OrderArgs = {
  id: Scalars['ID'];
};


export type QueryWatchmenWatchmenAllArgs = {
  currentStaff?: Maybe<Scalars['Boolean']>;
  currentRole?: Maybe<Scalars['Boolean']>;
};


export type QueryWatchmenShiftsArgs = {
  from_date: Scalars['String'];
  to_date: Scalars['String'];
};


export type QueryCashierPaymentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  filter?: Maybe<EventsFilterInput>;
};


export type QueryEventArgs = {
  event_id: Scalars['ID'];
};


export type QueryEventsPrototypeArgs = {
  id: Scalars['ID'];
};


export type QueryPublicEventsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  from_date?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['ID']>;
};


export type QueryPublicEventArgs = {
  event_id: Scalars['ID'];
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID'];
};


export type QueryRatioTrainingsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRatioTrainingBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryRatioTrainingEmailPrototypeArgs = {
  training_id: Scalars['ID'];
  type: Scalars['String'];
};


export type QueryRatioOrdersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMastermindDatingCohortByIdArgs = {
  id: Scalars['ID'];
};


export type QueryImageTemplateBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryTildaPageArgs = {
  path: Scalars['String'];
};

export type RatioActivity = {
  __typename?: 'RatioActivity';
  id: Scalars['ID'];
  time: Scalars['String'];
  activity_type: Scalars['String'];
  name: Scalars['String'];
  location: Scalars['String'];
  trainer?: Maybe<RatioTrainer>;
};

export type RatioAddTicketInput = {
  training: Scalars['ID'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  payment_amount: Scalars['Int'];
  ticket_type?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};

export type RatioAddTrainingInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  date: Scalars['String'];
  telegram_link: Scalars['String'];
};

export type RatioBriefingBlock = WagtailBlock & {
  __typename?: 'RatioBriefingBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioConfirmOrderInput = {
  order_id: Scalars['ID'];
};

export enum RatioConfirmOrderOutcome {
  NotFound = 'NOT_FOUND',
  NotPaid = 'NOT_PAID',
  Ok = 'OK',
  AlreadyFulfilled = 'ALREADY_FULFILLED',
  TicketAlreadyExists = 'TICKET_ALREADY_EXISTS'
}

export type RatioConfirmOrderResult = {
  __typename?: 'RatioConfirmOrderResult';
  outcome: RatioConfirmOrderOutcome;
};

export type RatioCreateOrderInput = {
  ticket_type_id: Scalars['ID'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  city: Scalars['String'];
  payer?: Maybe<RatioCreateOrderPayerInput>;
};

export type RatioCreateOrderPayerInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type RatioCreateOrderResult = RatioOrder | ValidationError | GenericError;

export type RatioExerciseBlock = WagtailBlock & {
  __typename?: 'RatioExerciseBlock';
  id: Scalars['ID'];
  value: RatioExerciseBlockValue;
};

export type RatioExerciseBlockValue = {
  __typename?: 'RatioExerciseBlockValue';
  header: Scalars['String'];
  lines_count: Scalars['Int'];
  enumerate: Scalars['Boolean'];
};

export type RatioExerciseOnelineBlock = WagtailBlock & {
  __typename?: 'RatioExerciseOnelineBlock';
  id: Scalars['ID'];
  value: RatioExerciseOnelineBlockValue;
};

export type RatioExerciseOnelineBlockValue = {
  __typename?: 'RatioExerciseOnelineBlockValue';
  text: Scalars['String'];
};

export type RatioHeaderBlock = WagtailBlock & {
  __typename?: 'RatioHeaderBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioInsetBlock = WagtailBlock & {
  __typename?: 'RatioInsetBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioMathBlock = WagtailBlock & {
  __typename?: 'RatioMathBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioNotebookIndexPage = WagtailPage & {
  __typename?: 'RatioNotebookIndexPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
};

export type RatioNotebookPage = WagtailPage & {
  __typename?: 'RatioNotebookPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  sections: Array<RatioNotebookSectionBlock>;
};

export type RatioNotebookSectionBlock = WagtailBlock & {
  __typename?: 'RatioNotebookSectionBlock';
  id: Scalars['ID'];
  value: RatioSectionPage;
};

export type RatioOrder = {
  __typename?: 'RatioOrder';
  fulfilled: Scalars['Boolean'];
  id: Scalars['ID'];
  confirmation_token: Scalars['String'];
  created: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  city: Scalars['String'];
  ticket_type: RatioTicketType;
};

export type RatioOrderConnection = {
  __typename?: 'RatioOrderConnection';
  pageInfo: PageInfo;
  nodes: Array<RatioOrder>;
  edges: Array<RatioOrderEdge>;
};

export type RatioOrderEdge = {
  __typename?: 'RatioOrderEdge';
  node: RatioOrder;
};

export type RatioParagraphBlock = WagtailBlock & {
  __typename?: 'RatioParagraphBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioPayment = {
  __typename?: 'RatioPayment';
  id: Scalars['ID'];
  amount: Scalars['Int'];
  payment_type: Scalars['String'];
  status: Scalars['String'];
  fiscalization_status: Scalars['String'];
  comment: Scalars['String'];
  custom_kkm_title: Scalars['String'];
  ticket: RatioTicket;
};

export type RatioPaymentAddInput = {
  ticket_id: Scalars['ID'];
  amount: Scalars['Int'];
  status?: Maybe<Scalars['String']>;
  fiscalization_status: Scalars['String'];
  payment_type: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
};

export type RatioPaymentAddResult = {
  __typename?: 'RatioPaymentAddResult';
  payment: RatioPayment;
};

export type RatioPaymentFiscalizedManuallyResult = {
  __typename?: 'RatioPaymentFiscalizedManuallyResult';
  payment: RatioPayment;
};

export type RatioPaymentSetStatusInput = {
  payment_id: Scalars['ID'];
  status: Scalars['String'];
};

export type RatioPaymentSetStatusResult = {
  __typename?: 'RatioPaymentSetStatusResult';
  payment: RatioPayment;
};

export type RatioPresentationIndexPage = WagtailPage & {
  __typename?: 'RatioPresentationIndexPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  presentations: Array<PresentationPage>;
};

export type RatioSectionIndexPage = WagtailPage & {
  __typename?: 'RatioSectionIndexPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
};

export type RatioSectionPage = WagtailPage & {
  __typename?: 'RatioSectionPage';
  title: Scalars['String'];
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  body: Array<WagtailBlock>;
};

export type RatioTicket = {
  __typename?: 'RatioTicket';
  id: Scalars['ID'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  registration_date?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  ticket_type: Scalars['String'];
  payment_amount: Scalars['Int'];
  comment: Scalars['String'];
  payments: Array<RatioPayment>;
  training: RatioTraining;
};

export type RatioTicketType = {
  __typename?: 'RatioTicketType';
  price: Scalars['Int'];
  name: Scalars['String'];
  id: Scalars['ID'];
  training: RatioTraining;
};

export type RatioTrainer = {
  __typename?: 'RatioTrainer';
  id: Scalars['ID'];
  short_name: Scalars['String'];
  long_name: Scalars['String'];
};

export type RatioTraining = {
  __typename?: 'RatioTraining';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  date: Scalars['String'];
  telegram_link: Scalars['String'];
  salaries_paid: Scalars['Boolean'];
  tickets: Array<RatioTicket>;
  schedule: Array<RatioTrainingDay>;
  ticket_types: Array<RatioTicketType>;
  tickets_count: Scalars['Int'];
  total_income: Scalars['Int'];
  long_name: Scalars['String'];
};

export type RatioTrainingAddDayInput = {
  training_slug: Scalars['String'];
  date: Scalars['String'];
};

export type RatioTrainingConnection = {
  __typename?: 'RatioTrainingConnection';
  pageInfo: PageInfo;
  nodes: Array<RatioTraining>;
  edges: Array<RatioTrainingEdge>;
};

export type RatioTrainingCopyScheduleFromInput = {
  from_training_slug: Scalars['String'];
  to_training_slug: Scalars['String'];
};

export type RatioTrainingDay = {
  __typename?: 'RatioTrainingDay';
  id: Scalars['ID'];
  date: Scalars['String'];
  activities: Array<RatioActivity>;
};

export type RatioTrainingEdge = {
  __typename?: 'RatioTrainingEdge';
  node: RatioTraining;
};

export type RatioTrainingSendEmailInput = {
  training_id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
};

export type RatioTrainingSendEmailResult = {
  __typename?: 'RatioTrainingSendEmailResult';
  draft_link: Scalars['String'];
};

export type SearchInput = {
  query: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
};

export type SearchItem = PageSearchItem | EventSearchItem;

export type SearchResult = {
  __typename?: 'SearchResult';
  results: Array<SearchItem>;
  more: Scalars['Boolean'];
};

export type SectionHeaderBlock = WagtailBlock & {
  __typename?: 'SectionHeaderBlock';
  id: Scalars['ID'];
  value: SectionHeaderBlockValue;
};

export type SectionHeaderBlockValue = {
  __typename?: 'SectionHeaderBlockValue';
  header: Scalars['String'];
  text: Scalars['String'];
};

export type SlackAccount = ExternalServiceAccount & {
  __typename?: 'SlackAccount';
  service: SlackExternalService;
  email: Scalars['String'];
};

export type SlackExternalService = ExternalService & {
  __typename?: 'SlackExternalService';
  slug: Scalars['String'];
  accounts: Array<SlackAccount>;
};

export type SlackUser = {
  __typename?: 'SlackUser';
  slack_id: Scalars['String'];
  image_url: Scalars['String'];
};

export type SlideFragmentsBlock = WagtailBlock & {
  __typename?: 'SlideFragmentsBlock';
  id: Scalars['ID'];
  value: Array<SlideFragmentsBlockValues>;
};

export type SlideFragmentsBlockValues = SlideFragmentsBlock_RichTextBlock | SlideFragmentsBlock_RawHtmlBlock;

export type SlideFragmentsBlock_RawHtmlBlock = WagtailBlock & {
  __typename?: 'SlideFragmentsBlock_RawHtmlBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type SlideFragmentsBlock_RichTextBlock = WagtailBlock & {
  __typename?: 'SlideFragmentsBlock_RichTextBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type SlideRawHtmlBlock = WagtailBlock & {
  __typename?: 'SlideRawHtmlBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type SlideRichTextBlock = WagtailBlock & {
  __typename?: 'SlideRichTextBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type SlideTitleBlock = WagtailBlock & {
  __typename?: 'SlideTitleBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type SpecialOffer = {
  __typename?: 'SpecialOffer';
  id: Scalars['ID'];
  text: Scalars['String'];
  link: Scalars['String'];
  button_text: Scalars['String'];
  until: Scalars['String'];
  hide_duration: Scalars['Int'];
};

export type StaffMember = {
  __typename?: 'StaffMember';
  id: Scalars['ID'];
  short_name: Scalars['String'];
  full_name: Scalars['String'];
  role: Scalars['String'];
  is_current: Scalars['Boolean'];
  vk: Scalars['String'];
  color: Scalars['String'];
  user: AuthUser;
  slack_user?: Maybe<SlackUser>;
};

export type Subscription = {
  __typename?: 'Subscription';
  events: EventNotification;
};

export type TelegramChat = {
  __typename?: 'TelegramChat';
  id: Scalars['ID'];
  username: Scalars['String'];
  title: Scalars['String'];
  photo?: Maybe<WagtailImageRendition>;
  project?: Maybe<ProjectPage>;
};


export type TelegramChatPhotoArgs = {
  spec: Scalars['String'];
};

export type TildaAsset = {
  __typename?: 'TildaAsset';
  url: Scalars['String'];
  kind: Scalars['String'];
};

export type TildaImportInput = {
  page_id: Scalars['Int'];
};

export type TildaPage = {
  __typename?: 'TildaPage';
  page_id: Scalars['Int'];
  path: Scalars['String'];
  body: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  show_header_and_footer: Scalars['Boolean'];
  og_image?: Maybe<WagtailImageRendition>;
  assets: Array<TildaAsset>;
  css: Array<TildaAsset>;
  js: Array<TildaAsset>;
  imported_dt: Scalars['String'];
};


export type TildaPageOg_ImageArgs = {
  spec: Scalars['String'];
};

export type TimepadCategory = {
  __typename?: 'TimepadCategory';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateRatioTicketTypeInput = {
  id: Scalars['ID'];
  price?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type ValidationError = {
  __typename?: 'ValidationError';
  errors: Array<ValidationErrorItem>;
};

export type ValidationErrorItem = {
  __typename?: 'ValidationErrorItem';
  name: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type VkGroup = {
  __typename?: 'VkGroup';
  name: Scalars['String'];
};

export type WagtailAnyBlockValidationError = WagtailBlockValidationError & {
  __typename?: 'WagtailAnyBlockValidationError';
  error_message: Scalars['String'];
};

export type WagtailBlock = {
  id: Scalars['ID'];
};

export type WagtailBlockStructure = {
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailBlockStructureInput = {
  name: Scalars['String'];
};

export type WagtailBlockValidationError = {
  error_message: Scalars['String'];
};

export type WagtailBooleanBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailBooleanBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailCharBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailCharBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailEditPageBodyBlocksInput = {
  page_id: Scalars['ID'];
  publish: Scalars['Boolean'];
  blocksJson: Scalars['String'];
};

export type WagtailEditPageBodyBlocksResult = {
  __typename?: 'WagtailEditPageBodyBlocksResult';
  page?: Maybe<WagtailPage>;
  validation_error?: Maybe<WagtailStreamFieldValidationError>;
};

export type WagtailGeo = {
  __typename?: 'WagtailGeo';
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type WagtailImage = {
  __typename?: 'WagtailImage';
  id: Scalars['ID'];
  url: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  rendition: WagtailImageRendition;
};


export type WagtailImageRenditionArgs = {
  spec: Scalars['String'];
};

export type WagtailImageBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailImageBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailImageInput = {
  id: Scalars['ID'];
};

export type WagtailImageRendition = {
  __typename?: 'WagtailImageRendition';
  id: Scalars['ID'];
  url: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  original_image: WagtailImage;
};

export type WagtailImageSearchInput = {
  query: Scalars['String'];
};

export type WagtailImageSearchResult = {
  __typename?: 'WagtailImageSearchResult';
  results: Array<WagtailImage>;
};

export type WagtailListBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailListBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  child_block: WagtailBlockStructure;
};

export type WagtailListBlockValidationError = WagtailBlockValidationError & {
  __typename?: 'WagtailListBlockValidationError';
  error_message: Scalars['String'];
  errors: Array<Maybe<WagtailBlockValidationError>>;
};

export type WagtailPage = {
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
};

export type WagtailPageMeta = {
  __typename?: 'WagtailPageMeta';
  slug: Scalars['String'];
  description: Scalars['String'];
  /** @deprecated renamed to `url` */
  html_url: Scalars['String'];
  url: Scalars['String'];
  permissions: WagtailPagePermissions;
  revisions: Array<WagtailPageRevision>;
  revision: WagtailPageRevision;
};


export type WagtailPageMetaRevisionArgs = {
  id: Scalars['ID'];
};

export type WagtailPagePermissions = {
  __typename?: 'WagtailPagePermissions';
  can_edit: Scalars['Boolean'];
};

export type WagtailPageRevision = {
  __typename?: 'WagtailPageRevision';
  id: Scalars['ID'];
  created_at: Scalars['String'];
  as_page: WagtailPage;
};

export type WagtailRenderBlockInput = {
  type: Scalars['String'];
  paramsJson: Scalars['String'];
};

export type WagtailRenderBlockResult = {
  __typename?: 'WagtailRenderBlockResult';
  validation_error?: Maybe<WagtailStreamFieldValidationError>;
  block?: Maybe<WagtailBlock>;
};

export type WagtailRichTextBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailRichTextBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailStaticBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailStaticBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailStreamBlockValidationError = {
  __typename?: 'WagtailStreamBlockValidationError';
  block_id: Scalars['Int'];
  error?: Maybe<WagtailBlockValidationError>;
};

export type WagtailStreamFieldValidationError = {
  __typename?: 'WagtailStreamFieldValidationError';
  block_errors: Array<WagtailStreamBlockValidationError>;
  non_block_error?: Maybe<Scalars['String']>;
};

export type WagtailStructBlockChildStructure = {
  __typename?: 'WagtailStructBlockChildStructure';
  name: Scalars['String'];
  definition: WagtailBlockStructure;
};

export type WagtailStructBlockFieldValidationError = {
  __typename?: 'WagtailStructBlockFieldValidationError';
  name: Scalars['String'];
  error?: Maybe<WagtailBlockValidationError>;
};

export type WagtailStructBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailStructBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  child_blocks: Array<WagtailStructBlockChildStructure>;
};

export type WagtailStructBlockValidationError = WagtailBlockValidationError & {
  __typename?: 'WagtailStructBlockValidationError';
  error_message: Scalars['String'];
  errors: Array<WagtailStructBlockFieldValidationError>;
};

export type WagtailUrlBlockStructure = WagtailBlockStructure & {
  __typename?: 'WagtailURLBlockStructure';
  label: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type WagtailUploadImageFromUrlInput = {
  url: Scalars['String'];
  title: Scalars['String'];
  basename: Scalars['String'];
};

export type WagtailUploadImageFromUrlResult = {
  __typename?: 'WagtailUploadImageFromUrlResult';
  image: WagtailImage;
};

export type WatchmenCreateWatchmanInput = {
  email: Scalars['String'];
  short_name: Scalars['String'];
  full_name: Scalars['String'];
  password: Scalars['String'];
  vk?: Maybe<Scalars['String']>;
  gender: Scalars['String'];
  skip_wiki?: Maybe<Scalars['Boolean']>;
  skip_cm_customer?: Maybe<Scalars['Boolean']>;
  skip_cm_user?: Maybe<Scalars['Boolean']>;
};

export type WatchmenGrade = {
  __typename?: 'WatchmenGrade';
  id: Scalars['ID'];
  code: Scalars['String'];
  multiplier: Scalars['Float'];
};

export type WatchmenSetWatchmanGradeInput = {
  watchman_id: Scalars['ID'];
  grade_id: Scalars['ID'];
};

export type WatchmenSetWatchmanPriorityInput = {
  watchman_id: Scalars['ID'];
  priority: Scalars['Int'];
};

export type WatchmenShift = {
  __typename?: 'WatchmenShift';
  date: Scalars['String'];
  shift: Scalars['String'];
  is_night: Scalars['Boolean'];
  id: Scalars['ID'];
  watchman?: Maybe<WatchmenWatchman>;
};

export type WatchmenUpdateShiftInput = {
  date: Scalars['String'];
  shift: Scalars['String'];
  watchman_id?: Maybe<Scalars['ID']>;
  is_night?: Maybe<Scalars['Boolean']>;
};

export type WatchmenWatchman = {
  __typename?: 'WatchmenWatchman';
  id: Scalars['ID'];
  priority: Scalars['Int'];
  member: StaffMember;
  grade?: Maybe<WatchmenGrade>;
};

export type WikiAccount = ExternalServiceAccount & {
  __typename?: 'WikiAccount';
  service: WikiExternalService;
  name: Scalars['String'];
};

export type WikiExternalService = ExternalService & {
  __typename?: 'WikiExternalService';
  slug: Scalars['String'];
  accounts: Array<WikiAccount>;
};

export type ZadarmaCall = {
  __typename?: 'ZadarmaCall';
  call_id: Scalars['String'];
  ts: Scalars['String'];
  call_type: Scalars['String'];
  disposition: Scalars['String'];
  clid: Scalars['String'];
  destination: Scalars['String'];
  sip: Scalars['String'];
  is_recorded: Scalars['Int'];
  watchman: Scalars['String'];
  record?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ZadarmaData = {
  __typename?: 'ZadarmaData';
  staff_member?: Maybe<StaffMember>;
};

export type ZadarmaPbxCall = {
  __typename?: 'ZadarmaPbxCall';
  pbx_call_id: Scalars['String'];
  ts: Scalars['String'];
  calls: Array<ZadarmaCall>;
  data?: Maybe<ZadarmaData>;
  id: Scalars['ID'];
};

export type ZadarmaPbxCallConnection = {
  __typename?: 'ZadarmaPbxCallConnection';
  pageInfo: PageInfo;
  nodes: Array<ZadarmaPbxCall>;
  edges: Array<ZadarmaPbxCallEdge>;
};

export type ZadarmaPbxCallEdge = {
  __typename?: 'ZadarmaPbxCallEdge';
  node: ZadarmaPbxCall;
};

export type ZoomMeeting = {
  __typename?: 'ZoomMeeting';
  id: Scalars['ID'];
  zoom_id: Scalars['String'];
  join_url: Scalars['String'];
  instances: Array<ZoomMeetingInstance>;
  participants_count?: Maybe<Scalars['Int']>;
};

export type ZoomMeetingInstance = {
  __typename?: 'ZoomMeetingInstance';
  id: Scalars['ID'];
  zoom_uuid: Scalars['String'];
  start_time: Scalars['String'];
  end_time: Scalars['String'];
  participants: Array<ZoomParticipant>;
};

export type ZoomParticipant = {
  __typename?: 'ZoomParticipant';
  id: Scalars['ID'];
  name: Scalars['String'];
  join_time: Scalars['String'];
  leave_time: Scalars['String'];
};
