import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TContext } from './types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  EmailMailchimpCategory: ResolverTypeWrapper<EmailMailchimpCategory>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  EmailMailchimpInterest: ResolverTypeWrapper<EmailMailchimpInterest>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  EmailSubscribeChannel: ResolverTypeWrapper<EmailSubscribeChannel>,
  My: ResolverTypeWrapper<My>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  MyMembership: ResolverTypeWrapper<MyMembership>,
  MyOrder: ResolverTypeWrapper<MyOrder>,
  MyTicket: ResolverTypeWrapper<MyTicket>,
  EventsPublicEvent: ResolverTypeWrapper<EventsPublicEvent>,
  MyEmailSubscription: ResolverTypeWrapper<MyEmailSubscription>,
  MyEmailSubscriptionInterest: ResolverTypeWrapper<MyEmailSubscriptionInterest>,
  NowInfo: ResolverTypeWrapper<NowInfo>,
  NowCustomer: ResolverTypeWrapper<NowCustomer>,
  Room: ResolverTypeWrapper<Room>,
  Cm2CustomerConnection: ResolverTypeWrapper<Cm2CustomerConnection>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Cm2CustomerEdge: ResolverTypeWrapper<Cm2CustomerEdge>,
  Cm2Customer: ResolverTypeWrapper<Cm2Customer>,
  Node: ResolverTypeWrapper<Node>,
  Cm2OrderConnection: ResolverTypeWrapper<Cm2OrderConnection>,
  Cm2OrderEdge: ResolverTypeWrapper<Cm2OrderEdge>,
  Cm2Order: ResolverTypeWrapper<Cm2Order>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  RatioTrainingConnection: ResolverTypeWrapper<RatioTrainingConnection>,
  RatioTrainingEdge: ResolverTypeWrapper<RatioTrainingEdge>,
  RatioTraining: ResolverTypeWrapper<RatioTraining>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  RatioTicket: ResolverTypeWrapper<RatioTicket>,
  TicketStatus: TicketStatus,
  TicketTicketType: TicketTicketType,
  TicketPaymentType: TicketPaymentType,
  TicketFiscalizationStatus: TicketFiscalizationStatus,
  RatioTrainingDay: ResolverTypeWrapper<RatioTrainingDay>,
  RatioActivity: ResolverTypeWrapper<RatioActivity>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  ActivityActivityType: ActivityActivityType,
  RatioTrainer: ResolverTypeWrapper<RatioTrainer>,
  CashierPaymentConnection: ResolverTypeWrapper<CashierPaymentConnection>,
  CashierPaymentEdge: ResolverTypeWrapper<CashierPaymentEdge>,
  CashierPayment: ResolverTypeWrapper<CashierPayment>,
  AuthUser: ResolverTypeWrapper<AuthUser>,
  StaffMember: ResolverTypeWrapper<StaffMember>,
  MemberRole: MemberRole,
  SlackUser: ResolverTypeWrapper<SlackUser>,
  WatchmenWatchman: ResolverTypeWrapper<WatchmenWatchman>,
  WatchmenGrade: ResolverTypeWrapper<WatchmenGrade>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  WatchmenShift: ResolverTypeWrapper<WatchmenShift>,
  ShiftShift: ShiftShift,
  ZadarmaPbxCallConnection: ResolverTypeWrapper<ZadarmaPbxCallConnection>,
  ZadarmaPbxCallEdge: ResolverTypeWrapper<ZadarmaPbxCallEdge>,
  ZadarmaPbxCall: ResolverTypeWrapper<ZadarmaPbxCall>,
  ZadarmaData: ResolverTypeWrapper<ZadarmaData>,
  ZadarmaCall: ResolverTypeWrapper<ZadarmaCall>,
  ImageTemplate: ResolverTypeWrapper<ImageTemplate>,
  ImageTemplateSchema: ResolverTypeWrapper<ImageTemplateSchema>,
  ImageTemplateSchemaField: ResolverTypeWrapper<ImageTemplateSchemaField>,
  ImageTemplateSizes: ResolverTypeWrapper<ImageTemplateSizes>,
  AuthCurrentUser: ResolverTypeWrapper<AuthCurrentUser>,
  AuthGroup: ResolverTypeWrapper<AuthGroup>,
  AuthPermission: ResolverTypeWrapper<AuthPermission>,
  Mutation: ResolverTypeWrapper<{}>,
  EmailSubscribeChannelCreateInput: EmailSubscribeChannelCreateInput,
  KkmRegisterCheckInput: KkmRegisterCheckInput,
  KkmRegisterCheckResult: ResolverTypeWrapper<KkmRegisterCheckResult>,
  Cm2CreateOrderInput: Cm2CreateOrderInput,
  Cm2CreateCustomerInput: Cm2CreateCustomerInput,
  Ok: ResolverTypeWrapper<Ok>,
  RatioAddTrainingInput: RatioAddTrainingInput,
  RatioAddTicketInput: RatioAddTicketInput,
  RatioTrainingCopyScheduleFromInput: RatioTrainingCopyScheduleFromInput,
  RatioTrainingAddDayInput: RatioTrainingAddDayInput,
  CashierCreatePaymentInput: CashierCreatePaymentInput,
  WatchmenCreateWatchmanInput: WatchmenCreateWatchmanInput,
  WatchmenUpdateShiftInput: WatchmenUpdateShiftInput,
  WatchmenSetWatchmanPriorityInput: WatchmenSetWatchmanPriorityInput,
  WatchmenSetWatchmanGradeInput: WatchmenSetWatchmanGradeInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  EmailMailchimpCategory: EmailMailchimpCategory,
  ID: Scalars['ID'],
  EmailMailchimpInterest: EmailMailchimpInterest,
  Int: Scalars['Int'],
  EmailSubscribeChannel: EmailSubscribeChannel,
  My: My,
  Boolean: Scalars['Boolean'],
  MyMembership: MyMembership,
  MyOrder: MyOrder,
  MyTicket: MyTicket,
  EventsPublicEvent: EventsPublicEvent,
  MyEmailSubscription: MyEmailSubscription,
  MyEmailSubscriptionInterest: MyEmailSubscriptionInterest,
  NowInfo: NowInfo,
  NowCustomer: NowCustomer,
  Room: Room,
  Cm2CustomerConnection: Cm2CustomerConnection,
  PageInfo: PageInfo,
  Cm2CustomerEdge: Cm2CustomerEdge,
  Cm2Customer: Cm2Customer,
  Node: Node,
  Cm2OrderConnection: Cm2OrderConnection,
  Cm2OrderEdge: Cm2OrderEdge,
  Cm2Order: Cm2Order,
  DateTime: Scalars['DateTime'],
  RatioTrainingConnection: RatioTrainingConnection,
  RatioTrainingEdge: RatioTrainingEdge,
  RatioTraining: RatioTraining,
  Date: Scalars['Date'],
  RatioTicket: RatioTicket,
  TicketStatus: TicketStatus,
  TicketTicketType: TicketTicketType,
  TicketPaymentType: TicketPaymentType,
  TicketFiscalizationStatus: TicketFiscalizationStatus,
  RatioTrainingDay: RatioTrainingDay,
  RatioActivity: RatioActivity,
  Time: Scalars['Time'],
  ActivityActivityType: ActivityActivityType,
  RatioTrainer: RatioTrainer,
  CashierPaymentConnection: CashierPaymentConnection,
  CashierPaymentEdge: CashierPaymentEdge,
  CashierPayment: CashierPayment,
  AuthUser: AuthUser,
  StaffMember: StaffMember,
  MemberRole: MemberRole,
  SlackUser: SlackUser,
  WatchmenWatchman: WatchmenWatchman,
  WatchmenGrade: WatchmenGrade,
  Float: Scalars['Float'],
  WatchmenShift: WatchmenShift,
  ShiftShift: ShiftShift,
  ZadarmaPbxCallConnection: ZadarmaPbxCallConnection,
  ZadarmaPbxCallEdge: ZadarmaPbxCallEdge,
  ZadarmaPbxCall: ZadarmaPbxCall,
  ZadarmaData: ZadarmaData,
  ZadarmaCall: ZadarmaCall,
  ImageTemplate: ImageTemplate,
  ImageTemplateSchema: ImageTemplateSchema,
  ImageTemplateSchemaField: ImageTemplateSchemaField,
  ImageTemplateSizes: ImageTemplateSizes,
  AuthCurrentUser: AuthCurrentUser,
  AuthGroup: AuthGroup,
  AuthPermission: AuthPermission,
  Mutation: {},
  EmailSubscribeChannelCreateInput: EmailSubscribeChannelCreateInput,
  KkmRegisterCheckInput: KkmRegisterCheckInput,
  KkmRegisterCheckResult: KkmRegisterCheckResult,
  Cm2CreateOrderInput: Cm2CreateOrderInput,
  Cm2CreateCustomerInput: Cm2CreateCustomerInput,
  Ok: Ok,
  RatioAddTrainingInput: RatioAddTrainingInput,
  RatioAddTicketInput: RatioAddTicketInput,
  RatioTrainingCopyScheduleFromInput: RatioTrainingCopyScheduleFromInput,
  RatioTrainingAddDayInput: RatioTrainingAddDayInput,
  CashierCreatePaymentInput: CashierCreatePaymentInput,
  WatchmenCreateWatchmanInput: WatchmenCreateWatchmanInput,
  WatchmenUpdateShiftInput: WatchmenUpdateShiftInput,
  WatchmenSetWatchmanPriorityInput: WatchmenSetWatchmanPriorityInput,
  WatchmenSetWatchmanGradeInput: WatchmenSetWatchmanGradeInput,
};

