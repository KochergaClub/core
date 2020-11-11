
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "CancelYandexKassaPaymentResult": [
      "YandexKassaPayment",
      "GenericError"
    ],
    "CreateRatioPromocodeResult": [
      "RatioPromocode",
      "ValidationError",
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
    "RatioCreateOrderResult": [
      "RatioOrder",
      "ValidationError",
      "GenericError"
    ],
    "SearchItem": [
      "PageSearchItem",
      "EventSearchItem"
    ],
    "SendUniqueRatioPromocodeResult": [
      "BasicResult",
      "GenericError"
    ],
    "SlideFragmentsBlockValues": [
      "SlideFragmentsBlock_RichTextBlock",
      "SlideFragmentsBlock_RawHtmlBlock"
    ],
    "UpdateYandexKassaPaymentResult": [
      "YandexKassaPayment",
      "GenericError"
    ],
    "WagtailBlock": [
      "BasicCardBlock",
      "BasicLeadBlock",
      "BasicTextBlock",
      "BigContactsBlock",
      "ColumnsBasicBlock",
      "ColumnsButtonsBlock",
      "EventsListBlock",
      "FrontPartnersBlock",
      "FrontSocialLinksBlock",
      "GreyBlock",
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
    ]
  }
};
      export default result;
    