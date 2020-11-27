import React, { useEffect } from 'react';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';

import { useLazyQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import ImageEditor from '~/components/images/ImageEditor';
import { Row } from '~/frontkit';

import FieldContainer from '../FieldContainer';
import { WagtailImageForEditorDocument } from './queries.generated';

interface EditorProps {
  id?: string;
  onChange: (id: string) => Promise<unknown>;
  // TODO - support defaults (see ImageEditor props)
}

const ImageEditorById: React.FC<EditorProps> = ({ id, onChange }) => {
  const [loadImage, queryResults] = useLazyQuery(WagtailImageForEditorDocument);

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

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  required?: boolean;
}

export const ImageField = <T extends Record<string, unknown>>({
  name,
  title,
  form,
  required = false,
}: Props<T>): React.ReactElement | null => {
  return (
    <FieldContainer title={title} error={form.errors[name] as FieldError}>
      <Controller
        control={
          form.control as any /* there's something wrong with react-hook-form types, don't know what exactly */
        }
        name={name as string}
        rules={{ required }}
        render={({ value, onChange }) => {
          // wrapped in Row because form fields are stretched by default and ImageEditor doesn't handle it well
          return (
            <Row>
              <ImageEditorById
                id={value}
                onChange={async (id) => onChange(id)}
              />
            </Row>
          );
        }}
      />
    </FieldContainer>
  );
};