export type AuthCurrentUserResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['AuthCurrentUser'] = ResolversParentTypes['AuthCurrentUser']> = {
  is_authenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  is_staff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  permissions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AuthGroupResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['AuthGroup'] = ResolversParentTypes['AuthGroup']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  permissions?: Resolver<Array<ResolversTypes['AuthPermission']>, ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['AuthUser']>, ParentType, ContextType>,
};

export type AuthPermissionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['AuthPermission'] = ResolversParentTypes['AuthPermission']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['AuthUser']>, ParentType, ContextType>,
};

export type AuthUserResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  staff_member?: Resolver<Maybe<ResolversTypes['StaffMember']>, ParentType, ContextType>,
};

export type CashierPaymentResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['CashierPayment'] = ResolversParentTypes['CashierPayment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  whom?: Resolver<ResolversTypes['AuthUser'], ParentType, ContextType>,
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  created_dt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  redeem_dt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  is_redeemed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type CashierPaymentConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['CashierPaymentConnection'] = ResolversParentTypes['CashierPaymentConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['CashierPaymentEdge']>, ParentType, ContextType>,
};

export type CashierPaymentEdgeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['CashierPaymentEdge'] = ResolversParentTypes['CashierPaymentEdge']> = {
  node?: Resolver<ResolversTypes['CashierPayment'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Cm2CustomerResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2Customer'] = ResolversParentTypes['Cm2Customer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  card_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orders?: Resolver<ResolversTypes['Cm2OrderConnection'], ParentType, ContextType, Cm2CustomerOrdersArgs>,
};

export type Cm2CustomerConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2CustomerConnection'] = ResolversParentTypes['Cm2CustomerConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['Cm2CustomerEdge']>, ParentType, ContextType>,
};

export type Cm2CustomerEdgeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2CustomerEdge'] = ResolversParentTypes['Cm2CustomerEdge']> = {
  node?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Cm2OrderResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2Order'] = ResolversParentTypes['Cm2Order']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  start?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  customer?: Resolver<Maybe<ResolversTypes['Cm2Customer']>, ParentType, ContextType>,
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type Cm2OrderConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2OrderConnection'] = ResolversParentTypes['Cm2OrderConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['Cm2OrderEdge']>, ParentType, ContextType>,
};

