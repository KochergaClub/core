import React, { useCallback, useState } from 'react';
import { DeepPartial, useForm } from 'react-hook-form';

import { useFocusOnFirstInput } from '~/common/hooks';

import { CommonModal } from '../CommonModal';
import { FormShapeFields } from './FormShapeFields';
import { FormShape, ModalPostResult, ShapeToValues } from './types';

type AnyValues = Record<string, any>;

export type Props<S extends FormShape> = {
  shape: S;
  defaultValues?: DeepPartial<ShapeToValues<S>>;
  submitLabel?: string;
  title: string;
  post: (values: ShapeToValues<S>) => Promise<ModalPostResult | void>;
  close: () => void;
};

export const FormShapeModal = <S extends FormShape>({
  shape,
  defaultValues,
  close,
  title,
  submitLabel,
  post,
}: Props<S>): React.ReactElement => {
  const form = useForm<AnyValues>({ defaultValues });
  const [submitError, setSubmitError] = useState('');

  const submit = useCallback(
    async (values: AnyValues) => {
      let postResult: ModalPostResult;
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

  const formRef = useFocusOnFirstInput();

  return (
    <CommonModal
      close={close}
      title={title}
      submitLabel={submitLabel}
      submit={form.handleSubmit(submit)}
      loading={form.formState.isSubmitting}
      submitError={submitError}
    >
      <form onSubmit={form.handleSubmit(submit)} ref={formRef}>
        <FormShapeFields shape={shape} form={form as any} />
      </form>
    </CommonModal>
  );
};
