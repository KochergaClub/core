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

export type AddTelegramChatByInviteLinkInput = {
  invite_link: Scalars['String'];
};

export type AddTelegramChatByInviteLinkResult = TelegramChat | ValidationError | GenericError;

export type AddTelegramChatInput = {
  username?: Maybe<Scalars['String']>;
};

export type AddTelegramChatResult = TelegramChat | ValidationError | GenericError;

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
  is_superuser: Scalars['Boolean'];
  permissions: Array<Scalars['String']>;
};

export type AuthGroup = {
  __typename?: 'AuthGroup';
  id: Scalars['ID'];
  /** имя */
  name: Scalars['String'];
  permissions: Array<AuthPermission>;
  users: Array<AuthUser>;
  wagtailCollectionPermissions: Array<WagtailCollectionPermission>;
  wagtailPagePermissions: Array<WagtailPagePermission>;
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
  perm: Scalars['String'];
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
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
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

export type BecomeCommunityLeadCuratorInput = {
  id: Scalars['ID'];
};

export type BecomeCommunityLeadCuratorResult = CommunityLead;

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
  /** заголовок */
  title: Scalars['String'];
  meta: WagtailPageMeta;
  /** Подзаголовок */
  subtitle: Scalars['String'];
  posts: Array<BlogPostPage>;
};

export type BlogPostAuthor = {
  __typename?: 'BlogPostAuthor';
  /** Имя */
  name: Scalars['String'];
  /** Описание */
  description: Scalars['String'];
  image: WagtailImageRendition;
};


export type BlogPostAuthorImageArgs = {
  spec: Scalars['String'];
};

export type BlogPostPage = WagtailPage & {
  __typename?: 'BlogPostPage';
  id: Scalars['ID'];
  /** заголовок */
  title: Scalars['String'];
  meta: WagtailPageMeta;
  /** Дата поста */
  date: Scalars['String'];
  /** Короткое описание */
  summary: Scalars['String'];
  body: Scalars['String'];
  authors: Array<BlogPostAuthor>;
};

export type CancelYandexKassaPaymentInput = {
  id: Scalars['ID'];
};

export type CancelYandexKassaPaymentResult = YandexKassaPayment | GenericError;

export type CashierCreatePaymentInput = {
  amount: Scalars['Int'];
  whom: Scalars['ID'];
  comment: Scalars['String'];
};

export type CashierPayment = {
  __typename?: 'CashierPayment';
  id: Scalars['ID'];
  /** Сумма */
  amount: Scalars['Int'];
  /** Дата создания */
  created_dt: Scalars['String'];
  /** Дата получения */
  redeem_dt?: Maybe<Scalars['String']>;
  /** Комментарий */
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

export type CheckRatioPromocodeInput = {
  ticket_type_id: Scalars['ID'];
  code: Scalars['String'];
};

export type CheckRatioPromocodeResult = {
  __typename?: 'CheckRatioPromocodeResult';
  discounted_price: Scalars['Int'];
};

export type ClearCommunityLeadCuratorInput = {
  id: Scalars['ID'];
};

export type ClearCommunityLeadCuratorResult = CommunityLead;

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

export type CommunityLead = {
  __typename?: 'CommunityLead';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  created: Scalars['String'];
  updated: Scalars['String'];
  created_by?: Maybe<AuthUser>;
  curated_by?: Maybe<AuthUser>;
  status: CommunityLeadStatus;
};

export type CommunityLeadConnection = {
  __typename?: 'CommunityLeadConnection';
  pageInfo: PageInfo;
  nodes: Array<CommunityLead>;
  edges: Array<CommunityLeadEdge>;
};

export type CommunityLeadEdge = {
  __typename?: 'CommunityLeadEdge';
  node: CommunityLead;
};

export enum CommunityLeadStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type CommunityLeadsFilterInput = {
  status?: Maybe<CommunityLeadStatus>;
  curated_by_me?: Maybe<Scalars['Boolean']>;
  curated_by_empty?: Maybe<Scalars['Boolean']>;
};

export type CreateCommunityLeadInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type CreateCommunityLeadResult = CommunityLead | ValidationError | GenericError;

export type CreateRatioPromocodeInput = {
  ticket_type_id?: Maybe<Scalars['ID']>;
  training_id?: Maybe<Scalars['ID']>;
  code: Scalars['String'];
  discount: Scalars['Int'];
  uses_max?: Maybe<Scalars['Int']>;
};

export type CreateRatioPromocodeResult = RatioPromocode | ValidationError | GenericError;

export type CreateRatioTicketTypeInput = {
  training_id: Scalars['ID'];
  price: Scalars['Int'];
  name: Scalars['String'];
  discount_by_email?: Maybe<Scalars['Int']>;
  discount_percent_by_email?: Maybe<Scalars['Int']>;
};

export type CreateRatioTrainingInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  date?: Maybe<Scalars['String']>;
  telegram_link?: Maybe<Scalars['String']>;
  discount_by_email?: Maybe<Scalars['Int']>;
  discount_percent_by_email?: Maybe<Scalars['Int']>;
};

