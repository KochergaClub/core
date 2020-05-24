
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "WagtailPage",
        "possibleTypes": [
          {
            "name": "ProjectPage"
          },
          {
            "name": "RatioSectionIndexPage"
          },
          {
            "name": "RatioSectionPage"
          },
          {
            "name": "RatioNotebookIndexPage"
          },
          {
            "name": "RatioNotebookPage"
          },
          {
            "name": "RatioPresentationIndexPage"
          },
          {
            "name": "RatioPresentationPage"
          },
          {
            "name": "ProjectIndexPage"
          },
          {
            "name": "FreeFormPage"
          },
          {
            "name": "BlogPostPage"
          },
          {
            "name": "BlogIndexPage"
          },
          {
            "name": "FaqPage"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "WagtailBlock",
        "possibleTypes": [
          {
            "name": "RatioNotebookSectionBlock"
          },
          {
            "name": "RatioHeaderBlock"
          },
          {
            "name": "RatioParagraphBlock"
          },
          {
            "name": "RatioInsetBlock"
          },
          {
            "name": "RatioExerciseBlock"
          },
          {
            "name": "RatioExerciseOnelineBlock"
          },
          {
            "name": "RatioBriefingBlock"
          },
          {
            "name": "RatioMathBlock"
          },
          {
            "name": "GreyBlock"
          },
          {
            "name": "BasicLeadBlock"
          },
          {
            "name": "BasicParagraphBlock"
          },
          {
            "name": "ColumnsBasicBlock"
          },
          {
            "name": "ColumnsMembershipsBlock"
          },
          {
            "name": "ColumnsButtonsBlock"
          },
          {
            "name": "EventsListBlock"
          },
          {
            "name": "BigContactsBlock"
          },
          {
            "name": "PhotoRibbonBlock"
          },
          {
            "name": "MailchimpSubscribeBlock"
          },
          {
            "name": "HeroFrontBlock"
          }
        ]
      }
    ]
  }
};
      export default result;
    