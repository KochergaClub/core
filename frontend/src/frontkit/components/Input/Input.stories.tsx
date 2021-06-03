import React from 'react';

import { Story } from '@storybook/react';

import { Column } from '../../layout/Column';
import { Label } from '../Label';
import { Input, Props } from './';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    ref: {
      table: { disable: true },
    },
    theme: {
      table: { disable: true },
    },
    as: {
      table: { disable: true },
    },
    forwardedAs: {
      table: { disable: true },
    },
  },
};

const Template: Story<Props> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  type: 'text',
  placeholder: 'Введите текст',
};

export const BigInputStory = () => (
  <Input type="text" scale="big" placeholder="Введите важный текст" />
);
BigInputStory.storyName = 'Большое текстовое поле';

export const LabeledInputStory = () => (
  <div>
    <Label>Метка:</Label>
    <Input type="text" placeholder="Введите текст" />
  </div>
);
LabeledInputStory.storyName = 'Текстовое поле с меткой';

export const MultipleInputsStory = () => (
  <Column>
    <Input type="text" placeholder="Поле 1" />
    <Input type="text" placeholder="Поле 2" />
  </Column>
);

MultipleInputsStory.storyName = 'Несколько полей';
