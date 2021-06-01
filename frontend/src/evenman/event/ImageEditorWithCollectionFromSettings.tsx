import { ApolloQueryResults } from '~/components';
import { ImageEditor, Props as ImageEditorProps } from '~/components/images/ImageEditor';

import { useEvenmanSettingsQuery } from './hooks';

type SettingsFragment = NonNullable<
  ReturnType<typeof useEvenmanSettingsQuery>['data']
>['settings'];

type Props = ImageEditorProps & {
  settingsToCollectionId: (settings: SettingsFragment) => string | undefined;
};

export const ImageEditorWithCollectionFromSettings: React.FC<Props> = ({
  settingsToCollectionId,
  ...props
}) => {
  const settingsQueryResults = useEvenmanSettingsQuery();

  return (
    <ApolloQueryResults {...settingsQueryResults}>
      {({ data: { settings } }) => (
        <ImageEditor
          {...props}
          defaults={{
            ...props.defaults,
            collectionId: settingsToCollectionId(settings),
          }}
        />
      )}
    </ApolloQueryResults>
  );
};
