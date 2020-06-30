export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};




export type Query = {
  __typename?: 'Query';
  analyticsBovStats: Array<AnalyticsBovStat>;
  authGroupsAll: Array<AuthGroup>;
  authPermissionsAll: Array<AuthPermission>;
  cashierPayments: CashierPaymentConnection;
  cm2Customer: Cm2Customer;
  cm2Customers: Cm2CustomerConnection;
  cm2Order: Cm2Order;
  cm2Orders: Cm2OrderConnection;
  emailMailchimpCategoriesAll: Array<EmailMailchimpCategory>;
  emailSubscribeChannelsAll: Array<EmailSubscribeChannel>;
  event?: Maybe<EventsEvent>;
  events: EventsEventConnection;
  eventsPrototype: EventsPrototype;
  eventsPrototypes: Array<EventsPrototype>;
  eventsPublicGoogleCalendar?: Maybe<EventsGoogleCalendar>;
  eventsWeeklyDigestCurrent: EventsWeeklyDigest;
  imageTemplateBySlug: ImageTemplate;
  imageTemplatesAll: Array<ImageTemplate>;
  importers: Array<Importer>;
  mastermindDatingCohortById: MastermindDatingCohort;
  mastermindDatingCohorts: Array<MastermindDatingCohort>;
  my: My;
  now: NowInfo;
  projects: Array<ProjectPage>;
  publicEvent: EventsPublicEvent;
  publicEvents: EventsPublicEventConnection;
  ratioTrainersAll: Array<RatioTrainer>;
  ratioTrainingBySlug: RatioTraining;
  ratioTrainingEmailPrototype: Scalars['String'];
  ratioTrainings: RatioTrainingConnection;
  rooms: Array<Maybe<Room>>;
  staffMember: StaffMember;
  staffMembersAll: Array<StaffMember>;
  tildaPage?: Maybe<TildaPage>;
  tildaPages: Array<TildaPage>;
  timepadCategories: Array<TimepadCategory>;
  vkGroups: Array<VkGroup>;
  wagtailPage?: Maybe<WagtailPage>;
  wagtailPages: Array<WagtailPage>;
  watchmenGradesAll: Array<WatchmenGrade>;
  watchmenShifts: Array<WatchmenShift>;
  watchmenWatchmenAll: Array<WatchmenWatchman>;
  zadarmaPbxCall: ZadarmaPbxCall;
  zadarmaPbxCalls: ZadarmaPbxCallConnection;
};


export type QueryCashierPaymentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCm2CustomerArgs = {
  id: Scalars['ID'];
};


export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCm2OrderArgs = {
  id: Scalars['ID'];
};


export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  event_id: Scalars['ID'];
};


