export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type AnalyticsBovStat = {
   __typename?: 'AnalyticsBovStat',
  date: Scalars['String'],
  count: Scalars['Int'],
  total_income: Scalars['Int'],
};

export type AuthCurrentUser = {
   __typename?: 'AuthCurrentUser',
  is_authenticated: Scalars['Boolean'],
  email?: Maybe<Scalars['String']>,
  is_staff?: Maybe<Scalars['Boolean']>,
  permissions: Array<Scalars['String']>,
};

export type AuthGroup = {
   __typename?: 'AuthGroup',
  id: Scalars['ID'],
  name: Scalars['String'],
  permissions: Array<AuthPermission>,
  users: Array<AuthUser>,
};

/** 
 * Either `token` or `email`+`password` must be set.
 * (GraphQL doesn't support union inputs yet; see
 * https://github.com/graphql/graphql-spec/blob/master/rfcs/InputUnion.md for details.)
 */
export type AuthLoginCredentialsInput = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  token?: Maybe<Scalars['String']>,
};

export type AuthLoginInput = {
  credentials: AuthLoginCredentialsInput,
  /** Must be `cookie`; other results, e.g. `access_token` or `jwt`, might be supported later. */
  result: Scalars['String'],
};

export type AuthLoginResult = {
   __typename?: 'AuthLoginResult',
  error?: Maybe<Scalars['String']>,
  user?: Maybe<AuthCurrentUser>,
  registered?: Maybe<Scalars['Boolean']>,
};

export type AuthLogoutResult = {
   __typename?: 'AuthLogoutResult',
  ok?: Maybe<Scalars['Boolean']>,
};

export type AuthPermission = {
   __typename?: 'AuthPermission',
  id: Scalars['ID'],
  name: Scalars['String'],
  users: Array<AuthUser>,
};

export type AuthSendMagicLinkInput = {
  email: Scalars['String'],
  next?: Maybe<Scalars['String']>,
};

export type AuthSendMagicLinkResult = {
   __typename?: 'AuthSendMagicLinkResult',
  ok?: Maybe<Scalars['Boolean']>,
  error?: Maybe<Scalars['String']>,
};

export type AuthSetPasswordInput = {
  /** required if old password exists */
  old_password?: Maybe<Scalars['String']>,
  new_password: Scalars['String'],
};

/** TODO - generalize into "SimpleMutationResult"? */
export type AuthSetPasswordResult = {
   __typename?: 'AuthSetPasswordResult',
  error?: Maybe<Scalars['String']>,
  ok?: Maybe<Scalars['Boolean']>,
};

export type AuthUser = {
   __typename?: 'AuthUser',
  id: Scalars['ID'],
  email: Scalars['String'],
  staff_member?: Maybe<StaffMember>,
};

export type BasicLeadBlock = WagtailBlock & {
   __typename?: 'BasicLeadBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type BasicParagraphBlock = WagtailBlock & {
   __typename?: 'BasicParagraphBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type BigContactsBlock = WagtailBlock & {
   __typename?: 'BigContactsBlock',
  id: Scalars['ID'],
  value: BigContactsBlockValue,
};

export type BigContactsBlockValue = {
   __typename?: 'BigContactsBlockValue',
  map: WagtailGeo,
  address: Scalars['String'],
  phone: Scalars['String'],
  email: Scalars['String'],
  text: Scalars['String'],
};

export type BlogIndexPage = WagtailPage & {
   __typename?: 'BlogIndexPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  subtitle: Scalars['String'],
  posts: Array<BlogPostPage>,
};

export type BlogPostAuthor = {
   __typename?: 'BlogPostAuthor',
  name: Scalars['String'],
  description: Scalars['String'],
  image: WagtailImage,
};


export type BlogPostAuthorImageArgs = {
  spec: Scalars['String']
};

export type BlogPostPage = WagtailPage & {
   __typename?: 'BlogPostPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  date: Scalars['String'],
  authors: Array<BlogPostAuthor>,
  body: Scalars['String'],
  summary: Scalars['String'],
};

export type CashierCreatePaymentInput = {
  amount: Scalars['Int'],
  whom: Scalars['ID'],
  comment: Scalars['String'],
};

export type CashierPayment = {
   __typename?: 'CashierPayment',
  id: Scalars['ID'],
  whom: AuthUser,
  amount: Scalars['Int'],
  created_dt: Scalars['String'],
  redeem_dt?: Maybe<Scalars['String']>,
  comment: Scalars['String'],
  is_redeemed: Scalars['Boolean'],
};

export type CashierPaymentConnection = {
   __typename?: 'CashierPaymentConnection',
  pageInfo: PageInfo,
  nodes: Array<CashierPayment>,
  edges: Array<CashierPaymentEdge>,
};

export type CashierPaymentEdge = {
   __typename?: 'CashierPaymentEdge',
  node: CashierPayment,
};

