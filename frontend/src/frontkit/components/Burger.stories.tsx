import React from 'react';

import { Story } from '@storybook/react';

import { Burger, Props } from './Burger';

export default {
  title: "Components/Burger",
  component: Burger,
};

const Template: Story<Props> = (args) => <Burger {...args} />;

export const Basic = Template.bind({});
Basic.argTypes = {
  color: {
    control: "color",
  },
};