export type Cm2OrderEdgeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2OrderEdge'] = ResolversParentTypes['Cm2OrderEdge']> = {
  node?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type EmailMailchimpCategoryResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['EmailMailchimpCategory'] = ResolversParentTypes['EmailMailchimpCategory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  category_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  interests?: Resolver<Array<ResolversTypes['EmailMailchimpInterest']>, ParentType, ContextType>,
};

export type EmailMailchimpInterestResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['EmailMailchimpInterest'] = ResolversParentTypes['EmailMailchimpInterest']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  interest_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  subscriber_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type EmailSubscribeChannelResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['EmailSubscribeChannel'] = ResolversParentTypes['EmailSubscribeChannel']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  interests?: Resolver<Array<ResolversTypes['EmailMailchimpInterest']>, ParentType, ContextType>,
};

export type EventsPublicEventResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['EventsPublicEvent'] = ResolversParentTypes['EventsPublicEvent']> = {
  event_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ImageTemplateResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ImageTemplate'] = ResolversParentTypes['ImageTemplate']> = {
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  schema?: Resolver<ResolversTypes['ImageTemplateSchema'], ParentType, ContextType>,
  sizes?: Resolver<ResolversTypes['ImageTemplateSizes'], ParentType, ContextType>,
};

export type ImageTemplateSchemaResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ImageTemplateSchema'] = ResolversParentTypes['ImageTemplateSchema']> = {
  fields?: Resolver<Array<ResolversTypes['ImageTemplateSchemaField']>, ParentType, ContextType>,
};

export type ImageTemplateSchemaFieldResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ImageTemplateSchemaField'] = ResolversParentTypes['ImageTemplateSchemaField']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  value_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  default?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ImageTemplateSizesResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ImageTemplateSizes'] = ResolversParentTypes['ImageTemplateSizes']> = {
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type KkmRegisterCheckResultResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['KkmRegisterCheckResult'] = ResolversParentTypes['KkmRegisterCheckResult']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  emailSubscribeChannelDelete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEmailSubscribeChannelDeleteArgs, 'slug'>>,
  emailSubscribeChannelCreate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEmailSubscribeChannelCreateArgs, 'params'>>,
  emailSubscribeChannelAddEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEmailSubscribeChannelAddEmailArgs, 'slug' | 'email'>>,
  kkmRegisterCheck?: Resolver<ResolversTypes['KkmRegisterCheckResult'], ParentType, ContextType, RequireFields<MutationKkmRegisterCheckArgs, 'params'>>,
  myEmailResubscribe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  myEmailUnsubscribe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  myEmailSubscribeToInterest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMyEmailSubscribeToInterestArgs, 'interest_id'>>,
  myEmailUnsubscribeFromInterest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMyEmailUnsubscribeFromInterestArgs, 'interest_id'>>,
  myPrivacyModeSet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMyPrivacyModeSetArgs, 'mode'>>,
  myTicketDelete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMyTicketDeleteArgs, 'event_id'>>,
  cm2CreateOrder?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType, RequireFields<MutationCm2CreateOrderArgs, 'input'>>,
  cm2CreateCustomer?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType, RequireFields<MutationCm2CreateCustomerArgs, 'input'>>,
  cm2CloseOrder?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationCm2CloseOrderArgs, 'id'>>,
  ratioAddTraining?: Resolver<ResolversTypes['RatioTraining'], ParentType, ContextType, RequireFields<MutationRatioAddTrainingArgs, 'params'>>,
  ratioAddTicket?: Resolver<ResolversTypes['RatioTicket'], ParentType, ContextType, RequireFields<MutationRatioAddTicketArgs, 'input'>>,
  ratioTrainingCopyScheduleFrom?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationRatioTrainingCopyScheduleFromArgs, 'params'>>,
  ratioTrainingAddDay?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationRatioTrainingAddDayArgs, 'params'>>,
  ratioTicketFiscalize?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationRatioTicketFiscalizeArgs, 'ticket_id'>>,
  cashierCreatePayment?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationCashierCreatePaymentArgs, 'params'>>,
  cashierRedeemPayment?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationCashierRedeemPaymentArgs, 'id'>>,
  watchmenCreateWatchman?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationWatchmenCreateWatchmanArgs, 'params'>>,
  watchmenUpdateShift?: Resolver<ResolversTypes['WatchmenShift'], ParentType, ContextType, RequireFields<MutationWatchmenUpdateShiftArgs, 'params'>>,
  watchmenSetWatchmanPriority?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationWatchmenSetWatchmanPriorityArgs, 'params'>>,
  watchmenSetWatchmanGrade?: Resolver<ResolversTypes['Ok'], ParentType, ContextType, RequireFields<MutationWatchmenSetWatchmanGradeArgs, 'params'>>,
  zadarmaSetMemberForPbxCall?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationZadarmaSetMemberForPbxCallArgs, 'member_id' | 'pbx_call_id'>>,
  staffGrantGooglePermissionsToMember?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationStaffGrantGooglePermissionsToMemberArgs, 'id'>>,
  staffFireMember?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationStaffFireMemberArgs, 'id'>>,
  authAddUserToGroup?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationAuthAddUserToGroupArgs, 'group_id' | 'user_id'>>,
  authRemoveUserFromGroup?: Resolver<Maybe<ResolversTypes['Ok']>, ParentType, ContextType, RequireFields<MutationAuthRemoveUserFromGroupArgs, 'group_id' | 'user_id'>>,
};

