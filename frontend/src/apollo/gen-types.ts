export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthCurrentUser = {
   __typename?: 'AuthCurrentUser',
  is_authenticated: Scalars['Boolean'],
  permissions: Array<Scalars['String']>,
  is_staff?: Maybe<Scalars['Boolean']>,
  email?: Maybe<Scalars['String']>,
};

export type AuthGroup = {
   __typename?: 'AuthGroup',
  id: Scalars['ID'],
  name: Scalars['String'],
  permissions: Array<AuthPermission>,
  users: Array<AuthUser>,
};

export type AuthPermission = {
   __typename?: 'AuthPermission',
  id: Scalars['ID'],
  name: Scalars['String'],
  users: Array<AuthUser>,
};

export type AuthUser = {
   __typename?: 'AuthUser',
  id: Scalars['ID'],
  email: Scalars['String'],
  staff_member?: Maybe<StaffMember>,
};

export type CashierCreatePaymentInput = {
  amount: Scalars['Int'],
  whom: Scalars['ID'],
  comment?: Maybe<Scalars['String']>,
};

export type CashierPayment = {
   __typename?: 'CashierPayment',
  id: Scalars['ID'],
  amount: Scalars['Int'],
  whom: AuthUser,
  comment: Scalars['String'],
  is_redeemed: Scalars['Boolean'],
  created_dt: Scalars['String'],
  redeem_dt?: Maybe<Scalars['String']>,
};

