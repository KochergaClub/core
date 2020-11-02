import React from 'react';

import { Button } from '../components/Button';
import { Row } from './Row';

export default {
  title: "Layout/Row",
  component: Row,
};

export const Basic = () => (
  <Row>
    <Button>button 1</Button>
    <Button>button 2</Button>
    <Button>button 3</Button>
  </Row>
);

export const CustomGutter = () => (
  <Row gutter={20}>
    <Button>button 1</Button>
    <Button>button 2</Button>
    <Button>button 3</Button>
  </Row>
);

export const Spaced = () => (
  <Row spaced>
    <Button>button 1</Button>
    <Button>button 2</Button>
    <Button>button 3</Button>
  </Row>
);