export type MyResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['My'] = ResolversParentTypes['My']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  is_authenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  is_staff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  permissions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  membership?: Resolver<Maybe<ResolversTypes['MyMembership']>, ParentType, ContextType>,
  tickets?: Resolver<Array<ResolversTypes['MyTicket']>, ParentType, ContextType>,
  email_subscription?: Resolver<ResolversTypes['MyEmailSubscription'], ParentType, ContextType>,
};

export type MyEmailSubscriptionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['MyEmailSubscription'] = ResolversParentTypes['MyEmailSubscription']> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  interests?: Resolver<Maybe<Array<ResolversTypes['MyEmailSubscriptionInterest']>>, ParentType, ContextType>,
};

export type MyEmailSubscriptionInterestResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['MyEmailSubscriptionInterest'] = ResolversParentTypes['MyEmailSubscriptionInterest']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  subscribed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type MyMembershipResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['MyMembership'] = ResolversParentTypes['MyMembership']> = {
  card_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  subscription_until?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  last_visit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  total_spent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  privacy_mode?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orders_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  orders?: Resolver<Array<ResolversTypes['MyOrder']>, ParentType, ContextType>,
};

export type MyOrderResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['MyOrder'] = ResolversParentTypes['MyOrder']> = {
  order_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  start_dt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  end_dt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MyTicketResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['MyTicket'] = ResolversParentTypes['MyTicket']> = {
  event?: Resolver<ResolversTypes['EventsPublicEvent'], ParentType, ContextType>,
};

export type NodeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Cm2Customer' | 'Cm2Order' | 'CashierPayment' | 'ZadarmaPbxCall', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type NowCustomerResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['NowCustomer'] = ResolversParentTypes['NowCustomer']> = {
  card_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type NowInfoResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['NowInfo'] = ResolversParentTypes['NowInfo']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  customers?: Resolver<Array<ResolversTypes['NowCustomer']>, ParentType, ContextType>,
};

