import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { withApollo, withStaff } from '~/apollo';
import { PaddedBlock, Page } from '~/components';
import { FormShapeFields, ShapeToValues } from '~/components/forms2/FormShapeFields';
import { Button, Column } from '~/frontkit';

const shape = [
  {
    name: 'foo',
    type: 'string',
  },
  {
    name: 'bar',
    type: 'date',
  },
  {
    name: 'description',
    type: 'richtext',
    optional: true,
  },
  {
    name: 'checkme',
    type: 'boolean',
  },
  {
    name: 'more',
    type: 'shape',
    shape: [
      {
        name: 'img',
        type: 'image',
        optional: true,
      },
      {
        name: 'rrr',
        type: 'choice',
        widget: 'radio',
        options: [
          ['foo', 'Фу'],
          ['bar', 'Бар'],
        ],
      },
      {
        name: 'sss',
        type: 'choice',
        widget: 'dropdown',
        options: [
          ['foo', 'Фу'],
          ['bar', 'Бар'],
        ],
      },
    ],
  },
  {
    name: 'repeat',
    type: 'list',
    field: {
      name: 'baz',
      type: 'string',
    },
  },
] as const;

type Values = ShapeToValues<typeof shape>;

const FormsDemoPage: React.FC = () => {
  const form = useForm<Values>({
    defaultValues: {
      foo: 'abc',
      bar: '2020-04-01',
      more: {
        sss: 'bar',
      },
    },
  });

  const [result, setResult] = useState('');

  const onSubmit = async (v: Values) => {
    setResult(JSON.stringify(v, null, 2));
  };

  return (
    <Page title="forms demo">
      <PaddedBlock>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Column stretch>
            <FormShapeFields
              shape={shape}
              form={form}
              // values={values}
            />
            <Button size="big" type="submit" kind="primary">
              submit
            </Button>
            <pre>{result}</pre>
          </Column>
        </form>
      </PaddedBlock>
    </Page>
  );
};

export default withApollo(withStaff(FormsDemoPage));