export type Cm2CreateCustomerInput = {
  card_id: Scalars['Int'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
};

export type Cm2CreateOrderInput = {
  customer?: Maybe<Scalars['ID']>,
};

export type Cm2Customer = {
   __typename?: 'Cm2Customer',
  id: Scalars['ID'],
  card_id: Scalars['Int'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  orders: Cm2OrderConnection,
};


export type Cm2CustomerOrdersArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type Cm2CustomerConnection = {
   __typename?: 'Cm2CustomerConnection',
  pageInfo: PageInfo,
  edges: Array<Cm2CustomerEdge>,
};

export type Cm2CustomerEdge = {
   __typename?: 'Cm2CustomerEdge',
  node: Cm2Customer,
};

export type Cm2Order = {
   __typename?: 'Cm2Order',
  id: Scalars['ID'],
  start: Scalars['String'],
  end?: Maybe<Scalars['String']>,
  customer?: Maybe<Cm2Customer>,
  value: Scalars['Int'],
};

export type Cm2OrderConnection = {
   __typename?: 'Cm2OrderConnection',
  pageInfo: PageInfo,
  edges: Array<Cm2OrderEdge>,
};

export type Cm2OrderEdge = {
   __typename?: 'Cm2OrderEdge',
  node: Cm2Order,
};

export type ColumnsBasicBlock = WagtailBlock & {
   __typename?: 'ColumnsBasicBlock',
  id: Scalars['ID'],
  value: Array<ColumnsBasicBlockColumn>,
};

export type ColumnsBasicBlockColumn = {
   __typename?: 'ColumnsBasicBlockColumn',
  header: Scalars['String'],
  text?: Maybe<Scalars['String']>,
};

export type ColumnsButtonsBlock = WagtailBlock & {
   __typename?: 'ColumnsButtonsBlock',
  id: Scalars['ID'],
  value: Array<ColumnsButtonsBlockColumn>,
};

export type ColumnsButtonsBlockColumn = {
   __typename?: 'ColumnsButtonsBlockColumn',
  title: Scalars['String'],
  caption: Scalars['String'],
  link: Scalars['String'],
};

export type ColumnsMembershipsBlock = WagtailBlock & {
   __typename?: 'ColumnsMembershipsBlock',
  id: Scalars['ID'],
  value: Array<ColumnsMembershipsBlockColumn>,
};

export type ColumnsMembershipsBlockColumn = {
   __typename?: 'ColumnsMembershipsBlockColumn',
  title: Scalars['String'],
  subtitle: Scalars['String'],
  price: Scalars['Int'],
  description: Scalars['String'],
};

export type EmailMailchimpCategory = {
   __typename?: 'EmailMailchimpCategory',
  id: Scalars['ID'],
  title: Scalars['String'],
  category_id: Scalars['String'],
  interests: Array<EmailMailchimpInterest>,
};

export type EmailMailchimpInterest = {
   __typename?: 'EmailMailchimpInterest',
  id: Scalars['ID'],
  interest_id: Scalars['String'],
  name: Scalars['String'],
  subscriber_count: Scalars['Int'],
};

export type EmailSubscribeChannel = {
   __typename?: 'EmailSubscribeChannel',
  id: Scalars['ID'],
  slug: Scalars['String'],
  interests: Array<EmailMailchimpInterest>,
};

export type EmailSubscribeChannelCreateInput = {
  slug: Scalars['String'],
  interest_ids: Array<Scalars['ID']>,
};

export type EventGenerateZoomLinkInput = {
  event_id: Scalars['ID'],
};

export type EventGenerateZoomLinkResult = {
   __typename?: 'EventGenerateZoomLinkResult',
  ok?: Maybe<Scalars['Boolean']>,
};

export type EventsAnnouncements = {
   __typename?: 'EventsAnnouncements',
  timepad?: Maybe<EventsTimepadAnnouncement>,
};

export type EventSetPricingTypeInput = {
  event_id: Scalars['ID'],
  pricing_type: Scalars['String'],
};

export type EventSetPricingTypeResult = {
   __typename?: 'EventSetPricingTypeResult',
  ok?: Maybe<Scalars['Boolean']>,
};

export type EventSetRealmInput = {
  event_id: Scalars['ID'],
  realm: Scalars['String'],
};

export type EventSetRealmResult = {
   __typename?: 'EventSetRealmResult',
  ok?: Maybe<Scalars['Boolean']>,
};

export type EventSetZoomLinkInput = {
  event_id: Scalars['ID'],
  zoom_link: Scalars['String'],
};

export type EventSetZoomLinkResult = {
   __typename?: 'EventSetZoomLinkResult',
  ok?: Maybe<Scalars['Boolean']>,
};

export type EventsEvent = {
   __typename?: 'EventsEvent',
  event_id: Scalars['ID'],
  title: Scalars['String'],
  start: Scalars['String'],
  /** all EventsEvent are staff-only, but this can change in the future */
  tickets: Array<EventsTicket>,
};

export type EventsEventConnection = {
   __typename?: 'EventsEventConnection',
  pageInfo: PageInfo,
  edges: Array<EventsEventEdge>,
  nodes: Array<EventsEvent>,
};

export type EventsEventEdge = {
   __typename?: 'EventsEventEdge',
  node: EventsEvent,
};

export type EventsListBlock = WagtailBlock & {
   __typename?: 'EventsListBlock',
  id: Scalars['ID'],
  events: Array<EventsPublicEvent>,
};

export type EventsPublicEvent = {
   __typename?: 'EventsPublicEvent',
  event_id: Scalars['ID'],
  start: Scalars['String'],
  end: Scalars['String'],
  title: Scalars['String'],
  summary: Scalars['String'],
  description: Scalars['String'],
  image?: Maybe<Scalars['String']>,
  registration_type: Scalars['String'],
  pricing_type: Scalars['String'],
  realm: Scalars['String'],
  project?: Maybe<ProjectPage>,
  announcements: EventsAnnouncements,
  /** note that there's no @auth directive - we don't want any errors if user is not authenticated */
  my_ticket?: Maybe<MyEventsTicket>,
};

export type EventsPublicEventConnection = {
   __typename?: 'EventsPublicEventConnection',
  pageInfo: PageInfo,
  edges: Array<EventsPublicEventEdge>,
  nodes: Array<EventsPublicEvent>,
};

export type EventsPublicEventEdge = {
   __typename?: 'EventsPublicEventEdge',
  node: EventsPublicEvent,
};

export type EventsTicket = {
   __typename?: 'EventsTicket',
  id: Scalars['ID'],
  status: Scalars['String'],
  user: AuthUser,
};

export type EventsTimepadAnnouncement = {
   __typename?: 'EventsTimepadAnnouncement',
  link: Scalars['String'],
};

export type FaqEntry = {
   __typename?: 'FaqEntry',
  id: Scalars['ID'],
  question: Scalars['String'],
  answer: Scalars['String'],
};

export type FaqPage = WagtailPage & {
   __typename?: 'FaqPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  summary: Scalars['String'],
  prev_page?: Maybe<FaqPage>,
  next_page?: Maybe<FaqPage>,
  entries: Array<FaqEntry>,
  subpages: Array<FaqPage>,
};

export type FreeFormPage = WagtailPage & {
   __typename?: 'FreeFormPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  body: Array<WagtailBlock>,
};

export type GreyBlock = WagtailBlock & {
   __typename?: 'GreyBlock',
  id: Scalars['ID'],
  value: GreyBlockValue,
};

export type GreyBlockValue = {
   __typename?: 'GreyBlockValue',
  header: Scalars['String'],
  text?: Maybe<Scalars['String']>,
};

export type HeroFrontBlock = WagtailBlock & {
   __typename?: 'HeroFrontBlock',
  id: Scalars['ID'],
  value: HeroFrontBlockValue,
};

export type HeroFrontBlockFeature = {
   __typename?: 'HeroFrontBlockFeature',
  title: Scalars['String'],
  link?: Maybe<Scalars['String']>,
  items: Array<HeroFrontBlockItem>,
};

export type HeroFrontBlockItem = {
   __typename?: 'HeroFrontBlockItem',
  text: Scalars['String'],
  link?: Maybe<Scalars['String']>,
};

export type HeroFrontBlockValue = {
   __typename?: 'HeroFrontBlockValue',
  title: Scalars['String'],
  features: Array<HeroFrontBlockFeature>,
};

export type ImageTemplate = {
   __typename?: 'ImageTemplate',
  name: Scalars['ID'],
  schema: ImageTemplateSchema,
  sizes: ImageTemplateSizes,
};

export type ImageTemplateSchema = {
   __typename?: 'ImageTemplateSchema',
  fields: Array<ImageTemplateSchemaField>,
};

export type ImageTemplateSchemaField = {
   __typename?: 'ImageTemplateSchemaField',
  name: Scalars['String'],
  value_type: Scalars['String'],
  default?: Maybe<Scalars['String']>,
};

export type ImageTemplateSizes = {
   __typename?: 'ImageTemplateSizes',
  width: Scalars['Int'],
  height: Scalars['Int'],
};

export type KkmRegisterCheckInput = {
  email: Scalars['String'],
  title: Scalars['String'],
  sum: Scalars['Int'],
  sign_method_calculation: Scalars['Int'],
};

export type KkmRegisterCheckResult = {
   __typename?: 'KkmRegisterCheckResult',
  status: Scalars['Int'],
  url?: Maybe<Scalars['String']>,
  error?: Maybe<Scalars['String']>,
};

export type MailchimpSubscribeBlock = WagtailBlock & {
   __typename?: 'MailchimpSubscribeBlock',
  id: Scalars['ID'],
  value: MailchimpSubscribeBlockValue,
};

export type MailchimpSubscribeBlockValue = {
   __typename?: 'MailchimpSubscribeBlockValue',
  news: Scalars['Boolean'],
  events: Scalars['Boolean'],
  trainings: Scalars['Boolean'],
};

export type MastermindDatingCohort = {
   __typename?: 'MastermindDatingCohort',
  id: Scalars['ID'],
  leader_telegram_uid?: Maybe<Scalars['String']>,
  event?: Maybe<EventsEvent>,
  participants: Array<MastermindDatingParticipant>,
  groups: Array<MastermindDatingGroup>,
};

export type MastermindDatingCohortMutationResult = {
   __typename?: 'MastermindDatingCohortMutationResult',
  cohort: MastermindDatingCohort,
};

export type MastermindDatingGroup = {
   __typename?: 'MastermindDatingGroup',
  id: Scalars['ID'],
  telegram_invite_link: Scalars['String'],
  participants: Array<MastermindDatingParticipant>,
};

export type MastermindDatingParticipant = {
   __typename?: 'MastermindDatingParticipant',
  id: Scalars['ID'],
  cohort: MastermindDatingCohort,
  user: AuthUser,
  name?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['String']>,
  photo?: Maybe<Scalars['String']>,
  voted_for: Scalars['Boolean'],
  present: Scalars['Boolean'],
  invite_email_sent: Scalars['Boolean'],
};

export type MastermindDatingParticipantMutationResult = {
   __typename?: 'MastermindDatingParticipantMutationResult',
  participant: MastermindDatingParticipant,
};

export type MastermindDatingTrivialMutationResult = {
   __typename?: 'MastermindDatingTrivialMutationResult',
  ok?: Maybe<Scalars['Boolean']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['Boolean']>,
  authAddUserToGroup?: Maybe<Scalars['Boolean']>,
  authRemoveUserFromGroup?: Maybe<Scalars['Boolean']>,
  authLogin: AuthLoginResult,
  authSetPassword: AuthSetPasswordResult,
  authLogout: AuthLogoutResult,
  authSendMagicLink: AuthSendMagicLinkResult,
  zadarmaSetMemberForPbxCall?: Maybe<Scalars['Boolean']>,
  myPrivacyModeSet?: Maybe<Scalars['Boolean']>,
  cm2CreateOrder: Cm2Order,
  cm2CreateCustomer: Cm2Customer,
  cm2CloseOrder?: Maybe<Scalars['Boolean']>,
  watchmenCreateWatchman?: Maybe<Scalars['Boolean']>,
  watchmenUpdateShift: WatchmenShift,
  watchmenSetWatchmanPriority?: Maybe<Scalars['Boolean']>,
  watchmenSetWatchmanGrade?: Maybe<Scalars['Boolean']>,
  cashierCreatePayment?: Maybe<Scalars['Boolean']>,
  cashierRedeemPayment?: Maybe<Scalars['Boolean']>,
  kkmRegisterCheck: KkmRegisterCheckResult,
  myEventsTicketUnregister: MyEventsTicket,
  myEventsTicketRegister: MyEventsTicket,
  myEventsTicketRegisterAnon: MyEventsTicket,
  eventSetRealm: EventSetRealmResult,
  eventSetPricingType: EventSetPricingTypeResult,
  eventSetZoomLink: EventSetZoomLinkResult,
  eventGenerateZoomLink: EventGenerateZoomLinkResult,
  staffGrantGooglePermissionsToMember?: Maybe<Scalars['Boolean']>,
  staffFireMember?: Maybe<Scalars['Boolean']>,
  staffUnfireMember?: Maybe<Scalars['Boolean']>,
  ratioAddTraining: RatioTraining,
  ratioAddTicket: RatioTicket,
  ratioTrainingCopyScheduleFrom?: Maybe<Scalars['Boolean']>,
  ratioTrainingAddDay?: Maybe<Scalars['Boolean']>,
  ratioTicketFiscalize?: Maybe<Scalars['Boolean']>,
  ratioTrainingSyncParticipantsToMailchimp?: Maybe<Scalars['Boolean']>,
  ratioTrainingSendEmail: RatioTrainingSendEmailResult,
  mastermindDatingCreateCohort: MastermindDatingCohortMutationResult,
  mastermindDatingSetEventForCohort: MastermindDatingCohortMutationResult,
  mastermindDatingUnsetEventForCohort: MastermindDatingCohortMutationResult,
  mastermindDatingPopulateCohortFromEvent: MastermindDatingCohortMutationResult,
  mastermindDatingSendInviteEmails: MastermindDatingCohortMutationResult,
  mastermindDatingCreateGroup: MastermindDatingCohortMutationResult,
  mastermindDatingClearAllGroups: MastermindDatingCohortMutationResult,
  mastermindDatingRunSolver: MastermindDatingCohortMutationResult,
  mastermindDatingBroadcastSolution: MastermindDatingCohortMutationResult,
  mastermindDatingDeleteCohort: MastermindDatingTrivialMutationResult,
  mastermindDatingCreateParticipant: MastermindDatingParticipantMutationResult,
  mastermindDatingActivateVoting: MastermindDatingParticipantMutationResult,
  mastermindDatingSetPresenceStatus: MastermindDatingParticipantMutationResult,
  emailSubscribeChannelDelete?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelCreate?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelAddEmail?: Maybe<Scalars['Boolean']>,
  myEmailResubscribe?: Maybe<Scalars['Boolean']>,
  myEmailUnsubscribe?: Maybe<Scalars['Boolean']>,
  myEmailSubscribeToInterest?: Maybe<Scalars['Boolean']>,
  myEmailUnsubscribeFromInterest?: Maybe<Scalars['Boolean']>,
};


export type MutationAuthAddUserToGroupArgs = {
  group_id: Scalars['ID'],
  user_id: Scalars['ID']
};


export type MutationAuthRemoveUserFromGroupArgs = {
  group_id: Scalars['ID'],
  user_id: Scalars['ID']
};


export type MutationAuthLoginArgs = {
  input: AuthLoginInput
};


export type MutationAuthSetPasswordArgs = {
  input: AuthSetPasswordInput
};


export type MutationAuthSendMagicLinkArgs = {
  input: AuthSendMagicLinkInput
};


export type MutationZadarmaSetMemberForPbxCallArgs = {
  member_id: Scalars['ID'],
  pbx_call_id: Scalars['ID']
};


export type MutationMyPrivacyModeSetArgs = {
  mode: Scalars['String']
};


export type MutationCm2CreateOrderArgs = {
  input: Cm2CreateOrderInput
};


export type MutationCm2CreateCustomerArgs = {
  input: Cm2CreateCustomerInput
};


export type MutationCm2CloseOrderArgs = {
  id: Scalars['ID']
};


export type MutationWatchmenCreateWatchmanArgs = {
  params: WatchmenCreateWatchmanInput
};


export type MutationWatchmenUpdateShiftArgs = {
  params: WatchmenUpdateShiftInput
};


export type MutationWatchmenSetWatchmanPriorityArgs = {
  params: WatchmenSetWatchmanPriorityInput
};


export type MutationWatchmenSetWatchmanGradeArgs = {
  params: WatchmenSetWatchmanGradeInput
};


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput
};


export type MutationCashierRedeemPaymentArgs = {
  id: Scalars['ID']
};


export type MutationKkmRegisterCheckArgs = {
  params: KkmRegisterCheckInput
};


export type MutationMyEventsTicketUnregisterArgs = {
  event_id: Scalars['ID']
};


export type MutationMyEventsTicketRegisterArgs = {
  event_id: Scalars['ID']
};


export type MutationMyEventsTicketRegisterAnonArgs = {
  input: MyEventsTicketRegisterAnonInput
};


export type MutationEventSetRealmArgs = {
  input: EventSetRealmInput
};


export type MutationEventSetPricingTypeArgs = {
  input: EventSetPricingTypeInput
};


export type MutationEventSetZoomLinkArgs = {
  input: EventSetZoomLinkInput
};


export type MutationEventGenerateZoomLinkArgs = {
  input: EventGenerateZoomLinkInput
};


export type MutationStaffGrantGooglePermissionsToMemberArgs = {
  id: Scalars['ID']
};


export type MutationStaffFireMemberArgs = {
  id: Scalars['ID']
};


export type MutationStaffUnfireMemberArgs = {
  id: Scalars['ID']
};


export type MutationRatioAddTrainingArgs = {
  params: RatioAddTrainingInput
};


export type MutationRatioAddTicketArgs = {
  input: RatioAddTicketInput
};


export type MutationRatioTrainingCopyScheduleFromArgs = {
  params: RatioTrainingCopyScheduleFromInput
};


export type MutationRatioTrainingAddDayArgs = {
  params: RatioTrainingAddDayInput
};


export type MutationRatioTicketFiscalizeArgs = {
  ticket_id: Scalars['ID']
};


export type MutationRatioTrainingSyncParticipantsToMailchimpArgs = {
  training_id: Scalars['ID']
};


export type MutationRatioTrainingSendEmailArgs = {
  input: RatioTrainingSendEmailInput
};


export type MutationMastermindDatingSetEventForCohortArgs = {
  cohort_id: Scalars['ID'],
  event_id: Scalars['String']
};


export type MutationMastermindDatingUnsetEventForCohortArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingPopulateCohortFromEventArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingSendInviteEmailsArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingCreateGroupArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingClearAllGroupsArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingRunSolverArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingBroadcastSolutionArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingDeleteCohortArgs = {
  cohort_id: Scalars['ID']
};


export type MutationMastermindDatingCreateParticipantArgs = {
  cohort_id: Scalars['ID'],
  email: Scalars['String']
};


export type MutationMastermindDatingActivateVotingArgs = {
  participant_id: Scalars['ID']
};


export type MutationMastermindDatingSetPresenceStatusArgs = {
  participant_id: Scalars['ID'],
  present: Scalars['Boolean']
};


export type MutationEmailSubscribeChannelDeleteArgs = {
  slug: Scalars['String']
};


export type MutationEmailSubscribeChannelCreateArgs = {
  params: EmailSubscribeChannelCreateInput
};


export type MutationEmailSubscribeChannelAddEmailArgs = {
  slug: Scalars['String'],
  email: Scalars['String']
};


export type MutationMyEmailSubscribeToInterestArgs = {
  interest_id: Scalars['ID']
};


export type MutationMyEmailUnsubscribeFromInterestArgs = {
  interest_id: Scalars['ID']
};

export type My = {
   __typename?: 'My',
  _?: Maybe<Scalars['Boolean']>,
  user: AuthCurrentUser,
  membership?: Maybe<MyCmCustomer>,
  tickets: MyEventsTicketConnection,
  email_subscription: MyEmailSubscription,
};


export type MyTicketsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type MyCmCustomer = {
   __typename?: 'MyCmCustomer',
  card_id: Scalars['Int'],
  subscription_until?: Maybe<Scalars['String']>,
  last_visit?: Maybe<Scalars['String']>,
  total_spent: Scalars['Int'],
  privacy_mode: Scalars['String'],
  orders_count: Scalars['Int'],
  orders: Array<MyCmOrder>,
};

export type MyCmOrder = {
   __typename?: 'MyCmOrder',
  order_id: Scalars['ID'],
  start_dt: Scalars['String'],
  end_dt?: Maybe<Scalars['String']>,
};

export type MyEmailSubscription = {
   __typename?: 'MyEmailSubscription',
  status: Scalars['String'],
  interests?: Maybe<Array<MyEmailSubscriptionInterest>>,
};

export type MyEmailSubscriptionInterest = {
   __typename?: 'MyEmailSubscriptionInterest',
  id: Scalars['ID'],
  name: Scalars['String'],
  subscribed?: Maybe<Scalars['Boolean']>,
};

export type MyEventsTicket = {
   __typename?: 'MyEventsTicket',
  event: EventsPublicEvent,
  status: Scalars['String'],
  created?: Maybe<Scalars['String']>,
  zoom_link?: Maybe<Scalars['String']>,
};

export type MyEventsTicketConnection = {
   __typename?: 'MyEventsTicketConnection',
  pageInfo: PageInfo,
  edges: Array<MyEventsTicketEdge>,
  nodes: Array<MyEventsTicket>,
};

export type MyEventsTicketEdge = {
   __typename?: 'MyEventsTicketEdge',
  node: MyEventsTicket,
};

export type MyEventsTicketRegisterAnonInput = {
  event_id: Scalars['ID'],
  email: Scalars['String'],
  subscribed_to_newsletter?: Maybe<Scalars['Boolean']>,
};

export type NowCustomer = {
   __typename?: 'NowCustomer',
  card_id: Scalars['Int'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
};

export type NowInfo = {
   __typename?: 'NowInfo',
  total: Scalars['Int'],
  customers: Array<NowCustomer>,
};

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type PhotoRibbonBlock = WagtailBlock & {
   __typename?: 'PhotoRibbonBlock',
  id: Scalars['ID'],
  value: Array<WagtailImage>,
};


export type PhotoRibbonBlockValueArgs = {
  spec: Scalars['String']
};

export type ProjectIndexPage = WagtailPage & {
   __typename?: 'ProjectIndexPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  projects: Array<ProjectPage>,
};

export type ProjectPage = WagtailPage & {
   __typename?: 'ProjectPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  summary: Scalars['String'],
  activity_summary?: Maybe<Scalars['String']>,
  body: Scalars['String'],
  is_active: Scalars['Boolean'],
  upcoming_events: Array<EventsPublicEvent>,
  image: WagtailImage,
};


export type ProjectPageImageArgs = {
  spec: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  rooms: Array<Maybe<Room>>,
  my: My,
  wagtailPage?: Maybe<WagtailPage>,
  authGroupsAll: Array<AuthGroup>,
  authPermissionsAll: Array<AuthPermission>,
  zadarmaPbxCalls: ZadarmaPbxCallConnection,
  zadarmaPbxCall: ZadarmaPbxCall,
  now: NowInfo,
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
  watchmenWatchmenAll: Array<WatchmenWatchman>,
  watchmenGradesAll: Array<WatchmenGrade>,
  watchmenShifts: Array<WatchmenShift>,
  cashierPayments: CashierPaymentConnection,
  analyticsBovStats: Array<AnalyticsBovStat>,
  events: EventsEventConnection,
  event?: Maybe<EventsEvent>,
  publicEvents: EventsPublicEventConnection,
  publicEvent: EventsPublicEvent,
  staffMembersAll: Array<StaffMember>,
  staffMember: StaffMember,
  ratioTrainings: RatioTrainingConnection,
  ratioTrainingBySlug: RatioTraining,
  ratioTrainersAll: Array<RatioTrainer>,
  ratioTrainingEmailPrototype: Scalars['String'],
  mastermindDatingCohorts: Array<MastermindDatingCohort>,
  mastermindDatingCohortById: MastermindDatingCohort,
  emailMailchimpCategoriesAll: Array<EmailMailchimpCategory>,
  emailSubscribeChannelsAll: Array<EmailSubscribeChannel>,
  imageTemplatesAll: Array<ImageTemplate>,
  imageTemplateBySlug: ImageTemplate,
  tildaPage?: Maybe<TildaPage>,
  tildaPages: Array<TildaPage>,
};


export type QueryWagtailPageArgs = {
  path?: Maybe<Scalars['String']>,
  preview_token?: Maybe<Scalars['String']>
};


export type QueryZadarmaPbxCallsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryZadarmaPbxCallArgs = {
  pbx_call_id: Scalars['ID']
};


export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryCm2CustomerArgs = {
  id: Scalars['ID']
};


export type QueryCm2OrderArgs = {
  id: Scalars['ID']
};


export type QueryWatchmenWatchmenAllArgs = {
  currentStaff?: Maybe<Scalars['Boolean']>,
  currentRole?: Maybe<Scalars['Boolean']>
};


export type QueryWatchmenShiftsArgs = {
  from_date: Scalars['String'],
  to_date: Scalars['String']
};


export type QueryCashierPaymentsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryEventsArgs = {
  search?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryEventArgs = {
  event_id: Scalars['ID']
};


export type QueryPublicEventsArgs = {
  from_date?: Maybe<Scalars['String']>,
  project_id?: Maybe<Scalars['ID']>,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryPublicEventArgs = {
  event_id: Scalars['ID']
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
};


export type QueryRatioTrainingsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryRatioTrainingBySlugArgs = {
  slug: Scalars['String']
};


export type QueryRatioTrainingEmailPrototypeArgs = {
  training_id: Scalars['ID'],
  type: Scalars['String']
};


export type QueryMastermindDatingCohortByIdArgs = {
  id: Scalars['ID']
};


export type QueryImageTemplateBySlugArgs = {
  slug: Scalars['String']
};


export type QueryTildaPageArgs = {
  path: Scalars['String']
};

export type RatioActivity = {
   __typename?: 'RatioActivity',
  id: Scalars['ID'],
  time: Scalars['String'],
  activity_type: Scalars['String'],
  name: Scalars['String'],
  location: Scalars['String'],
  trainer?: Maybe<RatioTrainer>,
};

export type RatioAddTicketInput = {
  training: Scalars['ID'],
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name?: Maybe<Scalars['String']>,
  payment_amount: Scalars['Int'],
  status: Scalars['String'],
  fiscalization_status: Scalars['String'],
  ticket_type: Scalars['String'],
  payment_type: Scalars['String'],
  comment?: Maybe<Scalars['String']>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type RatioAddTrainingInput = {
  name: Scalars['String'],
  slug: Scalars['String'],
  date: Scalars['String'],
  telegram_link: Scalars['String'],
};

export type RatioBriefingBlock = WagtailBlock & {
   __typename?: 'RatioBriefingBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type RatioExerciseBlock = WagtailBlock & {
   __typename?: 'RatioExerciseBlock',
  id: Scalars['ID'],
  value: RatioExerciseBlockValue,
};

export type RatioExerciseBlockValue = {
   __typename?: 'RatioExerciseBlockValue',
  header: Scalars['String'],
  lines_count: Scalars['Int'],
  enumerate?: Maybe<Scalars['Boolean']>,
};

export type RatioExerciseOnelineBlock = WagtailBlock & {
   __typename?: 'RatioExerciseOnelineBlock',
  id: Scalars['ID'],
  value: RatioExerciseOnelineBlockValue,
};

export type RatioExerciseOnelineBlockValue = {
   __typename?: 'RatioExerciseOnelineBlockValue',
  text: Scalars['String'],
};

export type RatioHeaderBlock = WagtailBlock & {
   __typename?: 'RatioHeaderBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type RatioInsetBlock = WagtailBlock & {
   __typename?: 'RatioInsetBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type RatioMathBlock = WagtailBlock & {
   __typename?: 'RatioMathBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type RatioNotebookPage = WagtailPage & {
   __typename?: 'RatioNotebookPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  sections: Array<RatioNotebookSectionBlock>,
};

export type RatioNotebookSectionBlock = WagtailBlock & {
   __typename?: 'RatioNotebookSectionBlock',
  id: Scalars['ID'],
  value: RatioSectionPage,
};

export type RatioParagraphBlock = WagtailBlock & {
   __typename?: 'RatioParagraphBlock',
  id: Scalars['ID'],
  value: Scalars['String'],
};

export type RatioSectionIndexPage = WagtailPage & {
   __typename?: 'RatioSectionIndexPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
};

export type RatioSectionPage = WagtailPage & {
   __typename?: 'RatioSectionPage',
  id: Scalars['ID'],
  meta: WagtailPageMeta,
  title: Scalars['String'],
  body: Array<WagtailBlock>,
};

export type RatioTicket = {
   __typename?: 'RatioTicket',
  id: Scalars['ID'],
  training: RatioTraining,
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name?: Maybe<Scalars['String']>,
  registration_date?: Maybe<Scalars['String']>,
  status: Scalars['String'],
  ticket_type: Scalars['String'],
  payment_type: Scalars['String'],
  payment_amount: Scalars['Int'],
  fiscalization_status: Scalars['String'],
  comment: Scalars['String'],
};

export type RatioTrainer = {
   __typename?: 'RatioTrainer',
  id: Scalars['ID'],
  short_name: Scalars['String'],
  long_name: Scalars['String'],
};

export type RatioTraining = {
   __typename?: 'RatioTraining',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  date: Scalars['String'],
  telegram_link?: Maybe<Scalars['String']>,
  salaries_paid: Scalars['Boolean'],
  tickets: Array<RatioTicket>,
  total_income: Scalars['Int'],
  tickets_count: Scalars['Int'],
  long_name: Scalars['String'],
  schedule: Array<RatioTrainingDay>,
};

export type RatioTrainingAddDayInput = {
  training_slug: Scalars['String'],
  date: Scalars['String'],
};

export type RatioTrainingConnection = {
   __typename?: 'RatioTrainingConnection',
  pageInfo: PageInfo,
  edges: Array<RatioTrainingEdge>,
  nodes: Array<RatioTraining>,
};

export type RatioTrainingCopyScheduleFromInput = {
  from_training_slug: Scalars['String'],
  to_training_slug: Scalars['String'],
};

export type RatioTrainingDay = {
   __typename?: 'RatioTrainingDay',
  id: Scalars['ID'],
  date: Scalars['String'],
  activities: Array<RatioActivity>,
};

export type RatioTrainingEdge = {
   __typename?: 'RatioTrainingEdge',
  node: RatioTraining,
};

export type RatioTrainingSendEmailInput = {
  training_id: Scalars['ID'],
  title: Scalars['String'],
  content: Scalars['String'],
};

export type RatioTrainingSendEmailResult = {
   __typename?: 'RatioTrainingSendEmailResult',
  draft_link: Scalars['String'],
};

export type Room = {
   __typename?: 'Room',
  name?: Maybe<Scalars['String']>,
  max_people?: Maybe<Scalars['Int']>,
  area?: Maybe<Scalars['Int']>,
};

export type SlackUser = {
   __typename?: 'SlackUser',
  slack_id: Scalars['String'],
  image_url: Scalars['String'],
};

export type StaffMember = {
   __typename?: 'StaffMember',
  id: Scalars['ID'],
  short_name: Scalars['String'],
  full_name: Scalars['String'],
  role: Scalars['String'],
  is_current: Scalars['Boolean'],
  vk: Scalars['String'],
  color: Scalars['String'],
  user: AuthUser,
  slack_user?: Maybe<SlackUser>,
};

export type TildaPage = {
   __typename?: 'TildaPage',
  path: Scalars['String'],
  html_url: Scalars['String'],
};

export type WagtailBlock = {
  id: Scalars['ID'],
};

export type WagtailGeo = {
   __typename?: 'WagtailGeo',
  lat: Scalars['String'],
  lng: Scalars['String'],
};

export type WagtailImage = {
   __typename?: 'WagtailImage',
  url: Scalars['String'],
  width: Scalars['Int'],
  height: Scalars['Int'],
};

export type WagtailPage = {
  id: Scalars['ID'],
  title: Scalars['String'],
  meta: WagtailPageMeta,
};

export type WagtailPageMeta = {
   __typename?: 'WagtailPageMeta',
  slug: Scalars['String'],
  html_url: Scalars['String'],
};

export type WatchmenCreateWatchmanInput = {
  email: Scalars['String'],
  short_name: Scalars['String'],
  full_name: Scalars['String'],
  password: Scalars['String'],
  vk?: Maybe<Scalars['String']>,
  gender: Scalars['String'],
  skip_wiki?: Maybe<Scalars['Boolean']>,
  skip_cm_customer?: Maybe<Scalars['Boolean']>,
  skip_cm_user?: Maybe<Scalars['Boolean']>,
};

export type WatchmenGrade = {
   __typename?: 'WatchmenGrade',
  id: Scalars['ID'],
  code: Scalars['String'],
  multiplier: Scalars['Float'],
};

export type WatchmenSetWatchmanGradeInput = {
  watchman_id: Scalars['ID'],
  grade_id: Scalars['ID'],
};

export type WatchmenSetWatchmanPriorityInput = {
  watchman_id: Scalars['ID'],
  priority: Scalars['Int'],
};

export type WatchmenShift = {
   __typename?: 'WatchmenShift',
  date: Scalars['String'],
  shift: Scalars['String'],
  watchman?: Maybe<WatchmenWatchman>,
  is_night: Scalars['Boolean'],
};

export type WatchmenUpdateShiftInput = {
  date: Scalars['String'],
  shift: Scalars['String'],
  watchman_id?: Maybe<Scalars['ID']>,
  is_night?: Maybe<Scalars['Boolean']>,
};

export type WatchmenWatchman = {
   __typename?: 'WatchmenWatchman',
  id: Scalars['ID'],
  member: StaffMember,
  grade?: Maybe<WatchmenGrade>,
  priority: Scalars['Int'],
};

export type ZadarmaCall = {
   __typename?: 'ZadarmaCall',
  call_id: Scalars['String'],
  ts: Scalars['String'],
  call_type: Scalars['String'],
  disposition: Scalars['String'],
  clid: Scalars['String'],
  destination: Scalars['String'],
  sip: Scalars['String'],
  is_recorded: Scalars['Int'],
  watchman: Scalars['String'],
  record?: Maybe<Scalars['String']>,
};

export type ZadarmaData = {
   __typename?: 'ZadarmaData',
  staff_member?: Maybe<StaffMember>,
};

export type ZadarmaPbxCall = {
   __typename?: 'ZadarmaPbxCall',
  pbx_call_id: Scalars['String'],
  ts: Scalars['String'],
  data?: Maybe<ZadarmaData>,
  calls: Array<ZadarmaCall>,
};

export type ZadarmaPbxCallConnection = {
   __typename?: 'ZadarmaPbxCallConnection',
  pageInfo: PageInfo,
  nodes: Array<ZadarmaPbxCall>,
  edges: Array<ZadarmaPbxCallEdge>,
};

export type ZadarmaPbxCallEdge = {
   __typename?: 'ZadarmaPbxCallEdge',
  node: ZadarmaPbxCall,
};