export type OkResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Ok'] = ResolversParentTypes['Ok']> = {
  ok?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type PageInfoResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  pageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  emailMailchimpCategoriesAll?: Resolver<Array<ResolversTypes['EmailMailchimpCategory']>, ParentType, ContextType>,
  emailSubscribeChannelsAll?: Resolver<Array<ResolversTypes['EmailSubscribeChannel']>, ParentType, ContextType>,
  my?: Resolver<ResolversTypes['My'], ParentType, ContextType>,
  now?: Resolver<ResolversTypes['NowInfo'], ParentType, ContextType>,
  rooms?: Resolver<Array<Maybe<ResolversTypes['Room']>>, ParentType, ContextType>,
  cm2Customers?: Resolver<ResolversTypes['Cm2CustomerConnection'], ParentType, ContextType, QueryCm2CustomersArgs>,
  cm2Orders?: Resolver<ResolversTypes['Cm2OrderConnection'], ParentType, ContextType, QueryCm2OrdersArgs>,
  cm2Customer?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType, RequireFields<QueryCm2CustomerArgs, 'id'>>,
  cm2Order?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType, RequireFields<QueryCm2OrderArgs, 'id'>>,
  ratioTrainings?: Resolver<ResolversTypes['RatioTrainingConnection'], ParentType, ContextType, QueryRatioTrainingsArgs>,
  ratioTrainingBySlug?: Resolver<ResolversTypes['RatioTraining'], ParentType, ContextType, RequireFields<QueryRatioTrainingBySlugArgs, 'slug'>>,
  ratioTrainersAll?: Resolver<Array<ResolversTypes['RatioTrainer']>, ParentType, ContextType>,
  cashierPayments?: Resolver<ResolversTypes['CashierPaymentConnection'], ParentType, ContextType, QueryCashierPaymentsArgs>,
  watchmenWatchmenAll?: Resolver<Array<ResolversTypes['WatchmenWatchman']>, ParentType, ContextType, QueryWatchmenWatchmenAllArgs>,
  watchmenGradesAll?: Resolver<Array<ResolversTypes['WatchmenGrade']>, ParentType, ContextType>,
  watchmenShifts?: Resolver<Array<ResolversTypes['WatchmenShift']>, ParentType, ContextType, QueryWatchmenShiftsArgs>,
  zadarmaPbxCalls?: Resolver<ResolversTypes['ZadarmaPbxCallConnection'], ParentType, ContextType, QueryZadarmaPbxCallsArgs>,
  zadarmaPbxCall?: Resolver<ResolversTypes['ZadarmaPbxCall'], ParentType, ContextType, RequireFields<QueryZadarmaPbxCallArgs, 'pbx_call_id'>>,
  imageTemplatesAll?: Resolver<Array<ResolversTypes['ImageTemplate']>, ParentType, ContextType>,
  imageTemplateBySlug?: Resolver<ResolversTypes['ImageTemplate'], ParentType, ContextType, RequireFields<QueryImageTemplateBySlugArgs, 'slug'>>,
  staffMembersAll?: Resolver<Array<ResolversTypes['StaffMember']>, ParentType, ContextType>,
  staffMember?: Resolver<ResolversTypes['StaffMember'], ParentType, ContextType, RequireFields<QueryStaffMemberArgs, 'id'>>,
  currentUser?: Resolver<ResolversTypes['AuthCurrentUser'], ParentType, ContextType>,
  authGroupsAll?: Resolver<Array<ResolversTypes['AuthGroup']>, ParentType, ContextType>,
  authPermissionsAll?: Resolver<Array<ResolversTypes['AuthPermission']>, ParentType, ContextType>,
};

export type RatioActivityResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioActivity'] = ResolversParentTypes['RatioActivity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  time?: Resolver<ResolversTypes['Time'], ParentType, ContextType>,
  activity_type?: Resolver<ResolversTypes['ActivityActivityType'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  trainer?: Resolver<Maybe<ResolversTypes['RatioTrainer']>, ParentType, ContextType>,
};