export type QueryEventsArgs = {
  search?: Maybe<Scalars['String']>;
  filter?: Maybe<EventsFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEventsPrototypeArgs = {
  id: Scalars['ID'];
};


export type QueryImageTemplateBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryMastermindDatingCohortByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPublicEventArgs = {
  event_id: Scalars['ID'];
};


export type QueryPublicEventsArgs = {
  from_date?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['ID']>;
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


export type QueryRatioTrainingsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID'];
};


export type QueryTildaPageArgs = {
  path: Scalars['String'];
};


export type QueryWagtailPageArgs = {
  path?: Maybe<Scalars['String']>;
  preview_token?: Maybe<Scalars['String']>;
};


export type QueryWatchmenShiftsArgs = {
  from_date: Scalars['String'];
  to_date: Scalars['String'];
};


export type QueryWatchmenWatchmenAllArgs = {
  currentStaff?: Maybe<Scalars['Boolean']>;
  currentRole?: Maybe<Scalars['Boolean']>;
};


export type QueryZadarmaPbxCallArgs = {
  pbx_call_id: Scalars['ID'];
};


export type QueryZadarmaPbxCallsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type My = {
  __typename?: 'My';
  _?: Maybe<Scalars['Boolean']>;
  email_subscription: MyEmailSubscription;
  membership?: Maybe<MyCmCustomer>;
  tickets: MyEventsTicketConnection;
  user: AuthCurrentUser;
};


export type MyTicketsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Room = {
  __typename?: 'Room';
  name?: Maybe<Scalars['String']>;
  max_people?: Maybe<Scalars['Int']>;
  area?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['Boolean']>;
  authAddUserToGroup?: Maybe<Scalars['Boolean']>;
  authLogin: AuthLoginResult;
  authLogout: AuthLogoutResult;
  authRemoveUserFromGroup?: Maybe<Scalars['Boolean']>;
  authSendMagicLink: AuthSendMagicLinkResult;
  authSetMyNames: AuthSetMyNamesResult;
  authSetPassword: AuthSetPasswordResult;
  cashierCreatePayment?: Maybe<Scalars['Boolean']>;
  cashierRedeemPayment?: Maybe<Scalars['Boolean']>;
  cm2CloseOrder?: Maybe<Scalars['Boolean']>;
  cm2CreateCustomer: Cm2Customer;
  cm2CreateOrder: Cm2Order;
  emailSubscribeChannelAddEmail?: Maybe<Scalars['Boolean']>;
  emailSubscribeChannelCreate?: Maybe<Scalars['Boolean']>;
  emailSubscribeChannelDelete?: Maybe<Scalars['Boolean']>;
  eventAddTag: EventUpdateResult;
  eventAnnounce: EventUpdateResult;
  eventCreate: EventCreateResult;
  eventDelete: BasicResult;
  eventDeleteTag: EventUpdateResult;
  eventGenerateOpenViduToken?: Maybe<EventGenerateOpenViduTokenResult>;
  eventGenerateZoomLink: EventUpdateResult;
  eventMove: EventUpdateResult;
  eventPrototypeAddTag: EventPrototypeAddTagResult;
  eventPrototypeCancelDate: EventPrototypeCancelDateResult;
  eventPrototypeCreate: EventPrototypeCreateResult;
  eventPrototypeDeleteTag: EventPrototypeDeleteTagResult;
  eventPrototypeNewEvent: EventPrototypeNewEventResult;
  eventPrototypeSetImage: EventPrototypeSetImageResult;
  eventPrototypeUpdate: EventPrototypeUpdateResult;
  eventSetAnnounceUrl: EventUpdateResult;
  eventSetEventType: EventUpdateResult;
  eventSetImageFromUrl: EventUpdateResult;
  eventSetPricingType: EventUpdateResult;
  eventSetRealm: EventUpdateResult;
  eventSetZoomLink: EventUpdateResult;
  eventTimepadAnnouncementUpdate: EventUpdateResult;
  eventUpdate: EventUpdateResult;
  eventVkAnnouncementSetImage: EventUpdateResult;
  eventVkAnnouncementUpdate: EventUpdateResult;
  eventsFeedbackCreate: EventsFeedbackCreateResult;
  eventsFeedbackDelete: BasicResult;
  eventsWeeklyDigestPostMailchimp: EventsWeeklyDigestUpdateResult;
  eventsWeeklyDigestPostTelegram: EventsWeeklyDigestUpdateResult;
  eventsWeeklyDigestPostVk: EventsWeeklyDigestUpdateResult;
  fbMarketingAudienceUploadRatioTickets: BasicResult;
  kkmRegisterCheck: KkmRegisterCheckResult;
  mastermindDatingActivateVoting: MastermindDatingParticipantMutationResult;
  mastermindDatingBroadcastSolution: MastermindDatingCohortMutationResult;
  mastermindDatingClearAllGroups: MastermindDatingCohortMutationResult;
  mastermindDatingCreateCohort: MastermindDatingCohortMutationResult;
  mastermindDatingCreateGroup: MastermindDatingCohortMutationResult;
  mastermindDatingCreateParticipant: MastermindDatingParticipantMutationResult;
  mastermindDatingDeleteCohort: MastermindDatingTrivialMutationResult;
  mastermindDatingPopulateCohortFromEvent: MastermindDatingCohortMutationResult;
  mastermindDatingRunSolver: MastermindDatingCohortMutationResult;
  mastermindDatingSendInviteEmails: MastermindDatingCohortMutationResult;
  mastermindDatingSetEventForCohort: MastermindDatingCohortMutationResult;
  mastermindDatingSetPresenceStatus: MastermindDatingParticipantMutationResult;
  mastermindDatingUnsetEventForCohort: MastermindDatingCohortMutationResult;
  myEmailResubscribe?: Maybe<Scalars['Boolean']>;
  myEmailSubscribeToInterest?: Maybe<Scalars['Boolean']>;
  myEmailUnsubscribe?: Maybe<Scalars['Boolean']>;
  myEmailUnsubscribeFromInterest?: Maybe<Scalars['Boolean']>;
  myEventsTicketRegister: MyEventsTicket;
  myEventsTicketRegisterAnon: MyEventsTicket;
  myEventsTicketUnregister: MyEventsTicket;
  myPrivacyModeSet?: Maybe<Scalars['Boolean']>;
  openviduGenerateRoomToken?: Maybe<OpenviduGenerateRoomTokenResult>;
  ratioAddTicket: RatioTicket;
  ratioAddTraining: RatioTraining;
  ratioTicketFiscalize?: Maybe<Scalars['Boolean']>;
  ratioTrainingAddDay?: Maybe<Scalars['Boolean']>;
  ratioTrainingCopyScheduleFrom?: Maybe<Scalars['Boolean']>;
  ratioTrainingSendEmail: RatioTrainingSendEmailResult;
  ratioTrainingSyncParticipantsToMailchimp?: Maybe<Scalars['Boolean']>;
  staffFireMember?: Maybe<Scalars['Boolean']>;
  staffGrantGooglePermissionsToMember?: Maybe<Scalars['Boolean']>;
  staffUnfireMember?: Maybe<Scalars['Boolean']>;
  vkWikiScheduleUpdate?: Maybe<BasicResult>;
  watchmenCreateWatchman?: Maybe<Scalars['Boolean']>;
  watchmenSetWatchmanGrade?: Maybe<Scalars['Boolean']>;
  watchmenSetWatchmanPriority?: Maybe<Scalars['Boolean']>;
  watchmenUpdateShift: WatchmenShift;
  zadarmaSetMemberForPbxCall?: Maybe<Scalars['Boolean']>;
};


export type MutationAuthAddUserToGroupArgs = {
  group_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationAuthLoginArgs = {
  input: AuthLoginInput;
};


export type MutationAuthRemoveUserFromGroupArgs = {
  group_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationAuthSendMagicLinkArgs = {
  input: AuthSendMagicLinkInput;
};


export type MutationAuthSetMyNamesArgs = {
  input: AuthSetMyNamesInput;
};


export type MutationAuthSetPasswordArgs = {
  input: AuthSetPasswordInput;
};


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput;
};


export type MutationCashierRedeemPaymentArgs = {
  id: Scalars['ID'];
};


export type MutationCm2CloseOrderArgs = {
  id: Scalars['ID'];
};


export type MutationCm2CreateCustomerArgs = {
  input: Cm2CreateCustomerInput;
};


export type MutationCm2CreateOrderArgs = {
  input: Cm2CreateOrderInput;
};


export type MutationEmailSubscribeChannelAddEmailArgs = {
  slug: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEmailSubscribeChannelCreateArgs = {
  params: EmailSubscribeChannelCreateInput;
};


export type MutationEmailSubscribeChannelDeleteArgs = {
  slug: Scalars['String'];
};


export type MutationEventAddTagArgs = {
  input: EventAddTagInput;
};


export type MutationEventAnnounceArgs = {
  input: EventAnnounceInput;
};


export type MutationEventCreateArgs = {
  input: EventCreateInput;
};


export type MutationEventDeleteArgs = {
  input: EventDeleteInput;
};


export type MutationEventDeleteTagArgs = {
  input: EventDeleteTagInput;
};


export type MutationEventGenerateOpenViduTokenArgs = {
  input?: Maybe<EventGenerateOpenViduTokenInput>;
};


export type MutationEventGenerateZoomLinkArgs = {
  input: EventGenerateZoomLinkInput;
};


export type MutationEventMoveArgs = {
  input: EventMoveInput;
};


export type MutationEventPrototypeAddTagArgs = {
  input: EventPrototypeAddTagInput;
};


export type MutationEventPrototypeCancelDateArgs = {
  input: EventPrototypeCancelDateInput;
};


export type MutationEventPrototypeCreateArgs = {
  input: EventPrototypeCreateInput;
};


export type MutationEventPrototypeDeleteTagArgs = {
  input: EventPrototypeDeleteTagInput;
};


export type MutationEventPrototypeNewEventArgs = {
  input: EventPrototypeNewEventInput;
};


export type MutationEventPrototypeSetImageArgs = {
  input: EventPrototypeSetImageInput;
};


export type MutationEventPrototypeUpdateArgs = {
  input: EventPrototypeUpdateInput;
};


export type MutationEventSetAnnounceUrlArgs = {
  input: EventSetAnnounceUrlInput;
};


export type MutationEventSetEventTypeArgs = {
  input: EventSetEventTypeInput;
};


export type MutationEventSetImageFromUrlArgs = {
  input: EventSetImageFromUrlInput;
};


export type MutationEventSetPricingTypeArgs = {
  input: EventSetPricingTypeInput;
};


export type MutationEventSetRealmArgs = {
  input: EventSetRealmInput;
};


export type MutationEventSetZoomLinkArgs = {
  input: EventSetZoomLinkInput;
};


export type MutationEventTimepadAnnouncementUpdateArgs = {
  input: EventTimepadAnnouncementUpdateInput;
};


export type MutationEventUpdateArgs = {
  input: EventUpdateInput;
};


export type MutationEventVkAnnouncementSetImageArgs = {
  input: EventVkAnnouncementSetImageInput;
};


export type MutationEventVkAnnouncementUpdateArgs = {
  input: EventVkAnnouncementUpdateInput;
};


export type MutationEventsFeedbackCreateArgs = {
  input?: Maybe<EventsFeedbackCreateInput>;
};


export type MutationEventsFeedbackDeleteArgs = {
  input?: Maybe<EventsFeedbackDeleteInput>;
};


export type MutationEventsWeeklyDigestPostMailchimpArgs = {
  input?: Maybe<EventsWeeklyDigestPostMailchimpInput>;
};


export type MutationKkmRegisterCheckArgs = {
  params: KkmRegisterCheckInput;
};


export type MutationMastermindDatingActivateVotingArgs = {
  participant_id: Scalars['ID'];
};


export type MutationMastermindDatingBroadcastSolutionArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingClearAllGroupsArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingCreateGroupArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingCreateParticipantArgs = {
  cohort_id: Scalars['ID'];
  email: Scalars['String'];
};


export type MutationMastermindDatingDeleteCohortArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingPopulateCohortFromEventArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingRunSolverArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingSendInviteEmailsArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMastermindDatingSetEventForCohortArgs = {
  cohort_id: Scalars['ID'];
  event_id: Scalars['String'];
};


export type MutationMastermindDatingSetPresenceStatusArgs = {
  participant_id: Scalars['ID'];
  present: Scalars['Boolean'];
};


export type MutationMastermindDatingUnsetEventForCohortArgs = {
  cohort_id: Scalars['ID'];
};


export type MutationMyEmailSubscribeToInterestArgs = {
  interest_id: Scalars['ID'];
};


export type MutationMyEmailUnsubscribeFromInterestArgs = {
  interest_id: Scalars['ID'];
};


export type MutationMyEventsTicketRegisterArgs = {
  event_id: Scalars['ID'];
};


export type MutationMyEventsTicketRegisterAnonArgs = {
  input: MyEventsTicketRegisterAnonInput;
};


export type MutationMyEventsTicketUnregisterArgs = {
  event_id: Scalars['ID'];
};


export type MutationMyPrivacyModeSetArgs = {
  mode: Scalars['String'];
};


export type MutationRatioAddTicketArgs = {
  input: RatioAddTicketInput;
};


export type MutationRatioAddTrainingArgs = {
  params: RatioAddTrainingInput;
};


export type MutationRatioTicketFiscalizeArgs = {
  ticket_id: Scalars['ID'];
};


export type MutationRatioTrainingAddDayArgs = {
  params: RatioTrainingAddDayInput;
};


export type MutationRatioTrainingCopyScheduleFromArgs = {
  params: RatioTrainingCopyScheduleFromInput;
};


export type MutationRatioTrainingSendEmailArgs = {
  input: RatioTrainingSendEmailInput;
};


export type MutationRatioTrainingSyncParticipantsToMailchimpArgs = {
  training_id: Scalars['ID'];
};


export type MutationStaffFireMemberArgs = {
  id: Scalars['ID'];
};


export type MutationStaffGrantGooglePermissionsToMemberArgs = {
  id: Scalars['ID'];
};


export type MutationStaffUnfireMemberArgs = {
  id: Scalars['ID'];
};


export type MutationWatchmenCreateWatchmanArgs = {
  params: WatchmenCreateWatchmanInput;
};


export type MutationWatchmenSetWatchmanGradeArgs = {
  params: WatchmenSetWatchmanGradeInput;
};


export type MutationWatchmenSetWatchmanPriorityArgs = {
  params: WatchmenSetWatchmanPriorityInput;
};


export type MutationWatchmenUpdateShiftArgs = {
  params: WatchmenUpdateShiftInput;
};


export type MutationZadarmaSetMemberForPbxCallArgs = {
  member_id: Scalars['ID'];
  pbx_call_id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['Boolean']>;
  events: EventNotification;
};

export type BasicResult = {
  __typename?: 'BasicResult';
  ok?: Maybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type WagtailPage = {
  id: Scalars['ID'];
  title: Scalars['String'];
  meta: WagtailPageMeta;
};

export type WagtailPageMeta = {
  __typename?: 'WagtailPageMeta';
  slug: Scalars['String'];
  html_url: Scalars['String'];
};

export type WagtailImage = {
  __typename?: 'WagtailImage';
  id: Scalars['ID'];
  url: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type WagtailImageRendition = {
  __typename?: 'WagtailImageRendition';
  id: Scalars['ID'];
  url: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  original_image: WagtailImage;
};

export type WagtailBlock = {
  id: Scalars['ID'];
};

export type WagtailGeo = {
  __typename?: 'WagtailGeo';
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type AuthCurrentUser = {
  __typename?: 'AuthCurrentUser';
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

export type AuthPermission = {
  __typename?: 'AuthPermission';
  id: Scalars['ID'];
  name: Scalars['String'];
  users: Array<AuthUser>;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  id: Scalars['ID'];
  email: Scalars['String'];
  staff_member?: Maybe<StaffMember>;
};

export type AuthLoginInput = {
  credentials: AuthLoginCredentialsInput;
  result: Scalars['String'];
};

export type AuthLoginCredentialsInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type AuthLoginResult = {
  __typename?: 'AuthLoginResult';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<AuthCurrentUser>;
  registered?: Maybe<Scalars['Boolean']>;
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

export type AuthSetMyNamesInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type AuthSetMyNamesResult = {
  __typename?: 'AuthSetMyNamesResult';
  error?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AuthLogoutResult = {
  __typename?: 'AuthLogoutResult';
  ok?: Maybe<Scalars['Boolean']>;
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
};

export type ZadarmaData = {
  __typename?: 'ZadarmaData';
  staff_member?: Maybe<StaffMember>;
};

export type ZadarmaPbxCall = {
  __typename?: 'ZadarmaPbxCall';
  pbx_call_id: Scalars['String'];
  ts: Scalars['String'];
  data?: Maybe<ZadarmaData>;
  calls: Array<ZadarmaCall>;
};

export type ZadarmaPbxCallEdge = {
  __typename?: 'ZadarmaPbxCallEdge';
  node: ZadarmaPbxCall;
};

export type ZadarmaPbxCallConnection = {
  __typename?: 'ZadarmaPbxCallConnection';
  pageInfo: PageInfo;
  nodes: Array<ZadarmaPbxCall>;
  edges: Array<ZadarmaPbxCallEdge>;
};

export type Importer = {
  __typename?: 'Importer';
  name: Scalars['ID'];
};

export type NowInfo = {
  __typename?: 'NowInfo';
  total: Scalars['Int'];
  customers: Array<NowCustomer>;
};

export type NowCustomer = {
  __typename?: 'NowCustomer';
  card_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
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
  edges: Array<Cm2OrderEdge>;
};

export type Cm2OrderEdge = {
  __typename?: 'Cm2OrderEdge';
  node: Cm2Order;
};

export type Cm2CreateCustomerInput = {
  card_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type Cm2CreateOrderInput = {
  customer?: Maybe<Scalars['ID']>;
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
  watchman?: Maybe<WatchmenWatchman>;
  is_night: Scalars['Boolean'];
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
  member: StaffMember;
  grade?: Maybe<WatchmenGrade>;
  priority: Scalars['Int'];
};

export type CashierPayment = {
  __typename?: 'CashierPayment';
  id: Scalars['ID'];
  whom: AuthUser;
  amount: Scalars['Int'];
  created_dt: Scalars['String'];
  redeem_dt?: Maybe<Scalars['String']>;
  comment: Scalars['String'];
  is_redeemed: Scalars['Boolean'];
};

export type CashierPaymentEdge = {
  __typename?: 'CashierPaymentEdge';
  node: CashierPayment;
};

export type CashierPaymentConnection = {
  __typename?: 'CashierPaymentConnection';
  pageInfo: PageInfo;
  nodes: Array<CashierPayment>;
  edges: Array<CashierPaymentEdge>;
};

export type CashierCreatePaymentInput = {
  amount: Scalars['Int'];
  whom: Scalars['ID'];
  comment: Scalars['String'];
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

export type AnalyticsBovStat = {
  __typename?: 'AnalyticsBovStat';
  date: Scalars['String'];
  count: Scalars['Int'];
  total_income: Scalars['Int'];
};

export type EventsFilterInput = {
  event_type?: Maybe<Scalars['String']>;
};

export type EventsEventConnection = {
  __typename?: 'EventsEventConnection';
  pageInfo: PageInfo;
  edges: Array<EventsEventEdge>;
  nodes: Array<EventsEvent>;
};

export type EventsEventEdge = {
  __typename?: 'EventsEventEdge';
  node: EventsEvent;
};

export type EventsEvent = {
  __typename?: 'EventsEvent';
  id: Scalars['ID'];
  event_id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  summary: Scalars['String'];
  timing_description_override: Scalars['String'];
  location: Scalars['String'];
  room: Scalars['String'];
  zoom_link: Scalars['String'];
  zoom_meeting?: Maybe<ZoomMeeting>;
  start: Scalars['String'];
  end: Scalars['String'];
  created: Scalars['String'];
  updated: Scalars['String'];
  published: Scalars['Boolean'];
  creator?: Maybe<Scalars['String']>;
  event_type: Scalars['String'];
  pricing_type: Scalars['String'];
  registration_type: Scalars['String'];
  realm: Scalars['String'];
  visitors?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  image?: Maybe<WagtailImageRendition>;
  prototype?: Maybe<EventsPrototype>;
  project?: Maybe<ProjectPage>;
  announcements: EventsAnnouncements;
  tickets: Array<EventsTicket>;
  feedbacks: Array<EventsFeedback>;
};


export type EventsEventImageArgs = {
  spec: Scalars['String'];
};

export type EventsAnnouncements = {
  __typename?: 'EventsAnnouncements';
  timepad: EventsAnnouncementTimepad;
  vk: EventsAnnouncementVk;
  fb: EventsAnnouncementFb;
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

export type EventsAnnouncementFb = {
  __typename?: 'EventsAnnouncementFb';
  link: Scalars['String'];
  group: Scalars['String'];
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

export type EventsTicket = {
  __typename?: 'EventsTicket';
  id: Scalars['ID'];
  status: Scalars['String'];
  user: AuthUser;
};

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
  instances: Array<EventsEvent>;
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

export type VkGroup = {
  __typename?: 'VkGroup';
  name: Scalars['String'];
};

export type TimepadCategory = {
  __typename?: 'TimepadCategory';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type EventsPublicEventConnection = {
  __typename?: 'EventsPublicEventConnection';
  pageInfo: PageInfo;
  edges: Array<EventsPublicEventEdge>;
  nodes: Array<EventsPublicEvent>;
};

export type EventsPublicEventEdge = {
  __typename?: 'EventsPublicEventEdge';
  node: EventsPublicEvent;
};

export type EventsPublicEvent = {
  __typename?: 'EventsPublicEvent';
  event_id: Scalars['ID'];
  start: Scalars['String'];
  end: Scalars['String'];
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  image_rendition?: Maybe<WagtailImageRendition>;
  registration_type: Scalars['String'];
  pricing_type: Scalars['String'];
  realm: Scalars['String'];
  project?: Maybe<ProjectPage>;
  public_tags: Array<Scalars['String']>;
  announcements: EventsAnnouncements;
  my_ticket?: Maybe<MyEventsTicket>;
};


export type EventsPublicEventImage_RenditionArgs = {
  spec: Scalars['String'];
};

export type MyEventsTicket = {
  __typename?: 'MyEventsTicket';
  event: EventsPublicEvent;
  status: Scalars['String'];
  created?: Maybe<Scalars['String']>;
  zoom_link?: Maybe<Scalars['String']>;
};

export type MyEventsTicketEdge = {
  __typename?: 'MyEventsTicketEdge';
  node: MyEventsTicket;
};

export type MyEventsTicketConnection = {
  __typename?: 'MyEventsTicketConnection';
  pageInfo: PageInfo;
  edges: Array<MyEventsTicketEdge>;
  nodes: Array<MyEventsTicket>;
};

export type MyEventsTicketRegisterAnonInput = {
  event_id: Scalars['ID'];
  email: Scalars['String'];
  subscribed_to_newsletter?: Maybe<Scalars['Boolean']>;
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
  event: EventsEvent;
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
  event: EventsEvent;
};

export type EventDeleteInput = {
  event_id: Scalars['ID'];
};

export type EventSetEventTypeInput = {
  event_id: Scalars['ID'];
  event_type: Scalars['String'];
};

export type EventSetRealmInput = {
  event_id: Scalars['ID'];
  realm: Scalars['String'];
};

export type EventSetPricingTypeInput = {
  event_id: Scalars['ID'];
  pricing_type: Scalars['String'];
};

export type EventSetZoomLinkInput = {
  event_id: Scalars['ID'];
  zoom_link: Scalars['String'];
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

export type EventPrototypeCreateResult = {
  __typename?: 'EventPrototypeCreateResult';
  ok?: Maybe<Scalars['Boolean']>;
  prototype: EventsPrototype;
};

export type EventPrototypeUpdateInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timing_description_override?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
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
  ok?: Maybe<Scalars['Boolean']>;
  prototype: EventsPrototype;
};

export type EventPrototypeCancelDateInput = {
  id: Scalars['ID'];
  date: Scalars['String'];
};

export type EventPrototypeCancelDateResult = {
  __typename?: 'EventPrototypeCancelDateResult';
  ok?: Maybe<Scalars['Boolean']>;
};

export type EventPrototypeNewEventInput = {
  id: Scalars['ID'];
  ts: Scalars['Int'];
};

export type EventPrototypeNewEventResult = {
  __typename?: 'EventPrototypeNewEventResult';
  ok?: Maybe<Scalars['Boolean']>;
};

export type EventPrototypeAddTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventPrototypeAddTagResult = {
  __typename?: 'EventPrototypeAddTagResult';
  ok?: Maybe<Scalars['Boolean']>;
  prototype: EventsPrototype;
};

export type EventPrototypeDeleteTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventPrototypeDeleteTagResult = {
  __typename?: 'EventPrototypeDeleteTagResult';
  ok?: Maybe<Scalars['Boolean']>;
  prototype: EventsPrototype;
};

export type EventPrototypeSetImageInput = {
  id: Scalars['ID'];
  image_id: Scalars['ID'];
};

export type EventPrototypeSetImageResult = {
  __typename?: 'EventPrototypeSetImageResult';
  ok?: Maybe<Scalars['Boolean']>;
  prototype: EventsPrototype;
};

export type EventGenerateZoomLinkInput = {
  event_id: Scalars['ID'];
};

export type EventAddTagInput = {
  event_id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventDeleteTagInput = {
  event_id: Scalars['ID'];
  tag: Scalars['String'];
};

export type EventSetImageFromUrlInput = {
  event_id: Scalars['ID'];
  url: Scalars['String'];
};

export type EventVkAnnouncementSetImageInput = {
  event_id: Scalars['ID'];
  image_id: Scalars['ID'];
};

export enum EventAnnounceTarget {
  Vk = 'VK',
  Fb = 'FB',
  Timepad = 'TIMEPAD'
}

export type EventAnnounceInput = {
  event_id: Scalars['ID'];
  target: EventAnnounceTarget;
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

export type EventVkAnnouncementUpdateInput = {
  event_id: Scalars['ID'];
  group?: Maybe<Scalars['String']>;
};

export type EventMoveInput = {
  event_id: Scalars['ID'];
  start: Scalars['String'];
};

export type EventsWeeklyDigest = {
  __typename?: 'EventsWeeklyDigest';
  id: Scalars['ID'];
  start?: Maybe<Scalars['String']>;
  image: WagtailImageRendition;
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

export type EventsWeeklyDigestTelegram = {
  __typename?: 'EventsWeeklyDigestTelegram';
  link?: Maybe<Scalars['String']>;
};

export type EventsWeeklyDigestVk = {
  __typename?: 'EventsWeeklyDigestVk';
  link?: Maybe<Scalars['String']>;
};

export type EventsWeeklyDigestUpdateResult = {
  __typename?: 'EventsWeeklyDigestUpdateResult';
  ok?: Maybe<Scalars['Boolean']>;
  digest: EventsWeeklyDigest;
};

export type EventsWeeklyDigestPostMailchimpInput = {
  text?: Maybe<Scalars['String']>;
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

export type EventNotification = {
  __typename?: 'EventNotification';
  type: Scalars['String'];
  id: Scalars['ID'];
};

export type EventsGoogleCalendar = {
  __typename?: 'EventsGoogleCalendar';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type EventGenerateOpenViduTokenInput = {
  event_id: Scalars['ID'];
};

export type EventGenerateOpenViduTokenResult = {
  __typename?: 'EventGenerateOpenViduTokenResult';
  token: Scalars['String'];
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

export type RatioActivity = {
  __typename?: 'RatioActivity';
  id: Scalars['ID'];
  time: Scalars['String'];
  activity_type: Scalars['String'];
  name: Scalars['String'];
  location: Scalars['String'];
  trainer?: Maybe<RatioTrainer>;
};

export type RatioTicket = {
  __typename?: 'RatioTicket';
  id: Scalars['ID'];
  training: RatioTraining;
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  registration_date?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  ticket_type: Scalars['String'];
  payment_type: Scalars['String'];
  payment_amount: Scalars['Int'];
  fiscalization_status: Scalars['String'];
  comment: Scalars['String'];
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
  telegram_link?: Maybe<Scalars['String']>;
  salaries_paid: Scalars['Boolean'];
  tickets: Array<RatioTicket>;
  total_income: Scalars['Int'];
  tickets_count: Scalars['Int'];
  long_name: Scalars['String'];
  schedule: Array<RatioTrainingDay>;
};

export type RatioTrainingEdge = {
  __typename?: 'RatioTrainingEdge';
  node: RatioTraining;
};

export type RatioTrainingConnection = {
  __typename?: 'RatioTrainingConnection';
  pageInfo: PageInfo;
  edges: Array<RatioTrainingEdge>;
  nodes: Array<RatioTraining>;
};

export type RatioTrainingDay = {
  __typename?: 'RatioTrainingDay';
  id: Scalars['ID'];
  date: Scalars['String'];
  activities: Array<RatioActivity>;
};

export type RatioTrainingAddDayInput = {
  training_slug: Scalars['String'];
  date: Scalars['String'];
};

export type RatioTrainingCopyScheduleFromInput = {
  from_training_slug: Scalars['String'];
  to_training_slug: Scalars['String'];
};

export type RatioAddTicketInput = {
  training: Scalars['ID'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  payment_amount: Scalars['Int'];
  status: Scalars['String'];
  fiscalization_status: Scalars['String'];
  ticket_type: Scalars['String'];
  payment_type: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RatioAddTrainingInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  date: Scalars['String'];
  telegram_link: Scalars['String'];
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

export type RatioSectionIndexPage = WagtailPage & {
  __typename?: 'RatioSectionIndexPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
};

export type RatioSectionPage = WagtailPage & {
  __typename?: 'RatioSectionPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  body: Array<WagtailBlock>;
};

export type RatioNotebookIndexPage = WagtailPage & {
  __typename?: 'RatioNotebookIndexPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
};

export type RatioNotebookPage = WagtailPage & {
  __typename?: 'RatioNotebookPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  sections: Array<RatioNotebookSectionBlock>;
};

export type RatioNotebookSectionBlock = WagtailBlock & {
  __typename?: 'RatioNotebookSectionBlock';
  id: Scalars['ID'];
  value: RatioSectionPage;
};

export type RatioHeaderBlock = WagtailBlock & {
  __typename?: 'RatioHeaderBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioParagraphBlock = WagtailBlock & {
  __typename?: 'RatioParagraphBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioInsetBlock = WagtailBlock & {
  __typename?: 'RatioInsetBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
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
  enumerate?: Maybe<Scalars['Boolean']>;
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

export type RatioBriefingBlock = WagtailBlock & {
  __typename?: 'RatioBriefingBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioMathBlock = WagtailBlock & {
  __typename?: 'RatioMathBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type RatioPresentationIndexPage = WagtailPage & {
  __typename?: 'RatioPresentationIndexPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  presentations: Array<RatioPresentationPage>;
};

export type RatioPresentationPage = WagtailPage & {
  __typename?: 'RatioPresentationPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  source: Scalars['String'];
};

export type MastermindDatingCohort = {
  __typename?: 'MastermindDatingCohort';
  id: Scalars['ID'];
  leader_telegram_uid?: Maybe<Scalars['String']>;
  event?: Maybe<EventsEvent>;
  participants: Array<MastermindDatingParticipant>;
  groups: Array<MastermindDatingGroup>;
};

export type MastermindDatingParticipant = {
  __typename?: 'MastermindDatingParticipant';
  id: Scalars['ID'];
  cohort: MastermindDatingCohort;
  user: AuthUser;
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  voted_for: Scalars['Boolean'];
  present: Scalars['Boolean'];
  invite_email_sent: Scalars['Boolean'];
};

export type MastermindDatingGroup = {
  __typename?: 'MastermindDatingGroup';
  id: Scalars['ID'];
  telegram_invite_link: Scalars['String'];
  participants: Array<MastermindDatingParticipant>;
};

export type MastermindDatingTrivialMutationResult = {
  __typename?: 'MastermindDatingTrivialMutationResult';
  ok?: Maybe<Scalars['Boolean']>;
};

export type MastermindDatingCohortMutationResult = {
  __typename?: 'MastermindDatingCohortMutationResult';
  cohort: MastermindDatingCohort;
};

export type MastermindDatingParticipantMutationResult = {
  __typename?: 'MastermindDatingParticipantMutationResult';
  participant: MastermindDatingParticipant;
};

export type ProjectIndexPage = WagtailPage & {
  __typename?: 'ProjectIndexPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  projects: Array<ProjectPage>;
};

export type ProjectPage = WagtailPage & {
  __typename?: 'ProjectPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  summary: Scalars['String'];
  activity_summary?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  is_active: Scalars['Boolean'];
  upcoming_events: Array<EventsPublicEvent>;
  image: WagtailImageRendition;
};


export type ProjectPageImageArgs = {
  spec: Scalars['String'];
};

export type FreeFormPage = WagtailPage & {
  __typename?: 'FreeFormPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  body: Array<WagtailBlock>;
};

export type GreyBlock = WagtailBlock & {
  __typename?: 'GreyBlock';
  id: Scalars['ID'];
  value: GreyBlockValue;
};

export type GreyBlockValue = {
  __typename?: 'GreyBlockValue';
  header: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type BasicLeadBlock = WagtailBlock & {
  __typename?: 'BasicLeadBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type BasicParagraphBlock = WagtailBlock & {
  __typename?: 'BasicParagraphBlock';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type ColumnsBasicBlock = WagtailBlock & {
  __typename?: 'ColumnsBasicBlock';
  id: Scalars['ID'];
  value: Array<ColumnsBasicBlockColumn>;
};

export type ColumnsBasicBlockColumn = {
  __typename?: 'ColumnsBasicBlockColumn';
  header: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type ColumnsMembershipsBlock = WagtailBlock & {
  __typename?: 'ColumnsMembershipsBlock';
  id: Scalars['ID'];
  value: Array<ColumnsMembershipsBlockColumn>;
};

export type ColumnsMembershipsBlockColumn = {
  __typename?: 'ColumnsMembershipsBlockColumn';
  title: Scalars['String'];
  subtitle: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
};

export type ColumnsButtonsBlock = WagtailBlock & {
  __typename?: 'ColumnsButtonsBlock';
  id: Scalars['ID'];
  value: Array<ColumnsButtonsBlockColumn>;
};

export type ColumnsButtonsBlockColumn = {
  __typename?: 'ColumnsButtonsBlockColumn';
  title: Scalars['String'];
  caption: Scalars['String'];
  link: Scalars['String'];
};

export type EventsListBlock = WagtailBlock & {
  __typename?: 'EventsListBlock';
  id: Scalars['ID'];
  events: Array<EventsPublicEvent>;
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

export type PhotoRibbonBlock = WagtailBlock & {
  __typename?: 'PhotoRibbonBlock';
  id: Scalars['ID'];
  value: Array<WagtailImageRendition>;
};


export type PhotoRibbonBlockValueArgs = {
  spec: Scalars['String'];
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

export type HeroFrontBlock = WagtailBlock & {
  __typename?: 'HeroFrontBlock';
  id: Scalars['ID'];
  value: HeroFrontBlockValue;
};

export type HeroFrontBlockValue = {
  __typename?: 'HeroFrontBlockValue';
  title: Scalars['String'];
  features: Array<HeroFrontBlockFeature>;
};

export type HeroFrontBlockFeature = {
  __typename?: 'HeroFrontBlockFeature';
  title: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  items: Array<HeroFrontBlockItem>;
};

export type HeroFrontBlockItem = {
  __typename?: 'HeroFrontBlockItem';
  text: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};

export type FolderPage = WagtailPage & {
  __typename?: 'FolderPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
};

export type BlogPostPage = WagtailPage & {
  __typename?: 'BlogPostPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  date: Scalars['String'];
  authors: Array<BlogPostAuthor>;
  body: Scalars['String'];
  summary: Scalars['String'];
};

export type BlogIndexPage = WagtailPage & {
  __typename?: 'BlogIndexPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
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

export type EmailMailchimpCategory = {
  __typename?: 'EmailMailchimpCategory';
  id: Scalars['ID'];
  title: Scalars['String'];
  category_id: Scalars['String'];
  interests: Array<EmailMailchimpInterest>;
};

export type EmailSubscribeChannel = {
  __typename?: 'EmailSubscribeChannel';
  id: Scalars['ID'];
  slug: Scalars['String'];
  interests: Array<EmailMailchimpInterest>;
};

export type EmailMailchimpInterest = {
  __typename?: 'EmailMailchimpInterest';
  id: Scalars['ID'];
  interest_id: Scalars['String'];
  name: Scalars['String'];
  subscriber_count: Scalars['Int'];
};

export type EmailSubscribeChannelCreateInput = {
  slug: Scalars['String'];
  interest_ids: Array<Scalars['ID']>;
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

export type SlackUser = {
  __typename?: 'SlackUser';
  slack_id: Scalars['String'];
  image_url: Scalars['String'];
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

export type FaqPage = WagtailPage & {
  __typename?: 'FaqPage';
  id: Scalars['ID'];
  meta: WagtailPageMeta;
  title: Scalars['String'];
  summary: Scalars['String'];
  prev_page?: Maybe<FaqPage>;
  next_page?: Maybe<FaqPage>;
  entries: Array<FaqEntry>;
  subpages: Array<FaqPage>;
};

export type FaqEntry = {
  __typename?: 'FaqEntry';
  id: Scalars['ID'];
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type TildaPage = {
  __typename?: 'TildaPage';
  path: Scalars['String'];
  html_url: Scalars['String'];
  body: Scalars['String'];
  title: Scalars['String'];
  show_header_and_footer: Scalars['Boolean'];
  assets: Array<TildaAsset>;
  css: Array<TildaAsset>;
  js: Array<TildaAsset>;
};

export type TildaAsset = {
  __typename?: 'TildaAsset';
  url: Scalars['String'];
  kind: Scalars['String'];
};

export type ZoomMeeting = {
  __typename?: 'ZoomMeeting';
  id: Scalars['ID'];
  zoom_id: Scalars['String'];
  join_url: Scalars['String'];
  participants_count?: Maybe<Scalars['Int']>;
  instances: Array<ZoomMeetingInstance>;
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

export type OpenviduGenerateRoomTokenResult = {
  __typename?: 'OpenviduGenerateRoomTokenResult';
  token: Scalars['String'];
};