export type CreateRatioTrainingResult = RatioTraining | ValidationError | GenericError;

export type DeleteCommunityLeadResult = BasicResult;

export type DeleteRatioTicketTypeInput = {
  id: Scalars['ID'];
};

export type DeleteTelegramChatResult = BasicResult;

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
  /** Дата начала недели */
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
  /** Вопрос */
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type FaqPage = WagtailPage & {
  __typename?: 'FaqPage';
  id: Scalars['ID'];
  /** заголовок */
  title: Scalars['String'];
  meta: WagtailPageMeta;
  /** Короткое описание */
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
  last_dt?: Maybe<Scalars['String']>;
};

export type KkmRegisterCheckInput = {
  email: Scalars['String'];
  title: Scalars['String'];
  sum: Scalars['Int'];
  sign_method_calculation: KkmSignMethodCalculation;
};

export type KkmRegisterCheckOkResult = {
  __typename?: 'KkmRegisterCheckOkResult';
  url: Scalars['String'];
};

export type KkmRegisterCheckResult = KkmRegisterCheckOkResult | GenericError;

export enum KkmSignMethodCalculation {
  /** ПРЕДОПЛАТА 100% (Полная предварительная оплата до момента передачи предмета расчета) */
  PrePayment_100 = 'PRE_PAYMENT_100',
  /** ПРЕДОПЛАТА (Частичная предварительная оплата до момента передачи предмета расчета) */
  PrePayment = 'PRE_PAYMENT',
  /** АВАНС */
  Advance = 'ADVANCE',
  /** ПОЛНЫЙ РАСЧЕТ (Полная оплата, в том числе с учетом аванса в момент передачи предмета расчета) */
  FullPayment = 'FULL_PAYMENT',
  /** ЧАСТИЧНЫЙ РАСЧЕТ И КРЕДИТ (Частичная оплата предмета расчета в момент его передачи с последующей оплатой в кредит) */
  PartialPaymentAndCredit = 'PARTIAL_PAYMENT_AND_CREDIT',
  /** ПЕРЕДАЧА В КРЕДИТ (Передача предмета расчета без его оплаты в момент его передачи с последующей оплатой в кредит) */
  CreditTransfer = 'CREDIT_TRANSFER',
  /** ОПЛАТА КРЕДИТА (Оплата предмета расчета после его передачи с оплатой в кредит) */
  CreditPayment = 'CREDIT_PAYMENT'
}