export type CashierPaymentConnection = {
   __typename?: 'CashierPaymentConnection',
  pageInfo: PageInfo,
  nodes: Array<CashierPayment>,
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

export type Cm2CustomerConnection = {
   __typename?: 'Cm2CustomerConnection',
  pageInfo: PageInfo,
  nodes: Array<Cm2Customer>,
};

export type Cm2Order = {
   __typename?: 'Cm2Order',
  id: Scalars['ID'],
  start: Scalars['String'],
  end?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['Int']>,
  customer?: Maybe<Cm2Customer>,
};

export type Cm2OrderConnection = {
   __typename?: 'Cm2OrderConnection',
  pageInfo: PageInfo,
  nodes: Array<Cm2Order>,
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

/** TODO - move to events.graphql */
export type EventsPublicEvent = {
   __typename?: 'EventsPublicEvent',
  event_id: Scalars['ID'],
  start: Scalars['String'],
  title: Scalars['String'],
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

/** TODO - interfaces / unions for different field types */
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

export type Mutation = {
   __typename?: 'Mutation',
  authAddUserToGroup?: Maybe<Scalars['Boolean']>,
  authRemoveUserFromGroup?: Maybe<Scalars['Boolean']>,
  _empty?: Maybe<Scalars['String']>,
  cashierCreatePayment?: Maybe<Scalars['Boolean']>,
  cashierRedeemPayment?: Maybe<Scalars['Boolean']>,
  cm2CreateOrder: Cm2Order,
  cm2CreateCustomer: Cm2Customer,
  cm2CloseOrder?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelDelete?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelCreate?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelAddEmail?: Maybe<Scalars['Boolean']>,
  myEmailResubscribe?: Maybe<Scalars['Boolean']>,
  myEmailUnsubscribe?: Maybe<Scalars['Boolean']>,
  myEmailSubscribeToInterest?: Maybe<Scalars['Boolean']>,
  myEmailUnsubscribeFromInterest?: Maybe<Scalars['Boolean']>,
  myPrivacyModeSet?: Maybe<Scalars['Boolean']>,
  myTicketDelete?: Maybe<Scalars['Boolean']>,
  ratioAddTraining: RatioTraining,
  ratioAddTicket: RatioTicket,
  ratioTrainingCopyScheduleFrom?: Maybe<Scalars['Boolean']>,
  ratioTrainingAddDay?: Maybe<Scalars['Boolean']>,
  ratioTicketFiscalize?: Maybe<Scalars['Boolean']>,
  staffGrantGooglePermissionsToMember?: Maybe<Scalars['Boolean']>,
  staffFireMember?: Maybe<Scalars['Boolean']>,
  watchmenSetWatchmanPriority?: Maybe<Scalars['Boolean']>,
  watchmenSetWatchmanGrade?: Maybe<Scalars['Boolean']>,
  watchmenCreateWatchman?: Maybe<Scalars['Boolean']>,
  watchmenUpdateShift: WatchmenShift,
  zadarmaSetMemberForPbxCall?: Maybe<Scalars['Boolean']>,
};


export type MutationAuthAddUserToGroupArgs = {
  user_id: Scalars['ID'],
  group_id: Scalars['ID']
};


export type MutationAuthRemoveUserFromGroupArgs = {
  user_id: Scalars['ID'],
  group_id: Scalars['ID']
};


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput
};


export type MutationCashierRedeemPaymentArgs = {
  id: Scalars['ID']
};


export type MutationCm2CreateOrderArgs = {
  params: Cm2CreateOrderInput
};


export type MutationCm2CreateCustomerArgs = {
  params: Cm2CreateCustomerInput
};


export type MutationCm2CloseOrderArgs = {
  id: Scalars['ID']
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


export type MutationMyPrivacyModeSetArgs = {
  mode: Scalars['String']
};


export type MutationMyTicketDeleteArgs = {
  event_id: Scalars['ID']
};


export type MutationRatioAddTrainingArgs = {
  params: RatioAddTrainingInput
};


export type MutationRatioAddTicketArgs = {
  params: RatioAddTicketInput
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


export type MutationStaffGrantGooglePermissionsToMemberArgs = {
  id: Scalars['ID']
};


export type MutationStaffFireMemberArgs = {
  id: Scalars['ID']
};


export type MutationWatchmenSetWatchmanPriorityArgs = {
  params: WatchmenSetWatchmanPriorityInput
};


export type MutationWatchmenSetWatchmanGradeArgs = {
  params: WatchmenSetWatchmanGradeInput
};


export type MutationWatchmenCreateWatchmanArgs = {
  params: WatchmenCreateWatchmanInput
};


export type MutationWatchmenUpdateShiftArgs = {
  params: WatchmenUpdateShiftInput
};


export type MutationZadarmaSetMemberForPbxCallArgs = {
  pbx_call_id: Scalars['ID'],
  member_id: Scalars['ID']
};

export type My = {
   __typename?: 'My',
  email?: Maybe<Scalars['String']>,
  is_authenticated: Scalars['Boolean'],
  is_staff?: Maybe<Scalars['Boolean']>,
  permissions: Array<Scalars['String']>,
  membership?: Maybe<MyMembership>,
  tickets: Array<MyTicket>,
  email_subscription: MyEmailSubscription,
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

export type MyMembership = {
   __typename?: 'MyMembership',
  card_id: Scalars['Int'],
  subscription_until?: Maybe<Scalars['String']>,
  last_visit?: Maybe<Scalars['String']>,
  total_spent: Scalars['Int'],
  privacy_mode: Scalars['String'],
  orders_count: Scalars['Int'],
  orders: Array<MyOrder>,
};

export type MyOrder = {
   __typename?: 'MyOrder',
  order_id: Scalars['ID'],
  start_dt: Scalars['String'],
  end_dt?: Maybe<Scalars['String']>,
};

export type MyTicket = {
   __typename?: 'MyTicket',
  event: EventsPublicEvent,
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
  pageNumber: Scalars['Int'],
  hasNextPage: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  currentUser: AuthCurrentUser,
  authGroupsAll: Array<AuthGroup>,
  authPermissionsAll: Array<AuthPermission>,
  _empty?: Maybe<Scalars['String']>,
  cashierPayments: CashierPaymentConnection,
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
  emailMailchimpCategoriesAll: Array<EmailMailchimpCategory>,
  emailSubscribeChannelsAll: Array<EmailSubscribeChannel>,
  imageTemplatesAll: Array<ImageTemplate>,
  imageTemplateBySlug: ImageTemplate,
  my: My,
  now: NowInfo,
  ratioTrainings: RatioTrainingConnection,
  ratioTrainingBySlug: RatioTraining,
  ratioTrainersAll: Array<RatioTrainer>,
  rooms: Array<Maybe<Room>>,
  staffMembersAll: Array<StaffMember>,
  staffMember: StaffMember,
  watchmenWatchmenAll: Array<WatchmenWatchman>,
  watchmenGradesAll: Array<WatchmenGrade>,
  watchmenShifts: Array<WatchmenShift>,
  zadarmaPbxCalls: ZadarmaPbxCallConnection,
  zadarmaPbxCall: ZadarmaPbxCall,
};


export type QueryCashierPaymentsArgs = {
  page?: Maybe<Scalars['Int']>
};


export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryCm2CustomerArgs = {
  id: Scalars['ID']
};


export type QueryCm2OrderArgs = {
  id: Scalars['ID']
};


export type QueryImageTemplateBySlugArgs = {
  slug: Scalars['String']
};


export type QueryRatioTrainingsArgs = {
  page?: Maybe<Scalars['Int']>
};


export type QueryRatioTrainingBySlugArgs = {
  slug: Scalars['String']
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
};


export type QueryWatchmenWatchmenAllArgs = {
  current?: Maybe<Scalars['Boolean']>
};


export type QueryWatchmenShiftsArgs = {
  from_date?: Maybe<Scalars['String']>,
  to_date?: Maybe<Scalars['String']>
};


export type QueryZadarmaPbxCallsArgs = {
  page?: Maybe<Scalars['Int']>,
  page_size?: Maybe<Scalars['Int']>
};


export type QueryZadarmaPbxCallArgs = {
  pbx_call_id: Scalars['ID']
};

export type RatioActivity = {
   __typename?: 'RatioActivity',
  id: Scalars['ID'],
  time: Scalars['String'],
  activity_type: Scalars['String'],
  name: Scalars['String'],
  trainer?: Maybe<RatioTrainer>,
  location?: Maybe<Scalars['String']>,
};

export type RatioAddTicketInput = {
  training: Scalars['ID'],
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  payment_amount: Scalars['Int'],
  status: Scalars['String'],
  fiscalization_status: Scalars['String'],
  ticket_type: Scalars['String'],
  payment_type: Scalars['String'],
};

export type RatioAddTrainingInput = {
  name: Scalars['String'],
  slug: Scalars['String'],
  date: Scalars['String'],
};

export type RatioTicket = {
   __typename?: 'RatioTicket',
  id: Scalars['ID'],
  training: RatioTraining,
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name?: Maybe<Scalars['String']>,
  payment_amount: Scalars['Int'],
  status: Scalars['String'],
  fiscalization_status: Scalars['String'],
  ticket_type: Scalars['String'],
  payment_type: Scalars['String'],
  registration_date?: Maybe<Scalars['String']>,
  comment?: Maybe<Scalars['String']>,
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
  tickets: Array<RatioTicket>,
  tickets_count: Scalars['Int'],
  total_income: Scalars['Int'],
  schedule: Array<RatioTrainingDay>,
};

export type RatioTrainingAddDayInput = {
  training_slug: Scalars['String'],
  date: Scalars['String'],
};

export type RatioTrainingConnection = {
   __typename?: 'RatioTrainingConnection',
  pageInfo: PageInfo,
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

export type Room = {
   __typename?: 'Room',
  name?: Maybe<Scalars['String']>,
  max_people?: Maybe<Scalars['Int']>,
  area?: Maybe<Scalars['Int']>,
};

export type StaffMember = {
   __typename?: 'StaffMember',
  id: Scalars['ID'],
  user_id: Scalars['ID'],
  full_name: Scalars['String'],
  short_name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  role: Scalars['String'],
  color?: Maybe<Scalars['String']>,
  is_current?: Maybe<Scalars['Boolean']>,
  slack_image?: Maybe<Scalars['String']>,
  slack_id?: Maybe<Scalars['String']>,
  vk?: Maybe<Scalars['String']>,
};

export type WatchmenCreateWatchmanInput = {
  email: Scalars['String'],
  short_name: Scalars['String'],
  full_name: Scalars['String'],
  password: Scalars['String'],
  vk?: Maybe<Scalars['String']>,
  gender: Scalars['String'],
  skip_wiki?: Maybe<Scalars['Boolean']>,
  skip_cm_user?: Maybe<Scalars['Boolean']>,
  skip_cm_customer?: Maybe<Scalars['Boolean']>,
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
  priority: Scalars['Int'],
  member: StaffMember,
  grade?: Maybe<WatchmenGrade>,
};

export type ZadarmaCall = {
   __typename?: 'ZadarmaCall',
  call_id: Scalars['ID'],
  ts: Scalars['String'],
  watchman?: Maybe<Scalars['String']>,
  call_type: Scalars['String'],
  disposition: Scalars['String'],
  clid: Scalars['String'],
  destination: Scalars['String'],
  sip: Scalars['String'],
  record?: Maybe<Scalars['String']>,
};

export type ZadarmaData = {
   __typename?: 'ZadarmaData',
  staff_member?: Maybe<StaffMember>,
};

export type ZadarmaPbxCall = {
   __typename?: 'ZadarmaPbxCall',
  pbx_call_id: Scalars['ID'],
  ts: Scalars['String'],
  calls: Array<ZadarmaCall>,
  data?: Maybe<ZadarmaData>,
};

export type ZadarmaPbxCallConnection = {
   __typename?: 'ZadarmaPbxCallConnection',
  pageInfo: PageInfo,
  nodes: Array<ZadarmaPbxCall>,
};
