export interface AnyWagtailPage {
  id: string;
  title: string;
}

export interface NextWagtailPage<P extends AnyWagtailPage> {
  (props: { page: P }): JSX.Element | null;
  fragment: {
    definitions: [
      {
        name: {
          value: string;
        };
        typeCondition: {
          name: {
            value: string;
          };
        };
      }
    ];
  }; // should be gql`` fragment definition
}
