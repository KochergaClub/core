
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
    "WagtailBlock": [
      "BasicLeadBlock",
      "BasicParagraphBlock",
      "BigContactsBlock",
      "ColumnsBasicBlock",
      "ColumnsButtonsBlock",
      "ColumnsMembershipsBlock",
      "EventsListBlock",
      "GreyBlock",
      "HeroFrontBlock",
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
      "SlidesTextBlock",
      "SlidesTitleBlock"
    ],
    "WagtailPage": [
      "BlogIndexPage",
      "BlogPostPage",
      "FaqPage",
      "FolderPage",
      "FreeFormPage",
      "ProjectIndexPage",
      "ProjectPage",
      "RatioNotebookIndexPage",
      "RatioNotebookPage",
      "RatioPresentationIndexPage",
      "RatioPresentationPage",
      "RatioSectionIndexPage",
      "RatioSectionPage"
    ]
  }
};
      export default result;
    