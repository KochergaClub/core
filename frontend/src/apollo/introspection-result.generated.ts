
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
        "name": "ExternalService",
        "possibleTypes": [
          {
            "name": "SlackExternalService"
          },
          {
            "name": "WikiExternalService"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ExternalServiceAccount",
        "possibleTypes": [
          {
            "name": "SlackAccount"
          },
          {
            "name": "WikiAccount"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "WagtailBlock",
        "possibleTypes": [
          {
            "name": "BasicLeadBlock"
          },
          {
            "name": "BasicParagraphBlock"
          },
          {
            "name": "BigContactsBlock"
          },
          {
            "name": "ColumnsBasicBlock"
          },
          {
            "name": "ColumnsButtonsBlock"
          },
          {
            "name": "ColumnsMembershipsBlock"
          },
          {
            "name": "EventsListBlock"
          },
          {
            "name": "GreyBlock"
          },
          {
            "name": "HeroFrontBlock"
          },
          {
            "name": "MailchimpSubscribeBlock"
          },
          {
            "name": "PhotoRibbonBlock"
          },
          {
            "name": "RatioBriefingBlock"
          },
          {
            "name": "RatioExerciseBlock"
          },
          {
            "name": "RatioExerciseOnelineBlock"
          },
          {
            "name": "RatioHeaderBlock"
          },
          {
            "name": "RatioInsetBlock"
          },
          {
            "name": "RatioMathBlock"
          },
          {
            "name": "RatioNotebookSectionBlock"
          },
          {
            "name": "RatioParagraphBlock"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "WagtailPage",
        "possibleTypes": [
          {
            "name": "BlogIndexPage"
          },
          {
            "name": "BlogPostPage"
          },
          {
            "name": "FaqPage"
          },
          {
            "name": "FolderPage"
          },
          {
            "name": "FreeFormPage"
          },
          {
            "name": "ProjectIndexPage"
          },
          {
            "name": "ProjectPage"
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
            "name": "RatioSectionIndexPage"
          },
          {
            "name": "RatioSectionPage"
          }
        ]
      }
    ]
  }
};
      export default result;
    