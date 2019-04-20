import * as React from 'react';

import CSRFInput from './CSRFInput';

import { Button } from '@kocherga/frontkit';

const ActionForm = ({ action, title }) => (
  <form method="post" action={action}>
    <CSRFInput />
    <Button type="submit">{title}</Button>
  </form>
);

export default ActionForm;
