
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "WagtailBlockStructure": [
      "WagtailStructBlockStructure",
      "WagtailListBlockStructure",
      "WagtailCharBlockStructure",
      "WagtailRichTextBlockStructure",
      "WagtailBooleanBlockStructure",
      "WagtailStaticBlockStructure",
      "WagtailImageBlockStructure",
      "WagtailURLBlockStructure"
    ],
    "WagtailBlockValidationError": [
      "WagtailStructBlockValidationError",
      "WagtailListBlockValidationError",
      "WagtailAnyBlockValidationError"
    ],
    "WagtailPage": [
      "RatioPresentationIndexPage",
      "RatioSectionPage",
      "RatioSectionIndexPage",
      "RatioNotebookPage",
      "RatioNotebookIndexPage",
      "ProjectPage",
      "ProjectIndexPage",
      "FreeFormPage",
      "FolderPage",
      "BlogPostPage",
      "BlogIndexPage",
      "FaqPage",
      "PresentationPage"
    ],
    "WagtailBlock": [
      "RatioNotebookSectionBlock",
      "RatioHeaderBlock",
      "RatioParagraphBlock",
      "RatioInsetBlock",
      "RatioExerciseBlock",
      "RatioExerciseOnelineBlock",
      "RatioBriefingBlock",
      "RatioMathBlock",
      "BasicTextBlock",
      "BasicCardBlock",
      "SectionHeaderBlock",
      "ColumnsBasicBlock",
      "ColumnsButtonsBlock",
      "BigContactsBlock",
      "MailchimpSubscribeBlock",
      "HeroFrontBlock",
      "LandingHeroBlock",
      "LandingTextBlock",
      "FrontPartnersBlock",
      "EventsListBlock",
      "PhotoRibbonBlock",
      "HrBlock",
      "FrontSocialLinksBlock",
      "SlideTitleBlock",
      "SlideRichTextBlock",
      "SlideRawHtmlBlock",
      "SlideFragmentsBlock",
      "SlideFragmentsBlock_RichTextBlock",
      "SlideFragmentsBlock_RawHtmlBlock"
    ],
    "ExternalServiceAccount": [
      "WikiAccount",
      "SlackAccount"
    ],
    "ExternalService": [
      "WikiExternalService",
      "SlackExternalService"
    ],
    "SlideFragmentsBlockValues": [
      "SlideFragmentsBlock_RichTextBlock",
      "SlideFragmentsBlock_RawHtmlBlock"
    ],
    "WagtailPageOrPrivateResult": [
      "WagtailPageContainer",
      "WagtailPagePrivate"
    ],
    "SearchItem": [
      "PageSearchItem",
      "EventSearchItem"
    ],
    "WagtailPagePermission": [
      "WagtailRootPagePermission",
      "WagtailSpecificPagePermission"
    ],
    "Commentable": [
      "CommunityLead",
      "CommunityInitiative"
    ],
    "SetMyPasswordResult": [
      "SetMyPasswordOkResult",
      "GenericError",
      "ValidationError"
    ],
    "AuthSetMyNamesResult": [
      "AuthCurrentUser",
      "GenericError",
      "ValidationError"
    ],
    "WatchmenUpdateShiftResult": [
      "WatchmenShift",
      "ValidationError",
      "GenericError"
    ],
    "KkmRegisterCheckResult": [
      "KkmRegisterCheckOkResult",
      "GenericError"
    ],
    "UpdateYandexKassaPaymentResult": [
      "YandexKassaPayment",
      "GenericError"
    ],
    "CancelYandexKassaPaymentResult": [
      "YandexKassaPayment",
      "GenericError"
    ],
    "CancelEventResult": [
      "BasicResult",
      "GenericError",
      "ValidationError"
    ],
    "AddYoutubeVideoResult": [
      "Event",
      "GenericError",
      "ValidationError"
    ],
    "DeleteYoutubeVideoResult": [
      "BasicResult"
    ],
    "CancelWeeklyDigestMailchimpResult": [
      "GenericError",
      "EventsWeeklyDigest"
    ],
    "SendWeeklyDigestMailchimpResult": [
      "GenericError",
      "EventsWeeklyDigest"
    ],
    "RatioCreateOrderResult": [
      "RatioOrder",
      "ValidationError",
      "GenericError"
    ],
    "CreateRatioTrainingResult": [
      "RatioTraining",
      "ValidationError",
      "GenericError"
    ],
    "UpdateRatioTrainingResult": [
      "RatioTraining",
      "ValidationError",
      "GenericError"
    ],
    "CreateRatioPromocodeResult": [
      "RatioPromocode",
      "ValidationError",
      "GenericError"
    ],
    "SendUniqueRatioPromocodeResult": [
      "BasicResult",
      "GenericError"
    ],
    "AddTelegramChatResult": [
      "TelegramChat",
      "ValidationError",
      "GenericError"
    ],
    "AddTelegramChatByInviteLinkResult": [
      "TelegramChat",
      "ValidationError",
      "GenericError"
    ],
    "DeleteTelegramChatResult": [
      "BasicResult"
    ],
    "UpdateTelegramChatResult": [
      "TelegramChat",
      "ValidationError"
    ],
    "RefreshTelegramChatDataResult": [
      "TelegramChat"
    ],
    "PostToTelegramChatResult": [
      "BasicResult"
    ],
    "ImportTildaPageResult": [
      "TildaPage",
      "GenericError"
    ],
    "CreateCommunityLeadResult": [
      "CommunityLead",
      "ValidationError",
      "GenericError"
    ],
    "UpdateCommunityLeadResult": [
      "CommunityLead",
      "ValidationError",
      "GenericError"
    ],
    "DeleteCommunityLeadResult": [
      "BasicResult"
    ],
    "BecomeCommunityLeadCuratorResult": [
      "CommunityLead"
    ],
    "ClearCommunityLeadCuratorResult": [
      "CommunityLead"
    ],
    "AddEventToCommunityLeadResult": [
      "CommunityLead"
    ],
    "RemoveEventFromCommunityLeadResult": [
      "CommunityLead"
    ],
    "CommentOnCommunityLeadResult": [
      "CommunityLead"
    ],
    "CreateCommunityInitiativeResult": [
      "CommunityInitiative",
      "ValidationError",
      "GenericError"
    ],
    "UpdateCommunityInitiativeResult": [
      "CommunityInitiative",
      "ValidationError",
      "GenericError"
    ],
    "DeleteCommunityInitiativeResult": [
      "BasicResult"
    ],
    "AddLeadToCommunityInitiativeResult": [
      "CommunityInitiative",
      "GenericError",
      "ValidationError"
    ],
    "RemoveLeadFromCommunityInitiativeResult": [
      "CommunityInitiative",
      "GenericError",
      "ValidationError"
    ],
    "CommentOnCommunityInitiativeResult": [
      "CommunityInitiative"
    ],
    "EditCommentResult": [
      "Comment",
      "GenericError"
    ],
    "DeleteCommentResult": [
      "BasicResult",
      "GenericError"
    ]
  }
};
      export default result;
    