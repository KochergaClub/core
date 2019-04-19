import * as React from 'react';

import { getCSRFToken } from '../utils';

import { Button } from '@kocherga/frontkit';

const ActionForm = ({ action, title }) => (
  <form method="post" action={action}>
    <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()} />
    <Button type="submit">{title}</Button>
  </form>
);

export default ActionForm;
