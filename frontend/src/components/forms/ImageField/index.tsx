import get from 'lodash/get';
import React, { useEffect } from 'react';
import { Controller, FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { useLazyQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import ImageEditor from '~/components/images/ImageEditor';
import { Row } from '~/frontkit';

import { FieldContainer } from '../FieldContainer';
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

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
  defaultValue?: string;
  required?: boolean;
  valueAsNumber?: boolean;
}

export const ImageField = <T extends FieldValues>({
  name,
  title,
  form,
  defaultValue,
  required = false,
  valueAsNumber,
}: Props<T>): React.ReactElement | null => {
  return (
    <FieldContainer
      title={title}
      error={get(form.formState.errors, name) as FieldError}
    >
      <Controller
        control={form.control}
        name={name}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => {
          // wrapped in Row because form fields are stretched by default and ImageEditor doesn't handle it well
          return (
            <Row>
              <ImageEditorById
                id={value as string | undefined}
                onChange={async (id) =>
                  onChange(valueAsNumber ? parseInt(id, 10) : id)
                }
              />
            </Row>
          );
        }}
      />
    </FieldContainer>
  );
};