export type KkmStatusResult = {
  __typename?: 'KkmStatusResult';
  last_shift_closed?: Maybe<Scalars['String']>;
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
  updateSettings: Settings;
  wagtailUploadImageFromUrl: WagtailUploadImageFromUrlResult;
  authAddUserToGroup: Scalars['Boolean'];
  authRemoveUserFromGroup: Scalars['Boolean'];
  createAuthGroup: AuthGroup;
  deleteAuthGroup: BasicResult;
  addPermissionToAuthGroup: AuthGroup;
  removePermissionFromAuthGroup: AuthGroup;
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
  kkmRegisterCheck: KkmRegisterCheckResult;
  closeKkmShift: BasicResult;
  cashierCreatePayment?: Maybe<Scalars['Boolean']>;
  cashierRedeemPayment?: Maybe<Scalars['Boolean']>;
  updateYandexKassaPayment: UpdateYandexKassaPaymentResult;
  cancelYandexKassaPayment: CancelYandexKassaPaymentResult;
  myEventsTicketUnregister: MyEventsTicket;
  myEventsTicketRegister: MyEventsTicket;
  myEventsTicketRegisterAnon: MyEventsTicket;
  eventCreate: EventCreateResult;
  eventUpdate: EventUpdateResult;
  eventDelete: BasicResult;
  eventGenerateZoomLink: EventUpdateResult;
  eventAddTag: EventUpdateResult;
  eventDeleteTag: EventUpdateResult;
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
  ratioTrainingSyncParticipantsToMailchimp: Scalars['Boolean'];
  ratioTrainingSendEmail: RatioTrainingSendEmailResult;
  ratioCreateOrder: RatioCreateOrderResult;
  ratioConfirmOrder: RatioConfirmOrderResult;
  ratioPaymentAdd: RatioPaymentAddResult;
  ratioPaymentDelete: BasicResult;
  ratioPaymentFiscalize: Scalars['Boolean'];
  ratioPaymentFiscalizedManually: RatioPaymentFiscalizedManuallyResult;
  ratioPaymentSetStatus: RatioPaymentSetStatusResult;
  ratioTrainingCopyScheduleFrom: Scalars['Boolean'];
  ratioTrainingAddDay: Scalars['Boolean'];
  createRatioTicketType: RatioTicketType;
  updateRatioTicketType: RatioTicketType;
  deleteRatioTicketType: BasicResult;
  ratioAddTicket: RatioTicket;
  updateRatioTicket: RatioTicket;
  setRatioTicketNotionLink: RatioTicket;
  createRatioTraining: CreateRatioTrainingResult;
  updateRatioTraining: UpdateRatioTrainingResult;
  ratioDeleteTraining: BasicResult;
  createRatioPromocode: CreateRatioPromocodeResult;
  checkRatioPromocode?: Maybe<CheckRatioPromocodeResult>;
  sendUniqueRatioPromocode: SendUniqueRatioPromocodeResult;
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
  addTelegramChat: AddTelegramChatResult;
  addTelegramChatByInviteLink: AddTelegramChatByInviteLinkResult;
  deleteTelegramChat: DeleteTelegramChatResult;
  refreshTelegramChatData: RefreshTelegramChatDataResult;
  postToTelegramChat: PostToTelegramChatResult;
  tildaImportAll?: Maybe<BasicResult>;
  tildaImport?: Maybe<BasicResult>;
  openviduGenerateRoomToken: OpenviduGenerateRoomTokenResult;
  createCommunityLead: CreateCommunityLeadResult;
  updateCommunityLead: UpdateCommunityLeadResult;
  deleteCommunityLead: DeleteCommunityLeadResult;
  becomeCommunityLeadCurator: BecomeCommunityLeadCuratorResult;
  clearCommunityLeadCurator: ClearCommunityLeadCuratorResult;
};


