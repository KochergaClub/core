import React from 'react';

import { Story } from '@storybook/react';

import { Column } from '../layout/Column';
import { Row } from '../layout/Row';
import { Button, Props } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: Story<Props> = (args) => (
  <Button {...args}>{args.children || 'Текст на кнопке'}</Button>
);

export const Basic = Template.bind({});
Basic.argTypes = {
  onClick: {
    action: 'clicked',
    table: { disable: true },
  },
  size: {
    control: 'inline-radio',
  },
  kind: {
    control: 'inline-radio',
  },
  small: {
    description: 'Deprecated, use `size="small"` instead.',
    table: { disable: true },
  },
  primary: {
    description: 'Deprecated, use `kind="primary"` instead.',
    table: { disable: true },
  },
};

export const AllButtons = () => (
  <Row>
    {([undefined, 'primary', 'danger'] as (
      | 'primary'
      | 'danger'
      | undefined
    )[]).map((kind) => (
      <Column key={kind || 'u'}>
        <Button kind={kind} size="small">
          Кнопка
        </Button>
        <Button kind={kind}>Кнопка</Button>
        <Button kind={kind} size="big">
          Кнопка
        </Button>
        <Button kind={kind} size="small" loading>
          Кнопка
        </Button>
        <Button kind={kind} loading>
          Кнопка
        </Button>
        <Button kind={kind} size="big" loading>
          Кнопка
        </Button>
        <Button kind={kind} size="small" disabled>
          Кнопка
        </Button>
        <Button kind={kind} disabled>
          Кнопка
        </Button>
        <Button kind={kind} size="big" disabled>
          Кнопка
        </Button>
      </Column>
    ))}
  </Row>
);
AllButtons.storyName = 'All';

export const SmallButton = () => <Button small>Привет</Button>;
SmallButton.storyName = 'Маленькая';

export const BigButton = () => <Button size="big">Большая кнопка</Button>;
BigButton.storyName = 'Большая';

export const PrimaryButton = () => <Button kind="primary">Привет</Button>;
PrimaryButton.storyName = 'Главная';

export const InactiveButton = Template.bind({});
InactiveButton.args = { disabled: true, children: 'Нельзя нажать' };
InactiveButton.storyName = 'Неактивная';

export const LoadingButton = Template.bind({});
LoadingButton.args = { loading: true, children: 'Загружается...' };
LoadingButton.storyName = 'Во время выполнения действия';
