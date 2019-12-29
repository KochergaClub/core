export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
 */
  DateTime: any,
  /** 
 * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
 */
  Date: any,
  /** 
 * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
 */
  Time: any,
};

/** An enumeration. */
export enum ActivityActivityType {
  /** Секция */
  Section = 'SECTION',
  /** Перерыв */
  Break = 'BREAK',
  /** Бонус */
  Bonus = 'BONUS'
}

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
  comment: Scalars['String'],
};

export type CashierPayment = Node & {
   __typename?: 'CashierPayment',
  /** The ID of the object. */
  id: Scalars['ID'],
  whom: AuthUser,
  amount: Scalars['Int'],
  created_dt: Scalars['DateTime'],
  redeem_dt?: Maybe<Scalars['DateTime']>,
  comment: Scalars['String'],
  is_redeemed: Scalars['Boolean'],
};

export type CashierPaymentConnection = {
   __typename?: 'CashierPaymentConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  edges: Array<CashierPaymentEdge>,
};

export type CashierPaymentEdge = {
   __typename?: 'CashierPaymentEdge',
  /** The item at the end of the edge */
  node: CashierPayment,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type Cm2CreateCustomerInput = {
  card_id: Scalars['Int'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
};

export type Cm2CreateOrderInput = {
  customer?: Maybe<Scalars['ID']>,
};

export type Cm2Customer = Node & {
   __typename?: 'Cm2Customer',
  /** The ID of the object. */
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
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  edges: Array<Cm2CustomerEdge>,
};

export type Cm2CustomerEdge = {
   __typename?: 'Cm2CustomerEdge',
  /** The item at the end of the edge */
  node: Cm2Customer,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type Cm2Order = Node & {
   __typename?: 'Cm2Order',
  /** The ID of the object. */
  id: Scalars['ID'],
  start: Scalars['DateTime'],
  end?: Maybe<Scalars['DateTime']>,
  customer?: Maybe<Cm2Customer>,
  value: Scalars['Int'],
};

export type Cm2OrderConnection = {
   __typename?: 'Cm2OrderConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  edges: Array<Cm2OrderEdge>,
};

export type Cm2OrderEdge = {
   __typename?: 'Cm2OrderEdge',
  /** The item at the end of the edge */
  node: Cm2Order,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
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

/** An enumeration. */
export enum MemberRole {
  /** Основатель */
  Founder = 'FOUNDER',
  /** Менеджер */
  Manager = 'MANAGER',
  /** Видеоменеджер */
  Videomanager = 'VIDEOMANAGER',
  /** Админ */
  Watchman = 'WATCHMAN',
  /** Тренер */
  Trainer = 'TRAINER',
  /** Внешний консультант */
  Consultant = 'CONSULTANT',
  /** Волонтёр */
  Volunteer = 'VOLUNTEER'
}

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  emailSubscribeChannelDelete?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelCreate?: Maybe<Scalars['Boolean']>,
  emailSubscribeChannelAddEmail?: Maybe<Scalars['Boolean']>,
  kkmRegisterCheck: KkmRegisterCheckResult,
  myEmailResubscribe?: Maybe<Scalars['Boolean']>,
  myEmailUnsubscribe?: Maybe<Scalars['Boolean']>,
  myEmailSubscribeToInterest?: Maybe<Scalars['Boolean']>,
  myEmailUnsubscribeFromInterest?: Maybe<Scalars['Boolean']>,
  myPrivacyModeSet?: Maybe<Scalars['Boolean']>,
  myTicketDelete?: Maybe<Scalars['Boolean']>,
  cm2CreateOrder: Cm2Order,
  cm2CreateCustomer: Cm2Customer,
  cm2CloseOrder: Ok,
  ratioAddTraining: RatioTraining,
  ratioAddTicket: RatioTicket,
  ratioTrainingCopyScheduleFrom: Ok,
  ratioTrainingAddDay: Ok,
  ratioTicketFiscalize: Ok,
  cashierCreatePayment?: Maybe<Ok>,
  cashierRedeemPayment?: Maybe<Ok>,
  watchmenCreateWatchman: Ok,
  watchmenUpdateShift: WatchmenShift,
  watchmenSetWatchmanPriority: Ok,
  watchmenSetWatchmanGrade: Ok,
  zadarmaSetMemberForPbxCall?: Maybe<Ok>,
  staffGrantGooglePermissionsToMember?: Maybe<Ok>,
  staffFireMember?: Maybe<Ok>,
  authAddUserToGroup?: Maybe<Ok>,
  authRemoveUserFromGroup?: Maybe<Ok>,
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


export type MutationKkmRegisterCheckArgs = {
  params: KkmRegisterCheckInput
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


export type MutationCm2CreateOrderArgs = {
  input: Cm2CreateOrderInput
};


export type MutationCm2CreateCustomerArgs = {
  input: Cm2CreateCustomerInput
};


export type MutationCm2CloseOrderArgs = {
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


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput
};


export type MutationCashierRedeemPaymentArgs = {
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


export type MutationZadarmaSetMemberForPbxCallArgs = {
  member_id: Scalars['ID'],
  pbx_call_id: Scalars['ID']
};


export type MutationStaffGrantGooglePermissionsToMemberArgs = {
  id: Scalars['ID']
};


export type MutationStaffFireMemberArgs = {
  id: Scalars['ID']
};


export type MutationAuthAddUserToGroupArgs = {
  group_id: Scalars['ID'],
  user_id: Scalars['ID']
};


export type MutationAuthRemoveUserFromGroupArgs = {
  group_id: Scalars['ID'],
  user_id: Scalars['ID']
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

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'],
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

export type Ok = {
   __typename?: 'Ok',
  ok?: Maybe<Scalars['Boolean']>,
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
   __typename?: 'PageInfo',
  pageNumber: Scalars['Int'],
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  emailMailchimpCategoriesAll: Array<EmailMailchimpCategory>,
  emailSubscribeChannelsAll: Array<EmailSubscribeChannel>,
  my: My,
  now: NowInfo,
  rooms: Array<Maybe<Room>>,
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
  ratioTrainings: RatioTrainingConnection,
  ratioTrainingBySlug: RatioTraining,
  ratioTrainersAll: Array<RatioTrainer>,
  cashierPayments: CashierPaymentConnection,
  watchmenWatchmenAll: Array<WatchmenWatchman>,
  watchmenGradesAll: Array<WatchmenGrade>,
  watchmenShifts: Array<WatchmenShift>,
  zadarmaPbxCalls: ZadarmaPbxCallConnection,
  zadarmaPbxCall: ZadarmaPbxCall,
  imageTemplatesAll: Array<ImageTemplate>,
  imageTemplateBySlug: ImageTemplate,
  staffMembersAll: Array<StaffMember>,
  staffMember: StaffMember,
  currentUser: AuthCurrentUser,
  authGroupsAll: Array<AuthGroup>,
  authPermissionsAll: Array<AuthPermission>,
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


export type QueryRatioTrainingsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryRatioTrainingBySlugArgs = {
  slug: Scalars['String']
};


export type QueryCashierPaymentsArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryWatchmenWatchmenAllArgs = {
  current?: Maybe<Scalars['Boolean']>
};


export type QueryWatchmenShiftsArgs = {
  from_date?: Maybe<Scalars['String']>,
  to_date?: Maybe<Scalars['String']>
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


export type QueryImageTemplateBySlugArgs = {
  slug: Scalars['String']
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
};

export type RatioActivity = {
   __typename?: 'RatioActivity',
  id: Scalars['ID'],
  time: Scalars['Time'],
  activity_type: ActivityActivityType,
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
};

export type RatioTicket = {
   __typename?: 'RatioTicket',
  id: Scalars['ID'],
  training: RatioTraining,
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name?: Maybe<Scalars['String']>,
  registration_date?: Maybe<Scalars['Date']>,
  status: TicketStatus,
  ticket_type: TicketTicketType,
  payment_type: TicketPaymentType,
  payment_amount: Scalars['Int'],
  fiscalization_status: TicketFiscalizationStatus,
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
  date: Scalars['Date'],
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
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  edges: Array<RatioTrainingEdge>,
};

export type RatioTrainingCopyScheduleFromInput = {
  from_training_slug: Scalars['String'],
  to_training_slug: Scalars['String'],
};

export type RatioTrainingDay = {
   __typename?: 'RatioTrainingDay',
  id: Scalars['ID'],
  date: Scalars['Date'],
  activities: Array<RatioActivity>,
};

export type RatioTrainingEdge = {
   __typename?: 'RatioTrainingEdge',
  /** The item at the end of the edge */
  node: RatioTraining,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type Room = {
   __typename?: 'Room',
  name?: Maybe<Scalars['String']>,
  max_people?: Maybe<Scalars['Int']>,
  area?: Maybe<Scalars['Int']>,
};

/** An enumeration. */
export enum ShiftShift {
  /** MORNING_V1 */
  MorningV1 = 'MORNING_V1',
  /** EVENING_V1 */
  EveningV1 = 'EVENING_V1',
  /** MORNING */
  Morning = 'MORNING',
  /** MIDDAY */
  Midday = 'MIDDAY',
  /** EVENING */
  Evening = 'EVENING',
  /** NIGHT */
  Night = 'NIGHT'
}

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
  role: MemberRole,
  is_current: Scalars['Boolean'],
  vk: Scalars['String'],
  color: Scalars['String'],
  user: AuthUser,
  slack_user?: Maybe<SlackUser>,
};

/** An enumeration. */
export enum TicketFiscalizationStatus {
  /** todo */
  Todo = 'TODO',
  /** not_needed */
  NotNeeded = 'NOT_NEEDED',
  /** in_progress */
  InProgress = 'IN_PROGRESS',
  /** fiscalized */
  Fiscalized = 'FISCALIZED'
}

/** An enumeration. */
export enum TicketPaymentType {
  /** - */
  None = 'NONE',
  /** Timepad */
  Timepad = 'TIMEPAD',
  /** Сайт */
  Website = 'WEBSITE',
  /** Краудфандинг */
  Crowdfunding = 'CROWDFUNDING',
  /** Нал */
  Cash = 'CASH',
  /** Счёт */
  Invoice = 'INVOICE',
  /** Перевод */
  Transfer = 'TRANSFER'
}

/** An enumeration. */
export enum TicketStatus {
  /** Участник */
  Normal = 'NORMAL',
  /** Отказ */
  Canceled = 'CANCELED'
}

/** An enumeration. */
export enum TicketTicketType {
  /** Обычный */
  Normal = 'NORMAL',
  /** Стипендия */
  Stipend = 'STIPEND',
  /** Стафф */
  Staff = 'STAFF',
  /** Замена (заменяет другого участника) */
  Replacement = 'REPLACEMENT',
  /** Перенос (с прошлого мероприятия) */
  CarryOver = 'CARRY_OVER'
}


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
  date: Scalars['Date'],
  shift: ShiftShift,
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
  ts: Scalars['DateTime'],
  call_type: Scalars['String'],
  disposition: Scalars['String'],
  clid: Scalars['String'],
  destination: Scalars['String'],
  sip: Scalars['String'],
  is_recorded: Scalars['Int'],
  watchman: Scalars['String'],
  record: Scalars['String'],
};

export type ZadarmaData = {
   __typename?: 'ZadarmaData',
  staff_member?: Maybe<StaffMember>,
};

export type ZadarmaPbxCall = Node & {
   __typename?: 'ZadarmaPbxCall',
  pbx_call_id: Scalars['String'],
  ts: Scalars['DateTime'],
  data?: Maybe<ZadarmaData>,
  calls: Array<ZadarmaCall>,
  /** The ID of the object. */
  id: Scalars['ID'],
};

export type ZadarmaPbxCallConnection = {
   __typename?: 'ZadarmaPbxCallConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  edges: Array<ZadarmaPbxCallEdge>,
};

export type ZadarmaPbxCallEdge = {
   __typename?: 'ZadarmaPbxCallEdge',
  /** The item at the end of the edge */
  node: ZadarmaPbxCall,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};
