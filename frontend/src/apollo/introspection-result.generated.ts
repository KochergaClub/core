
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AddEventToCommunityLeadResult": [
      "CommunityLead"
    ],
    "AddLeadToCommunityInitiativeResult": [
      "CommunityInitiative",
      "GenericError",
      "ValidationError"
    ],
    "AddTelegramChatByInviteLinkResult": [
      "TelegramChat",
      "ValidationError",
      "GenericError"
    ],
    "AddTelegramChatResult": [
      "TelegramChat",
      "ValidationError",
      "GenericError"
    ],
    "AuthSetMyNamesResult": [
      "AuthCurrentUser",
      "GenericError",
      "ValidationError"
    ],
    "BecomeCommunityLeadCuratorResult": [
      "CommunityLead"
    ],
    "CancelEventResult": [
      "BasicResult",
      "GenericError",
      "ValidationError"
    ],
    "CancelWeeklyDigestMailchimpResult": [
      "GenericError",
      "EventsWeeklyDigest"
    ],
    "CancelYandexKassaPaymentResult": [
      "YandexKassaPayment",
      "GenericError"
    ],
    "ClearCommunityLeadCuratorResult": [
      "CommunityLead"
    ],
    "CommentOnCommunityInitiativeResult": [
      "CommunityInitiative"
    ],
    "CommentOnCommunityLeadResult": [
      "CommunityLead"
    ],
    "Commentable": [
      "CommunityInitiative",
      "CommunityLead"
    ],
    "CreateCommunityInitiativeResult": [
      "CommunityInitiative",
      "ValidationError",
      "GenericError"
    ],
    "CreateCommunityLeadResult": [
      "CommunityLead",
      "ValidationError",
      "GenericError"
    ],
    "CreateRatioPromocodeResult": [
      "RatioPromocode",
      "ValidationError",
      "GenericError"
    ],
    "CreateRatioTrainingResult": [
      "RatioTraining",
      "ValidationError",
      "GenericError"
    ],
    "DeleteCommentResult": [
      "BasicResult",
      "GenericError"
    ],
    "DeleteCommunityInitiativeResult": [
      "BasicResult"
    ],
    "DeleteCommunityLeadResult": [
      "BasicResult"
    ],
    "DeleteTelegramChatResult": [
      "BasicResult"
    ],
    "EditCommentResult": [
      "Comment",
      "GenericError"
    ],
    "ExternalService": [
      "SlackExternalService",
      "WikiExternalService"
    ],
    "ExternalServiceAccount": [
      "SlackAccount",
      "WikiAccount"
    ],
    "ImportTildaPageResult": [
      "TildaPage",
      "GenericError"
    ],
    "KkmRegisterCheckResult": [
      "KkmRegisterCheckOkResult",
      "GenericError"
    ],
    "PostToTelegramChatResult": [
      "BasicResult"
    ],
    "RatioCreateOrderResult": [
      "RatioOrder",
      "ValidationError",
      "GenericError"
    ],
    "RefreshTelegramChatDataResult": [
      "TelegramChat"
    ],
    "RemoveEventFromCommunityLeadResult": [
      "CommunityLead"
    ],
    "RemoveLeadFromCommunityInitiativeResult": [
      "CommunityInitiative",
      "GenericError",
      "ValidationError"
    ],
    "SearchItem": [
      "PageSearchItem",
      "EventSearchItem"
    ],
    "SendUniqueRatioPromocodeResult": [
      "BasicResult",
      "GenericError"
    ],
    "SendWeeklyDigestMailchimpResult": [
      "GenericError",
      "EventsWeeklyDigest"
    ],
    "SetMyPasswordResult": [
      "SetMyPasswordOkResult",
      "GenericError",
      "ValidationError"
    ],
    "SlideFragmentsBlockValues": [
      "SlideFragmentsBlock_RichTextBlock",
      "SlideFragmentsBlock_RawHtmlBlock"
    ],
    "UpdateCommunityLeadResult": [
      "CommunityLead",
      "ValidationError",
      "GenericError"
    ],
    "UpdateRatioTrainingResult": [
      "RatioTraining",
      "ValidationError",
      "GenericError"
    ],
    "UpdateTelegramChatResult": [
      "TelegramChat",
      "ValidationError"
    ],
    "UpdateYandexKassaPaymentResult": [
      "YandexKassaPayment",
      "GenericError"
    ],
    "WagtailBlock": [
      "BasicCardBlock",
      "BasicTextBlock",
      "BigContactsBlock",
      "ColumnsBasicBlock",
      "ColumnsButtonsBlock",
      "EventsListBlock",
      "FrontPartnersBlock",
      "FrontSocialLinksBlock",
      "HeroFrontBlock",
      "HrBlock",
      "MailchimpSubscribeBlock",
      "PhotoRibbonBlock",
      "RatioBriefingBlock",
      "RatioExerciseBlock",
      "RatioExerciseOnelineBlock",
      "RatioHeaderBlock",
      "RatioInsetBlock",
      "RatioMathBlock",
      "RatioNotebookSectionBlock",
      "RatioParagraphBlock",
      "SectionHeaderBlock",
      "SlideFragmentsBlock",
      "SlideFragmentsBlock_RawHtmlBlock",
      "SlideFragmentsBlock_RichTextBlock",
      "SlideRawHtmlBlock",
      "SlideRichTextBlock",
      "SlideTitleBlock"
    ],
    "WagtailBlockStructure": [
      "WagtailBooleanBlockStructure",
      "WagtailCharBlockStructure",
      "WagtailImageBlockStructure",
      "WagtailListBlockStructure",
      "WagtailRichTextBlockStructure",
      "WagtailStaticBlockStructure",
      "WagtailStructBlockStructure",
      "WagtailURLBlockStructure"
    ],
    "WagtailBlockValidationError": [
      "WagtailAnyBlockValidationError",
      "WagtailListBlockValidationError",
      "WagtailStructBlockValidationError"
    ],
    "WagtailPage": [
      "BlogIndexPage",
      "BlogPostPage",
      "FaqPage",
      "FolderPage",
      "FreeFormPage",
      "PresentationPage",
      "ProjectIndexPage",
      "ProjectPage",
      "RatioNotebookIndexPage",
      "RatioNotebookPage",
      "RatioPresentationIndexPage",
      "RatioSectionIndexPage",
      "RatioSectionPage"
    ],
    "WagtailPageOrPrivateResult": [
      "WagtailPageContainer",
      "WagtailPagePrivate"
    ],
    "WagtailPagePermission": [
      "WagtailRootPagePermission",
      "WagtailSpecificPagePermission"
    ],
    "WatchmenUpdateShiftResult": [
      "WatchmenShift",
      "ValidationError",
      "GenericError"
    ]
  }
};
      export default result;
    