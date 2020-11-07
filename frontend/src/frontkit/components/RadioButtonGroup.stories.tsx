import React, { useState } from 'react';

import { Story } from '@storybook/react';

import { RadioButtonGroup } from './RadioButtonGroup';

export default {
  title: 'Components/RadioButtonGroup',
  component: RadioButtonGroup,
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const Basic: Story = () => {
  const [btn, setBtn] = useState('first');
  const select = async (v: string) => {
    await sleep(500);
    setBtn(v);
  };

  return (
    <RadioButtonGroup selected={btn} select={select}>
      <RadioButtonGroup.Button name="first">Первая</RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="second">Вторая</RadioButtonGroup.Button>
      <RadioButtonGroup.Button name="third">Третья</RadioButtonGroup.Button>
    </RadioButtonGroup>
  );
};
