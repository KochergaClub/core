import React, { useCallback, useState } from 'react';
import { DeepPartial, FieldError, useForm } from 'react-hook-form';

import { CommonModal } from '../CommonModal';
import { FormShape, ShapeToValues } from '../forms/types';
import { FormShapeFields } from './FormShapeFields';

// "Simple" prefix so that we don't mix this up with PostResult from old forms/types,
// which included a `errors` field for formik errors
export interface PostResult {
  close: boolean;
  error?: string;
  fieldErrors?: Record<string, FieldError>;
}

type AnyValues = Record<string, any>;

export type Props<S extends FormShape> = {
  shape: S;
  defaultValues?: DeepPartial<ShapeToValues<S>>;
  buttonText: string;
  title: string;
  post: (values: ShapeToValues<S>) => Promise<PostResult | void>;
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
      let postResult: PostResult | undefined;
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
      if (postResult.fieldErrors) {
        Object.keys(postResult.fieldErrors).forEach((path) => {
          if (!postResult || !postResult.fieldErrors) {
            return; // shouldn't happen but satisfies typescript
          }
          const fieldError = postResult.fieldErrors[path];
          form.setError(path, fieldError);
        });
      }
    },
    [close, post, form]
  );

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
