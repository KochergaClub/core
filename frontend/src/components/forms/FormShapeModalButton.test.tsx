import { fireEvent, waitFor } from '@testing-library/react';

import { render } from '~/test/utils';

import { FormShapeModalButton } from './FormShapeModalButton';

it('renders without crashing', async () => {
  const shape = [
    {
      name: 'foo',
      type: 'string',
      optional: true,
    },
  ] as const;

  type FormValues = { foo: string };
  let posted: FormValues | undefined;
  const post = async (v: FormValues) => {
    posted = v;
  };
  const { getByText, queryByText } = render(
    <FormShapeModalButton
      shape={shape}
      buttonLabel="Кнопка"
      modalSubmitLabel="Отправить"
      modalTitle="Форма"
      post={post}
    />
  );

  expect(queryByText('Отправить')).toBeNull();

  fireEvent.click(getByText('Кнопка'));
  await waitFor(() => getByText('Отправить'));
  expect(getByText('Отправить')).not.toHaveAttribute('disabled');

  fireEvent.click(getByText('Отправить'));
  await waitFor(() => !getByText('Отправить'));

  expect(posted).toEqual({ foo: '' });
});
