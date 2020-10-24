import React from 'react';

import { Button } from '../components/Button';
import { Column } from './Column';

export default {
  title: "Layout/Column",
  component: Column,
};

export const Basic = () => (
  <Column>
    <Button>button 1</Button>
    <Button>button 2</Button>
    <Button>button 3</Button>
  </Column>
);

export const CustomGutter = () => (
  <Column gutter={20}>
    <Button>button 1</Button>
    <Button>button 2</Button>
    <Button>button 3</Button>
  </Column>
);

export const Spaced = () => (
  <div style={{ height: 500 }}>
    <Column spaced>
      <Button>button 1</Button>
      <Button>button 2</Button>
      <Button>button 3</Button>
    </Column>
  </div>
);
