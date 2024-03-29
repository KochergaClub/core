import 'react-quill/dist/quill.snow.css';

import get from 'lodash/get';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { FieldContainer } from './FieldContainer';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
  required?: boolean;
  defaultValue?: string;
}

export const RichTextField = <TFieldValues extends FieldValues>({
  name,
  title,
  defaultValue,
  form,
  required = false,
}: Props<TFieldValues>): React.ReactElement | null => {
  const ref = useRef<HTMLDivElement>(null);

  // This is a hack for https://github.com/quilljs/quill/issues/2190
  // We often render ReactQuill in modal (i.e. react portal) and it probably behaves weirdly for that reason.
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }

  const formats = ['bold', 'italic', 'link', 'list', 'header'];
  const modules = {
    toolbar: [
      // TODO - we use the default dropdown beacuse heading icons icons are missing, see https://github.com/quilljs/quill/issues/986
      //   [{ header: '2' }, { header: '3' }, { header: '4' }],
      [{ header: [2, 3, 4, false] }],
      ['bold', 'italic'],
      ['link'],
    ],
  };

  return (
    <div ref={ref}>
      <FieldContainer
        title={title}
        error={get(form.formState.errors, name) as FieldError}
      >
        <Controller
          control={form.control}
          name={name}
          rules={{ required }}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            // This is actually an uncontrolled mode, even though we use render prop from react-hook-prop controller.
            // The reason for this is that we need to override onChange.
            // TODO - switch to the new `setValueAs` feature from react-hook-form, see https://github.com/react-hook-form/react-hook-form/releases/tag/v6.12.0 for details.
            <ReactQuill
              theme="snow"
              style={{ backgroundColor: 'white' }} // prevent grey on hover in some cases, e.g. when using ShapeListFieldShapeBox
              defaultValue={value as string}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && !e.metaKey) {
                  e.stopPropagation(); // prevent accidental modal form submission
                }
              }}
              onChange={(value) => {
                let formValue = value;
                if (formValue === '<p><br></p>') {
                  formValue = '';
                }
                formValue = formValue.replace(/<br>/g, '<br/>');
                formValue = formValue.replace(/<hr>/g, '<hr/>');
                onChange(formValue);
              }}
              bounds={ref.current || undefined}
              formats={formats}
              modules={modules}
            />
          )}
        />
      </FieldContainer>
    </div>
  );
};