export type RatioTicketResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioTicket'] = ResolversParentTypes['RatioTicket']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  training?: Resolver<ResolversTypes['RatioTraining'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  registration_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  status?: Resolver<ResolversTypes['TicketStatus'], ParentType, ContextType>,
  ticket_type?: Resolver<ResolversTypes['TicketTicketType'], ParentType, ContextType>,
  payment_type?: Resolver<ResolversTypes['TicketPaymentType'], ParentType, ContextType>,
  payment_amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  fiscalization_status?: Resolver<ResolversTypes['TicketFiscalizationStatus'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type RatioTrainerResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioTrainer'] = ResolversParentTypes['RatioTrainer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  short_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  long_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type RatioTrainingResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioTraining'] = ResolversParentTypes['RatioTraining']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  salaries_paid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  tickets?: Resolver<Array<ResolversTypes['RatioTicket']>, ParentType, ContextType>,
  total_income?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  tickets_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  long_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  schedule?: Resolver<Array<ResolversTypes['RatioTrainingDay']>, ParentType, ContextType>,
};

export type RatioTrainingConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioTrainingConnection'] = ResolversParentTypes['RatioTrainingConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['RatioTrainingEdge']>, ParentType, ContextType>,
};

export type RatioTrainingDayResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioTrainingDay'] = ResolversParentTypes['RatioTrainingDay']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  activities?: Resolver<Array<ResolversTypes['RatioActivity']>, ParentType, ContextType>,
};

export type RatioTrainingEdgeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['RatioTrainingEdge'] = ResolversParentTypes['RatioTrainingEdge']> = {
  node?: Resolver<ResolversTypes['RatioTraining'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type RoomResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  max_people?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  area?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type SlackUserResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['SlackUser'] = ResolversParentTypes['SlackUser']> = {
  slack_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  image_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type StaffMemberResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['StaffMember'] = ResolversParentTypes['StaffMember']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  short_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  full_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['MemberRole'], ParentType, ContextType>,
  is_current?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  vk?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['AuthUser'], ParentType, ContextType>,
  slack_user?: Resolver<Maybe<ResolversTypes['SlackUser']>, ParentType, ContextType>,
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time'
}

export type WatchmenGradeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['WatchmenGrade'] = ResolversParentTypes['WatchmenGrade']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  multiplier?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type WatchmenShiftResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['WatchmenShift'] = ResolversParentTypes['WatchmenShift']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  shift?: Resolver<ResolversTypes['ShiftShift'], ParentType, ContextType>,
  watchman?: Resolver<Maybe<ResolversTypes['WatchmenWatchman']>, ParentType, ContextType>,
  is_night?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type WatchmenWatchmanResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['WatchmenWatchman'] = ResolversParentTypes['WatchmenWatchman']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  member?: Resolver<ResolversTypes['StaffMember'], ParentType, ContextType>,
  grade?: Resolver<Maybe<ResolversTypes['WatchmenGrade']>, ParentType, ContextType>,
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type ZadarmaCallResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaCall'] = ResolversParentTypes['ZadarmaCall']> = {
  call_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ts?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  call_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  disposition?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  clid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  destination?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sip?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  is_recorded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  watchman?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  record?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ZadarmaDataResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaData'] = ResolversParentTypes['ZadarmaData']> = {
  staff_member?: Resolver<Maybe<ResolversTypes['StaffMember']>, ParentType, ContextType>,
};

export type ZadarmaPbxCallResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaPbxCall'] = ResolversParentTypes['ZadarmaPbxCall']> = {
  pbx_call_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ts?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['ZadarmaData']>, ParentType, ContextType>,
  calls?: Resolver<Array<ResolversTypes['ZadarmaCall']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type ZadarmaPbxCallConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaPbxCallConnection'] = ResolversParentTypes['ZadarmaPbxCallConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['ZadarmaPbxCallEdge']>, ParentType, ContextType>,
};

export type ZadarmaPbxCallEdgeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaPbxCallEdge'] = ResolversParentTypes['ZadarmaPbxCallEdge']> = {
  node?: Resolver<ResolversTypes['ZadarmaPbxCall'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = TContext> = {
  AuthCurrentUser?: AuthCurrentUserResolvers<ContextType>,
  AuthGroup?: AuthGroupResolvers<ContextType>,
  AuthPermission?: AuthPermissionResolvers<ContextType>,
  AuthUser?: AuthUserResolvers<ContextType>,
  CashierPayment?: CashierPaymentResolvers<ContextType>,
  CashierPaymentConnection?: CashierPaymentConnectionResolvers<ContextType>,
  CashierPaymentEdge?: CashierPaymentEdgeResolvers<ContextType>,
  Cm2Customer?: Cm2CustomerResolvers<ContextType>,
  Cm2CustomerConnection?: Cm2CustomerConnectionResolvers<ContextType>,
  Cm2CustomerEdge?: Cm2CustomerEdgeResolvers<ContextType>,
  Cm2Order?: Cm2OrderResolvers<ContextType>,
  Cm2OrderConnection?: Cm2OrderConnectionResolvers<ContextType>,
  Cm2OrderEdge?: Cm2OrderEdgeResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  EmailMailchimpCategory?: EmailMailchimpCategoryResolvers<ContextType>,
  EmailMailchimpInterest?: EmailMailchimpInterestResolvers<ContextType>,
  EmailSubscribeChannel?: EmailSubscribeChannelResolvers<ContextType>,
  EventsPublicEvent?: EventsPublicEventResolvers<ContextType>,
  ImageTemplate?: ImageTemplateResolvers<ContextType>,
  ImageTemplateSchema?: ImageTemplateSchemaResolvers<ContextType>,
  ImageTemplateSchemaField?: ImageTemplateSchemaFieldResolvers<ContextType>,
  ImageTemplateSizes?: ImageTemplateSizesResolvers<ContextType>,
  KkmRegisterCheckResult?: KkmRegisterCheckResultResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  My?: MyResolvers<ContextType>,
  MyEmailSubscription?: MyEmailSubscriptionResolvers<ContextType>,
  MyEmailSubscriptionInterest?: MyEmailSubscriptionInterestResolvers<ContextType>,
  MyMembership?: MyMembershipResolvers<ContextType>,
  MyOrder?: MyOrderResolvers<ContextType>,
  MyTicket?: MyTicketResolvers<ContextType>,
  Node?: NodeResolvers,
  NowCustomer?: NowCustomerResolvers<ContextType>,
  NowInfo?: NowInfoResolvers<ContextType>,
  Ok?: OkResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  RatioActivity?: RatioActivityResolvers<ContextType>,
  RatioTicket?: RatioTicketResolvers<ContextType>,
  RatioTrainer?: RatioTrainerResolvers<ContextType>,
  RatioTraining?: RatioTrainingResolvers<ContextType>,
  RatioTrainingConnection?: RatioTrainingConnectionResolvers<ContextType>,
  RatioTrainingDay?: RatioTrainingDayResolvers<ContextType>,
  RatioTrainingEdge?: RatioTrainingEdgeResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  SlackUser?: SlackUserResolvers<ContextType>,
  StaffMember?: StaffMemberResolvers<ContextType>,
  Time?: GraphQLScalarType,
  WatchmenGrade?: WatchmenGradeResolvers<ContextType>,
  WatchmenShift?: WatchmenShiftResolvers<ContextType>,
  WatchmenWatchman?: WatchmenWatchmanResolvers<ContextType>,
  ZadarmaCall?: ZadarmaCallResolvers<ContextType>,
  ZadarmaData?: ZadarmaDataResolvers<ContextType>,
  ZadarmaPbxCall?: ZadarmaPbxCallResolvers<ContextType>,
  ZadarmaPbxCallConnection?: ZadarmaPbxCallConnectionResolvers<ContextType>,
  ZadarmaPbxCallEdge?: ZadarmaPbxCallEdgeResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = TContext> = Resolvers<ContextType>;
