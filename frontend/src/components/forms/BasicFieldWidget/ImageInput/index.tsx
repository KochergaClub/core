import { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import ImageEditor from '~/components/images/ImageEditor';
import { Row } from '~/frontkit';

import { ImageFieldShape } from '../../types';
import LabeledField from '../LabeledField';
import { WagtailImageDocument } from './queries.generated';

interface EditorProps {
  id?: string;
  onChange: (id: string) => Promise<unknown>;
  // TODO - support defaults (see ImageEditor props)
}

const ImageEditorById: React.FC<EditorProps> = ({ id, onChange }) => {
  const [loadImage, queryResults] = useLazyQuery(WagtailImageDocument);

  useEffect(() => {
    if (!id) {
      return;
    }
    loadImage({
      variables: {
        id,
      },
    });
  }, [id, loadImage]);

  if (!id || !queryResults.called) {
    return <ImageEditor onChange={onChange} />;
  }

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { result } }) => (
        <ImageEditor image={result || undefined} onChange={onChange} />
      )}
    </ApolloQueryResults>
  );
};

const ImageInput: React.FC<{
  field: ImageFieldShape;
  name: string;
}> = ({ field, name }) => {
  return (
    <LabeledField for={field} name={name}>
      {({ field: formikField, form }) => {
        // wrapped in Row because form fields are stretched by default and ImageEditor doesn't handle it well
        return (
          <Row>
            <ImageEditorById
              id={formikField.value}
              onChange={async (id) => {
                form.setFieldValue(formikField.name, id);
              }}
            />
          </Row>
        );
      }}
    </LabeledField>
  );
};

export default ImageInput;
