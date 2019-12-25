import { GraphQLResolveInfo } from 'graphql';
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


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
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
  AuthCurrentUser: ResolverTypeWrapper<AuthCurrentUser>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  AuthGroup: ResolverTypeWrapper<AuthGroup>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  AuthPermission: ResolverTypeWrapper<AuthPermission>,
  AuthUser: ResolverTypeWrapper<AuthUser>,
  StaffMember: ResolverTypeWrapper<StaffMember>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  CashierPaymentConnection: ResolverTypeWrapper<CashierPaymentConnection>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  CashierPayment: ResolverTypeWrapper<CashierPayment>,
  Cm2CustomerConnection: ResolverTypeWrapper<Cm2CustomerConnection>,
  Cm2Customer: ResolverTypeWrapper<Cm2Customer>,
  Cm2OrderConnection: ResolverTypeWrapper<Cm2OrderConnection>,
  Cm2Order: ResolverTypeWrapper<Cm2Order>,
  Room: ResolverTypeWrapper<Room>,
  WatchmenWatchman: ResolverTypeWrapper<WatchmenWatchman>,
  WatchmenGrade: ResolverTypeWrapper<WatchmenGrade>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  WatchmenShift: ResolverTypeWrapper<WatchmenShift>,
  ZadarmaPbxCallConnection: ResolverTypeWrapper<ZadarmaPbxCallConnection>,
  ZadarmaPbxCall: ResolverTypeWrapper<ZadarmaPbxCall>,
  ZadarmaCall: ResolverTypeWrapper<ZadarmaCall>,
  ZadarmaData: ResolverTypeWrapper<ZadarmaData>,
  Mutation: ResolverTypeWrapper<{}>,
  CashierCreatePaymentInput: CashierCreatePaymentInput,
  Cm2CreateOrderInput: Cm2CreateOrderInput,
  Cm2CreateCustomerInput: Cm2CreateCustomerInput,
  WatchmenSetWatchmanPriorityInput: WatchmenSetWatchmanPriorityInput,
  WatchmenSetWatchmanGradeInput: WatchmenSetWatchmanGradeInput,
  WatchmenCreateWatchmanInput: WatchmenCreateWatchmanInput,
  WatchmenUpdateShiftInput: WatchmenUpdateShiftInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  AuthCurrentUser: AuthCurrentUser,
  Boolean: Scalars['Boolean'],
  String: Scalars['String'],
  AuthGroup: AuthGroup,
  ID: Scalars['ID'],
  AuthPermission: AuthPermission,
  AuthUser: AuthUser,
  StaffMember: StaffMember,
  Int: Scalars['Int'],
  CashierPaymentConnection: CashierPaymentConnection,
  PageInfo: PageInfo,
  CashierPayment: CashierPayment,
  Cm2CustomerConnection: Cm2CustomerConnection,
  Cm2Customer: Cm2Customer,
  Cm2OrderConnection: Cm2OrderConnection,
  Cm2Order: Cm2Order,
  Room: Room,
  WatchmenWatchman: WatchmenWatchman,
  WatchmenGrade: WatchmenGrade,
  Float: Scalars['Float'],
  WatchmenShift: WatchmenShift,
  ZadarmaPbxCallConnection: ZadarmaPbxCallConnection,
  ZadarmaPbxCall: ZadarmaPbxCall,
  ZadarmaCall: ZadarmaCall,
  ZadarmaData: ZadarmaData,
  Mutation: {},
  CashierCreatePaymentInput: CashierCreatePaymentInput,
  Cm2CreateOrderInput: Cm2CreateOrderInput,
  Cm2CreateCustomerInput: Cm2CreateCustomerInput,
  WatchmenSetWatchmanPriorityInput: WatchmenSetWatchmanPriorityInput,
  WatchmenSetWatchmanGradeInput: WatchmenSetWatchmanGradeInput,
  WatchmenCreateWatchmanInput: WatchmenCreateWatchmanInput,
  WatchmenUpdateShiftInput: WatchmenUpdateShiftInput,
};