export type MutationUpdateSettingsArgs = {
  input: UpdateSettingsInput;
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


export type MutationCreateAuthGroupArgs = {
  name: Scalars['String'];
};


export type MutationDeleteAuthGroupArgs = {
  id: Scalars['ID'];
};


export type MutationAddPermissionToAuthGroupArgs = {
  group_id: Scalars['ID'];
  perm: Scalars['String'];
};


export type MutationRemovePermissionFromAuthGroupArgs = {
  group_id: Scalars['ID'];
  perm: Scalars['String'];
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


export type MutationKkmRegisterCheckArgs = {
  input: KkmRegisterCheckInput;
};


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput;
};


export type MutationCashierRedeemPaymentArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateYandexKassaPaymentArgs = {
  input: UpdateYandexKassaPaymentInput;
};


export type MutationCancelYandexKassaPaymentArgs = {
  input: CancelYandexKassaPaymentInput;
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


export type MutationEventGenerateZoomLinkArgs = {
  input: EventGenerateZoomLinkInput;
};


export type MutationEventAddTagArgs = {
  input: EventAddTagInput;
};


export type MutationEventDeleteTagArgs = {
  input: EventDeleteTagInput;
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


export type MutationCreateRatioTicketTypeArgs = {
  input: CreateRatioTicketTypeInput;
};


export type MutationUpdateRatioTicketTypeArgs = {
  input: UpdateRatioTicketTypeInput;
};


export type MutationDeleteRatioTicketTypeArgs = {
  input: DeleteRatioTicketTypeInput;
};


export type MutationRatioAddTicketArgs = {
  input: RatioAddTicketInput;
};


export type MutationUpdateRatioTicketArgs = {
  input: UpdateRatioTicketInput;
};


export type MutationSetRatioTicketNotionLinkArgs = {
  input: SetRatioTicketNotionLinkInput;
};


export type MutationCreateRatioTrainingArgs = {
  input: CreateRatioTrainingInput;
};


export type MutationUpdateRatioTrainingArgs = {
  input: UpdateRatioTrainingInput;
};


export type MutationRatioDeleteTrainingArgs = {
  input: RatioDeleteTrainingInput;
};


export type MutationCreateRatioPromocodeArgs = {
  input: CreateRatioPromocodeInput;
};


export type MutationCheckRatioPromocodeArgs = {
  input: CheckRatioPromocodeInput;
};


export type MutationSendUniqueRatioPromocodeArgs = {
  input: SendUniqueRatioPromocodeInput;
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


export type MutationAddTelegramChatArgs = {
  input: AddTelegramChatInput;
};


export type MutationAddTelegramChatByInviteLinkArgs = {
  input: AddTelegramChatByInviteLinkInput;
};


export type MutationDeleteTelegramChatArgs = {
  id: Scalars['ID'];
};


export type MutationRefreshTelegramChatDataArgs = {
  id: Scalars['ID'];
};


export type MutationPostToTelegramChatArgs = {
  input: PostToTelegramChatInput;
};


export type MutationTildaImportArgs = {
  input: TildaImportInput;
};


export type MutationCreateCommunityLeadArgs = {
  input: CreateCommunityLeadInput;
};


export type MutationUpdateCommunityLeadArgs = {
  input: UpdateCommunityLeadInput;
};


export type MutationDeleteCommunityLeadArgs = {
  id: Scalars['ID'];
};


export type MutationBecomeCommunityLeadCuratorArgs = {
  input: BecomeCommunityLeadCuratorInput;
};


export type MutationClearCommunityLeadCuratorArgs = {
  input: ClearCommunityLeadCuratorInput;
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
  /** Номер карты */
  card_id: Scalars['Int'];
  subscription_until?: Maybe<Scalars['String']>;
  last_visit?: Maybe<Scalars['String']>;
  total_spent: Scalars['Int'];
  /** Приватность */
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

export type OfdDocument = {
  __typename?: 'OfdDocument';
  id: Scalars['ID'];
  document_id: Scalars['Int'];
  cash: Scalars['Float'];
  electronic: Scalars['Float'];
  check_type: Scalars['String'];
  items: Array<OfdDocumentItem>;
  created: Scalars['String'];
};

export type OfdDocumentConnection = {
  __typename?: 'OfdDocumentConnection';
  pageInfo: PageInfo;
  nodes: Array<OfdDocument>;
  edges: Array<OfdDocumentEdge>;
};

export type OfdDocumentEdge = {
  __typename?: 'OfdDocumentEdge';
  node: OfdDocument;
};

export type OfdDocumentItem = {
  __typename?: 'OfdDocumentItem';
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  sum: Scalars['Float'];
  product_type: Scalars['Int'];
  payment_type: Scalars['Int'];
};

export type OfdFiscalDrive = {
  __typename?: 'OfdFiscalDrive';
  id: Scalars['ID'];
  fiscal_drive_number: Scalars['String'];
};

export type OfdShift = {
  __typename?: 'OfdShift';
  id: Scalars['ID'];
  shift_id: Scalars['Int'];
  cash: Scalars['Float'];
  electronic: Scalars['Float'];
  close_dt?: Maybe<Scalars['String']>;
  open_dt: Scalars['String'];
};

export type OfdShiftConnection = {
  __typename?: 'OfdShiftConnection';
  pageInfo: PageInfo;
  nodes: Array<OfdShift>;
  edges: Array<OfdShiftEdge>;
};

export type OfdShiftEdge = {
  __typename?: 'OfdShiftEdge';
  node: OfdShift;
};

export type OfdShiftsFilterInput = {
  open_only?: Maybe<Scalars['Boolean']>;
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

export type PostToTelegramChatInput = {
  id: Scalars['ID'];
  message: Scalars['String'];
};

export type PostToTelegramChatResult = BasicResult;

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
  /** заголовок */
  title: Scalars['String'];
  meta: WagtailPageMeta;
  /** Описание активных проектов */
  active_description: Scalars['String'];
  projects: Array<ProjectPage>;
};


export type ProjectIndexPageProjectsArgs = {
  is_active?: Maybe<Scalars['Boolean']>;
};

export type ProjectPage = WagtailPage & {
  __typename?: 'ProjectPage';
  id: Scalars['ID'];
  /** заголовок */
  title: Scalars['String'];
  meta: WagtailPageMeta;
  /** Короткое описание */
  summary: Scalars['String'];
  /** Периодичность */
  activity_summary?: Maybe<Scalars['String']>;
  /** Активный */
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
  settings: Settings;
  /** @deprecated Use wagtailPageOrPrivate instead */
  wagtailPage?: Maybe<WagtailPage>;
  wagtailPageOrPrivate: WagtailPageOrPrivateResult;
  wagtailPages: Array<WagtailPage>;
  wagtailImage?: Maybe<WagtailImage>;
  wagtailImageSearch: WagtailImageSearchResult;
  wagtailBlockStructure: WagtailBlockStructure;
  wagtailRenderBlock: WagtailRenderBlockResult;
  search: SearchResult;
  wagtailCollectionsForImageUpload: Array<WagtailCollection>;
  authGroupsAll: Array<AuthGroup>;
  authPermissionsAll: Array<AuthPermission>;
  searchUsers: SearchUsersResult;
  zadarmaPbxCalls: ZadarmaPbxCallConnection;
  zadarmaPbxCall: ZadarmaPbxCall;
  importers: Array<Importer>;
  importer: Importer;
  now: NowInfo;
  cm2Customers: Cm2CustomerConnection;
  cm2Orders: Cm2OrderConnection;
  cm2Customer: Cm2Customer;
  cm2Order: Cm2Order;
  watchmenWatchmenAll: Array<WatchmenWatchman>;
  watchmenGradesAll: Array<WatchmenGrade>;
  watchmenShifts: Array<WatchmenShift>;
  kkmStatus: KkmStatusResult;
  ofdFiscalDrives: Array<OfdFiscalDrive>;
  ofdDocuments: OfdDocumentConnection;
  ofdShifts: OfdShiftConnection;
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
  ratioTicketType: RatioTicketType;
  ratioOrders: RatioOrderConnection;
  ratioTickets: RatioTicketConnection;
  ratioTicket: RatioTicket;
  mastermindDatingCohorts: Array<MastermindDatingCohort>;
  mastermindDatingCohortById: MastermindDatingCohort;
  projects: Array<ProjectPage>;
  specialOffer?: Maybe<SpecialOffer>;
  emailMailchimpCategoriesAll: Array<EmailMailchimpCategory>;
  emailSubscribeChannelsAll: Array<EmailSubscribeChannel>;
  imageTemplatesAll: Array<ImageTemplate>;
  imageTemplateBySlug: ImageTemplate;
  publicTelegramChats: Array<TelegramChat>;
  telegramChats: Array<TelegramChat>;
  allTelegramChats: Array<TelegramChat>;
  tildaPage?: Maybe<TildaPage>;
  tildaPages: Array<TildaPage>;
  externalServices: Array<ExternalService>;
  communityLeads: CommunityLeadConnection;
  my: My;
};


export type QueryWagtailPageArgs = {
  page_id?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
  preview_token?: Maybe<Scalars['String']>;
};


export type QueryWagtailPageOrPrivateArgs = {
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


export type QuerySearchUsersArgs = {
  input: SearchUsersInput;
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


export type QueryImporterArgs = {
  module_name: Scalars['String'];
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


export type QueryOfdDocumentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryOfdShiftsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  filter?: Maybe<OfdShiftsFilterInput>;
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
  filter?: Maybe<RatioTrainingsFilterInput>;
};


export type QueryRatioTrainingBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryRatioTrainingEmailPrototypeArgs = {
  training_id: Scalars['ID'];
  type: Scalars['String'];
};


export type QueryRatioTicketTypesArgs = {
  input: RatioTicketTypesInput;
};


export type QueryRatioTicketTypeArgs = {
  input: RatioTicketTypeInput;
};


export type QueryRatioOrdersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRatioTicketsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  filter?: Maybe<RatioTicketsFilterInput>;
};


export type QueryRatioTicketArgs = {
  id: Scalars['ID'];
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


export type QueryCommunityLeadsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  filter?: Maybe<CommunityLeadsFilterInput>;
};

export type RatioActivity = {
  __typename?: 'RatioActivity';
  id: Scalars['ID'];
  /** Время */
  time: Scalars['String'];
  /** Тип */
  activity_type: Scalars['String'];
  /** Название */
  name: Scalars['String'];
  /** Локация */
  location: Scalars['String'];
  trainer?: Maybe<RatioTrainer>;
};

export type RatioAddTicketInput = {
  training: Scalars['ID'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  payment_amount: Scalars['Int'];
  ticket_class?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
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
  city?: Maybe<Scalars['String']>;
  promocode?: Maybe<Scalars['String']>;
  payer?: Maybe<RatioCreateOrderPayerInput>;
};

export type RatioCreateOrderPayerInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type RatioCreateOrderResult = RatioOrder | ValidationError | GenericError;

export type RatioDeleteTrainingInput = {
  slug: Scalars['String'];
};

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
  payment: YandexKassaPayment;
  price: Scalars['Int'];
  promocode?: Maybe<RatioPromocode>;
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
  /** Размер оплаты */
  amount: Scalars['Int'];
  /** Вид оплаты */
  payment_type: Scalars['String'];
  /** Статус */
  status: Scalars['String'];
  /** Статус фискального чека */
  fiscalization_status: Scalars['String'];
  comment: Scalars['String'];
  /** Кастомный заголовок для чека */
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

export type RatioPromocode = {
  __typename?: 'RatioPromocode';
  id: Scalars['ID'];
  /** Промокод */
  code: Scalars['String'];
  /** Сумма скидки */
  discount: Scalars['Int'];
  /** Процент скидки */
  discount_percent: Scalars['Int'];
  /** Максимальное количество использований */
  uses_max?: Maybe<Scalars['Int']>;
  /** Количество использований */
  uses_count: Scalars['Int'];
  /** Создан для E-mail'а */
  for_email: Scalars['String'];
};

export type RatioPromocodeConnection = {
  __typename?: 'RatioPromocodeConnection';
  pageInfo: PageInfo;
  nodes: Array<RatioPromocode>;
  edges: Array<RatioPromocodeEdge>;
};

export type RatioPromocodeEdge = {
  __typename?: 'RatioPromocodeEdge';
  node: RatioPromocode;
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
  /** Имя */
  first_name: Scalars['String'];
  /** Фамилия */
  last_name?: Maybe<Scalars['String']>;
  /** Дата регистрации */
  registration_date?: Maybe<Scalars['String']>;
  /** Дата создания */
  created: Scalars['String'];
  /** Статус */
  status: Scalars['String'];
  /** Тип билета */
  ticket_class: Scalars['String'];
  /** Размер оплаты */
  payment_amount: Scalars['Int'];
  comment: Scalars['String'];
  notion_link: Scalars['String'];
  payments: Array<RatioPayment>;
  training: RatioTraining;
  ticket_type?: Maybe<RatioTicketType>;
  need_notion_link: Scalars['Boolean'];
};

export type RatioTicketConnection = {
  __typename?: 'RatioTicketConnection';
  pageInfo: PageInfo;
  nodes: Array<RatioTicket>;
  edges: Array<RatioTicketEdge>;
};

export type RatioTicketEdge = {
  __typename?: 'RatioTicketEdge';
  node: RatioTicket;
};

export type RatioTicketType = {
  __typename?: 'RatioTicketType';
  /** Стоимость */
  price: Scalars['Int'];
  /** Название */
  name: Scalars['String'];
  /** Сумма скидки одноразового промокода по E-mail'у */
  discount_by_email: Scalars['Int'];
  /** Процент скдики одноразового промокода по E-mail'у */
  discount_percent_by_email: Scalars['Int'];
  id: Scalars['ID'];
  training: RatioTraining;
  promocodes_count: Scalars['Int'];
  promocodes: RatioPromocodeConnection;
};


export type RatioTicketTypePromocodesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type RatioTicketTypeInput = {
  id: Scalars['ID'];
};

export type RatioTicketTypesInput = {
  id?: Maybe<Scalars['ID']>;
};

export type RatioTicketsFilterInput = {
  with_missing_payments?: Maybe<Scalars['Boolean']>;
  with_unfiscalized_checks?: Maybe<Scalars['Boolean']>;
  without_notion_link?: Maybe<Scalars['Boolean']>;
};

export type RatioTrainer = {
  __typename?: 'RatioTrainer';
  id: Scalars['ID'];
  /** Короткое имя */
  short_name: Scalars['String'];
  /** Длинное имя */
  long_name: Scalars['String'];
};

export type RatioTraining = {
  __typename?: 'RatioTraining';
  id: Scalars['ID'];
  /** Название */
  name: Scalars['String'];
  slug: Scalars['String'];
  /** Дата начала */
  date?: Maybe<Scalars['String']>;
  /** Телеграм-чат */
  telegram_link: Scalars['String'];
  salaries_paid: Scalars['Boolean'];
  /** Сумма скидки одноразового промокода по E-mail'у */
  discount_by_email: Scalars['Int'];
  /** Процент скдики одноразового промокода по E-mail'у */
  discount_percent_by_email: Scalars['Int'];
  promocode_email: Scalars['String'];
  new_ticket_email: Scalars['String'];
  notion_created_email: Scalars['String'];
  tickets: Array<RatioTicket>;
  schedule: Array<RatioTrainingDay>;
  ticket_types: Array<RatioTicketType>;
  tickets_count: Scalars['Int'];
  total_income: Scalars['Int'];
  promocodes_count: Scalars['Int'];
  promocodes: RatioPromocodeConnection;
};


export type RatioTrainingPromocodesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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
  /** Дата */
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

export type RatioTrainingsFilterInput = {
  eternal?: Maybe<Scalars['Boolean']>;
};

export type RefreshTelegramChatDataResult = TelegramChat;

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

export type SearchUsersInput = {
  query: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
};

export type SearchUsersResult = {
  __typename?: 'SearchUsersResult';
  results: Array<AuthUser>;
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

export type SendUniqueRatioPromocodeInput = {
  ticket_type_id?: Maybe<Scalars['ID']>;
  training_id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
};

export type SendUniqueRatioPromocodeResult = BasicResult | GenericError;

export type SetRatioTicketNotionLinkInput = {
  id: Scalars['ID'];
  notion_link: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  default_events_images_collection: WagtailCollection;
  default_events_vk_images_collection: WagtailCollection;
  weekly_digest_images_collection: WagtailCollection;
  telegram_images_collection: WagtailCollection;
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
  watchmenScheduleUpdates: WatchmenScheduleUpdateNotification;
  events: EventNotification;
};

export type TelegramChat = {
  __typename?: 'TelegramChat';
  id: Scalars['ID'];
  username: Scalars['String'];
  title: Scalars['String'];
  photo?: Maybe<WagtailImageRendition>;
  project?: Maybe<ProjectPage>;
  link: Scalars['String'];
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

export type UpdateCommunityLeadInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type UpdateCommunityLeadResult = CommunityLead | ValidationError | GenericError;

export type UpdateRatioTicketInput = {
  id: Scalars['ID'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  notion_link?: Maybe<Scalars['String']>;
};

export type UpdateRatioTicketTypeInput = {
  id: Scalars['ID'];
  price?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  discount_by_email?: Maybe<Scalars['Int']>;
  discount_percent_by_email?: Maybe<Scalars['Int']>;
};

export type UpdateRatioTrainingInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  telegram_link?: Maybe<Scalars['String']>;
  discount_by_email?: Maybe<Scalars['Int']>;
  discount_percent_by_email?: Maybe<Scalars['Int']>;
  promocode_email?: Maybe<Scalars['String']>;
  new_ticket_email?: Maybe<Scalars['String']>;
  notion_created_email?: Maybe<Scalars['String']>;
};

export type UpdateRatioTrainingResult = RatioTraining | ValidationError | GenericError;

export type UpdateSettingsInput = {
  default_events_images_collection?: Maybe<Scalars['ID']>;
  default_events_vk_images_collection?: Maybe<Scalars['ID']>;
  weekly_digest_images_collection?: Maybe<Scalars['ID']>;
  telegram_images_collection?: Maybe<Scalars['ID']>;
};

export type UpdateYandexKassaPaymentInput = {
  id: Scalars['ID'];
};

export type UpdateYandexKassaPaymentResult = YandexKassaPayment | GenericError;

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

export type WagtailCollection = {
  __typename?: 'WagtailCollection';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type WagtailCollectionPermission = {
  __typename?: 'WagtailCollectionPermission';
  id: Scalars['ID'];
  permission: AuthPermission;
  collection: WagtailCollection;
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

export type WagtailPageContainer = {
  __typename?: 'WagtailPageContainer';
  page?: Maybe<WagtailPage>;
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

export type WagtailPageOrPrivateResult = WagtailPageContainer | WagtailPagePrivate;

export type WagtailPagePermission = WagtailRootPagePermission | WagtailSpecificPagePermission;

export type WagtailPagePermissions = {
  __typename?: 'WagtailPagePermissions';
  can_edit: Scalars['Boolean'];
};

export type WagtailPagePrivate = {
  __typename?: 'WagtailPagePrivate';
  message: Scalars['String'];
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

export type WagtailRootPagePermission = {
  __typename?: 'WagtailRootPagePermission';
  id: Scalars['ID'];
  permission_type: Scalars['String'];
};

export type WagtailSpecificPagePermission = {
  __typename?: 'WagtailSpecificPagePermission';
  id: Scalars['ID'];
  permission_type: Scalars['String'];
  page: WagtailPage;
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
  collection_id: Scalars['String'];
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
  /** Код */
  code: Scalars['String'];
  /** Повышающий коэффициент */
  multiplier: Scalars['Float'];
};

export type WatchmenScheduleUpdateNotification = {
  __typename?: 'WatchmenScheduleUpdateNotification';
  updated: Scalars['Boolean'];
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

export type YandexKassaPayment = {
  __typename?: 'YandexKassaPayment';
  id: Scalars['ID'];
  kassa_id: Scalars['String'];
  is_paid: Scalars['Boolean'];
  status: YandexKassaPaymentStatus;
  waiting_for_capture: Scalars['Boolean'];
};

export enum YandexKassaPaymentStatus {
  Pending = 'pending',
  WaitingForCapture = 'waiting_for_capture',
  Succeeded = 'succeeded',
  Canceled = 'canceled'
}

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
