import { GraphQLResolveInfo } from 'graphql';
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
  _empty?: Maybe<Scalars['String']>,
  cm2CreateOrder: Cm2Order,
  cm2CreateCustomer: Cm2Customer,
  cm2CloseOrder?: Maybe<Scalars['Boolean']>,
  staffGrantGooglePermissionsToMember?: Maybe<Scalars['Boolean']>,
  staffFireMember?: Maybe<Scalars['Boolean']>,
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

export type PageInfo = {
   __typename?: 'PageInfo',
  pageNumber: Scalars['Int'],
  hasNextPage: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
  rooms: Array<Maybe<Room>>,
  staffMembersAll: Array<StaffMember>,
  staffMember: StaffMember,
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
  id?: Maybe<Scalars['ID']>
};


export type QueryCm2OrderArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
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
  user_id: Scalars['Int'],
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Cm2CustomerConnection: ResolverTypeWrapper<Cm2CustomerConnection>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Cm2Customer: ResolverTypeWrapper<Cm2Customer>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Cm2OrderConnection: ResolverTypeWrapper<Cm2OrderConnection>,
  Cm2Order: ResolverTypeWrapper<Cm2Order>,
  Room: ResolverTypeWrapper<Room>,
  StaffMember: ResolverTypeWrapper<StaffMember>,
  Mutation: ResolverTypeWrapper<{}>,
  Cm2CreateOrderInput: Cm2CreateOrderInput,
  Cm2CreateCustomerInput: Cm2CreateCustomerInput,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  Int: Scalars['Int'],
  Cm2CustomerConnection: Cm2CustomerConnection,
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  Cm2Customer: Cm2Customer,
  ID: Scalars['ID'],
  Cm2OrderConnection: Cm2OrderConnection,
  Cm2Order: Cm2Order,
  Room: Room,
  StaffMember: StaffMember,
  Mutation: {},
  Cm2CreateOrderInput: Cm2CreateOrderInput,
  Cm2CreateCustomerInput: Cm2CreateCustomerInput,
}>;

export type Cm2CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cm2Customer'] = ResolversParentTypes['Cm2Customer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  card_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orders?: Resolver<ResolversTypes['Cm2OrderConnection'], ParentType, ContextType>,
}>;

export type Cm2CustomerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cm2CustomerConnection'] = ResolversParentTypes['Cm2CustomerConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  nodes?: Resolver<Array<ResolversTypes['Cm2Customer']>, ParentType, ContextType>,
}>;

export type Cm2OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cm2Order'] = ResolversParentTypes['Cm2Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  customer?: Resolver<Maybe<ResolversTypes['Cm2Customer']>, ParentType, ContextType>,
}>;

export type Cm2OrderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cm2OrderConnection'] = ResolversParentTypes['Cm2OrderConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  nodes?: Resolver<Array<ResolversTypes['Cm2Order']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cm2CreateOrder?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType, RequireFields<MutationCm2CreateOrderArgs, 'params'>>,
  cm2CreateCustomer?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType, RequireFields<MutationCm2CreateCustomerArgs, 'params'>>,
  cm2CloseOrder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCm2CloseOrderArgs, 'id'>>,
  staffGrantGooglePermissionsToMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationStaffGrantGooglePermissionsToMemberArgs, 'id'>>,
  staffFireMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationStaffFireMemberArgs, 'id'>>,
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  pageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cm2Customers?: Resolver<ResolversTypes['Cm2CustomerConnection'], ParentType, ContextType, QueryCm2CustomersArgs>,
  cm2Orders?: Resolver<ResolversTypes['Cm2OrderConnection'], ParentType, ContextType, QueryCm2OrdersArgs>,
  cm2Customer?: Resolver<ResolversTypes['Cm2Customer'], ParentType, ContextType, QueryCm2CustomerArgs>,
  cm2Order?: Resolver<ResolversTypes['Cm2Order'], ParentType, ContextType, QueryCm2OrderArgs>,
  rooms?: Resolver<Array<Maybe<ResolversTypes['Room']>>, ParentType, ContextType>,
  staffMembersAll?: Resolver<Array<ResolversTypes['StaffMember']>, ParentType, ContextType>,
  staffMember?: Resolver<ResolversTypes['StaffMember'], ParentType, ContextType, RequireFields<QueryStaffMemberArgs, 'id'>>,
}>;

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  max_people?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  area?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type StaffMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffMember'] = ResolversParentTypes['StaffMember']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  full_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  short_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  is_current?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  slack_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slack_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vk?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Cm2Customer?: Cm2CustomerResolvers<ContextType>,
  Cm2CustomerConnection?: Cm2CustomerConnectionResolvers<ContextType>,
  Cm2Order?: Cm2OrderResolvers<ContextType>,
  Cm2OrderConnection?: Cm2OrderConnectionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  StaffMember?: StaffMemberResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
