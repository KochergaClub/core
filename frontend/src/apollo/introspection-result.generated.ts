
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "ExternalService": [
      "SlackExternalService",
      "WikiExternalService"
    ],
    "ExternalServiceAccount": [
      "SlackAccount",
      "WikiAccount"
    ],
    "SearchItem": [
      "PageSearchItem",
      "EventSearchItem"
    ],
    "SlideFragmentsBlockValues": [
      "SlideFragmentsBlock_RichTextBlock",
      "SlideFragmentsBlock_RawHtmlBlock"
    ],
    "WagtailBlock": [
      "BasicLeadBlock",
      "BasicParagraphBlock",
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
    ]
  }
};
      export default result;
    