export type AuthCurrentUserResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['AuthCurrentUser'] = ResolversParentTypes['AuthCurrentUser']> = {
  is_authenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  permissions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  is_staff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
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
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  whom?: Resolver<ResolversTypes['AuthUser'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  is_redeemed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  created_dt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  redeem_dt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type CashierPaymentConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['CashierPaymentConnection'] = ResolversParentTypes['CashierPaymentConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  nodes?: Resolver<Array<ResolversTypes['CashierPayment']>, ParentType, ContextType>,
};

export type Cm2CustomerResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2Customer'] = ResolversParentTypes['Cm2Customer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  card_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orders?: Resolver<ResolversTypes['Cm2OrderConnection'], ParentType, ContextType>,
};

export type Cm2CustomerConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2CustomerConnection'] = ResolversParentTypes['Cm2CustomerConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  nodes?: Resolver<Array<ResolversTypes['Cm2Customer']>, ParentType, ContextType>,
};

export type Cm2OrderResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2Order'] = ResolversParentTypes['Cm2Order']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  customer?: Resolver<Maybe<ResolversTypes['Cm2Customer']>, ParentType, ContextType>,
};

export type Cm2OrderConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Cm2OrderConnection'] = ResolversParentTypes['Cm2OrderConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  nodes?: Resolver<Array<ResolversTypes['Cm2Order']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  authAddUserToGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAuthAddUserToGroupArgs, 'user_id' | 'group_id'>>,
  authRemoveUserFromGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAuthRemoveUserFromGroupArgs, 'user_id' | 'group_id'>>,
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cashierCreatePayment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCashierCreatePaymentArgs, 'params'>>,
  cashierRedeemPayment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCashierRedeemPaymentArgs, 'id'>>,
  cm2CreateOrder?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType, RequireFields<MutationCm2CreateOrderArgs, 'params'>>,
  cm2CreateCustomer?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType, RequireFields<MutationCm2CreateCustomerArgs, 'params'>>,
  cm2CloseOrder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCm2CloseOrderArgs, 'id'>>,
  staffGrantGooglePermissionsToMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationStaffGrantGooglePermissionsToMemberArgs, 'id'>>,
  staffFireMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationStaffFireMemberArgs, 'id'>>,
  watchmenSetWatchmanPriority?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationWatchmenSetWatchmanPriorityArgs, 'params'>>,
  watchmenSetWatchmanGrade?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationWatchmenSetWatchmanGradeArgs, 'params'>>,
  watchmenCreateWatchman?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationWatchmenCreateWatchmanArgs, 'params'>>,
  watchmenUpdateShift?: Resolver<ResolversTypes['WatchmenShift'], ParentType, ContextType, RequireFields<MutationWatchmenUpdateShiftArgs, 'params'>>,
  zadarmaSetMemberForPbxCall?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationZadarmaSetMemberForPbxCallArgs, 'pbx_call_id' | 'member_id'>>,
};

export type PageInfoResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  pageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<ResolversTypes['AuthCurrentUser'], ParentType, ContextType>,
  authGroupsAll?: Resolver<Array<ResolversTypes['AuthGroup']>, ParentType, ContextType>,
  authPermissionsAll?: Resolver<Array<ResolversTypes['AuthPermission']>, ParentType, ContextType>,
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cashierPayments?: Resolver<ResolversTypes['CashierPaymentConnection'], ParentType, ContextType, QueryCashierPaymentsArgs>,
  cm2Customers?: Resolver<ResolversTypes['Cm2CustomerConnection'], ParentType, ContextType, QueryCm2CustomersArgs>,
  cm2Orders?: Resolver<ResolversTypes['Cm2OrderConnection'], ParentType, ContextType, QueryCm2OrdersArgs>,
  cm2Customer?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType, RequireFields<QueryCm2CustomerArgs, 'id'>>,
  cm2Order?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType, RequireFields<QueryCm2OrderArgs, 'id'>>,
  rooms?: Resolver<Array<Maybe<ResolversTypes['Room']>>, ParentType, ContextType>,
  staffMembersAll?: Resolver<Array<ResolversTypes['StaffMember']>, ParentType, ContextType>,
  staffMember?: Resolver<ResolversTypes['StaffMember'], ParentType, ContextType, RequireFields<QueryStaffMemberArgs, 'id'>>,
  watchmenWatchmenAll?: Resolver<Array<ResolversTypes['WatchmenWatchman']>, ParentType, ContextType>,
  watchmenGradesAll?: Resolver<Array<ResolversTypes['WatchmenGrade']>, ParentType, ContextType>,
  watchmenShifts?: Resolver<Array<ResolversTypes['WatchmenShift']>, ParentType, ContextType, QueryWatchmenShiftsArgs>,
  zadarmaPbxCalls?: Resolver<ResolversTypes['ZadarmaPbxCallConnection'], ParentType, ContextType, QueryZadarmaPbxCallsArgs>,
  zadarmaPbxCall?: Resolver<ResolversTypes['ZadarmaPbxCall'], ParentType, ContextType, RequireFields<QueryZadarmaPbxCallArgs, 'pbx_call_id'>>,
};

