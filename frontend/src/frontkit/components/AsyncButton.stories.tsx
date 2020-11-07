import React from 'react';

import { Story } from '@storybook/react';

import { AsyncButton, Props } from './AsyncButton';

export default {
  title: 'Components/AsyncButton',
  component: AsyncButton,
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const Basic: Story<Props> = () => {
  const act = async () => {
    await sleep(1000);
  };
  return <AsyncButton act={act}>sleep 1 second</AsyncButton>;
};
