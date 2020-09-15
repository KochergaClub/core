import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { RichTextFormField } from '../types';
import LabeledField from './LabeledField';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextInput: React.FC<{
  field: RichTextFormField;
  name: string;
}> = ({ field, name }) => {
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
      <LabeledField for={field} name={name}>
        {({ field: formikField, form }) => {
          return (
            <ReactQuill
              theme="snow"
              defaultValue={formikField.value}
              onChange={(value) => {
                let valueInFormik = value;
                if (valueInFormik === '<p><br></p>') {
                  valueInFormik = '';
                }
                valueInFormik = valueInFormik.replace(/<br>/g, '<br/>');
                valueInFormik = valueInFormik.replace(/<hr>/g, '<hr/>');
                form.setFieldValue(formikField.name, valueInFormik);
              }}
              bounds={ref.current || undefined}
              formats={formats}
              modules={modules}
            />
          );
        }}
      </LabeledField>
    </div>
  );
};

export default RichTextInput;