export type RoomResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  max_people?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  area?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type StaffMemberResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['StaffMember'] = ResolversParentTypes['StaffMember']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  full_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  short_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  is_current?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  slack_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slack_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vk?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type WatchmenGradeResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['WatchmenGrade'] = ResolversParentTypes['WatchmenGrade']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  multiplier?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type WatchmenShiftResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['WatchmenShift'] = ResolversParentTypes['WatchmenShift']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  shift?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  watchman?: Resolver<Maybe<ResolversTypes['WatchmenWatchman']>, ParentType, ContextType>,
  is_night?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type WatchmenWatchmanResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['WatchmenWatchman'] = ResolversParentTypes['WatchmenWatchman']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  member?: Resolver<ResolversTypes['StaffMember'], ParentType, ContextType>,
  grade?: Resolver<Maybe<ResolversTypes['WatchmenGrade']>, ParentType, ContextType>,
};

export type ZadarmaCallResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaCall'] = ResolversParentTypes['ZadarmaCall']> = {
  call_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ts?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  watchman?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  call_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  disposition?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  clid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  destination?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sip?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  record?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ZadarmaDataResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaData'] = ResolversParentTypes['ZadarmaData']> = {
  staff_member?: Resolver<Maybe<ResolversTypes['StaffMember']>, ParentType, ContextType>,
};

export type ZadarmaPbxCallResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaPbxCall'] = ResolversParentTypes['ZadarmaPbxCall']> = {
  pbx_call_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ts?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  calls?: Resolver<Array<ResolversTypes['ZadarmaCall']>, ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['ZadarmaData']>, ParentType, ContextType>,
};

export type ZadarmaPbxCallConnectionResolvers<ContextType = TContext, ParentType extends ResolversParentTypes['ZadarmaPbxCallConnection'] = ResolversParentTypes['ZadarmaPbxCallConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  nodes?: Resolver<Array<ResolversTypes['ZadarmaPbxCall']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = TContext> = {
  AuthCurrentUser?: AuthCurrentUserResolvers<ContextType>,
  AuthGroup?: AuthGroupResolvers<ContextType>,
  AuthPermission?: AuthPermissionResolvers<ContextType>,
  AuthUser?: AuthUserResolvers<ContextType>,
  CashierPayment?: CashierPaymentResolvers<ContextType>,
  CashierPaymentConnection?: CashierPaymentConnectionResolvers<ContextType>,
  Cm2Customer?: Cm2CustomerResolvers<ContextType>,
  Cm2CustomerConnection?: Cm2CustomerConnectionResolvers<ContextType>,
  Cm2Order?: Cm2OrderResolvers<ContextType>,
  Cm2OrderConnection?: Cm2OrderConnectionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  StaffMember?: StaffMemberResolvers<ContextType>,
  WatchmenGrade?: WatchmenGradeResolvers<ContextType>,
  WatchmenShift?: WatchmenShiftResolvers<ContextType>,
  WatchmenWatchman?: WatchmenWatchmanResolvers<ContextType>,
  ZadarmaCall?: ZadarmaCallResolvers<ContextType>,
  ZadarmaData?: ZadarmaDataResolvers<ContextType>,
  ZadarmaPbxCall?: ZadarmaPbxCallResolvers<ContextType>,
  ZadarmaPbxCallConnection?: ZadarmaPbxCallConnectionResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = TContext> = Resolvers<ContextType>;
