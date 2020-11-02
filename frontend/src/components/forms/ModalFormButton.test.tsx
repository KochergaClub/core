import { fireEvent, waitFor } from '@testing-library/react';

import { render } from '~/test/utils';

import ModalFormButton from './ModalFormButton';
import { FormShape } from './types';

it('renders without crashing', async () => {
  const shape: FormShape = [
    {
      name: 'foo',
      type: 'string',
      optional: true,
    },
  ];

  type FormValues = { foo: string };
  let posted: FormValues | undefined;
  const post = async (v: FormValues) => {
    posted = v;
  };
  const { getByText, queryByText } = render(
    <ModalFormButton
      shape={shape}
      buttonName="Кнопка"
      modalButtonName="Отправить"
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
