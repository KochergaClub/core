import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';

import FieldContainer from './FieldContainer';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  required?: boolean;
  defaultValue?: string;
}

const RichTextField = <T extends Record<string, unknown>>({
  name,
  title,
  defaultValue,
  form,
  required = false,
}: Props<T>): React.ReactElement | null => {
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
      <FieldContainer title={title} error={form.errors[name] as FieldError}>
        <Controller
          control={
            form.control as any /* there's something wrong with react-hook-form types, don't know what exactly */
          }
          name={name as string}
          rules={{ required }}
          render={({ onChange }) => (
            <ReactQuill
              theme="snow"
              defaultValue={defaultValue}
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

export default RichTextField;
