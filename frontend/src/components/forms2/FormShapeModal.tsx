import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CommonModal } from '../CommonModal';
import { FormShape } from '../forms/types';
import { FormShapeFields, ShapeToValues } from './FormShapeFields';

// "Simple" prefix so that we don't mix this up with PostResult from old forms/types,
// which included a `errors` field for formik errors
export interface SimplePostResult {
  close: boolean;
  error?: string;
}

type AnyValues = Record<string, any>;

export type Props<S extends FormShape> = {
  shape: S;
  defaultValues?: ShapeToValues<S>;
  buttonText: string;
  title: string;
  post: (values: ShapeToValues<S>) => Promise<SimplePostResult | void>;
  close: () => void;
};

export const FormShapeModal = <S extends FormShape>({
  shape,
  defaultValues,
  close,
  title,
  buttonText,
  post,
}: Props<S>): React.ReactElement => {
  const form = useForm<AnyValues>({ defaultValues });
  const [submitError, setSubmitError] = useState('');

  const submit = useCallback(
    async (values: AnyValues) => {
      let postResult: SimplePostResult | undefined;
      try {
        postResult = (await post(values as any)) || { close: true };
      } catch (e) {
        postResult = {
          close: false,
          error: e.message ? `Ошибка: ${e.message}` : 'Неизвестная ошибка',
        };
      }
      if (postResult.close) {
        close();
      }
      if (postResult.error) {
        setSubmitError(postResult.error);
      }
    },
    [close, post]
  );

  // TODO:
  // {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
  return (
    <CommonModal
      close={close}
      title={title}
      buttonText={buttonText}
      submit={form.handleSubmit(submit)}
      loading={form.formState.isSubmitting}
      submitError={submitError}
    >
      <form onSubmit={form.handleSubmit(submit)}>
        <FormShapeFields shape={shape} form={form as any} />
      </form>
    </CommonModal>
  );
};
