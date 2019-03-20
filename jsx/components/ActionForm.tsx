import * as React from 'react';

import { Button } from '@kocherga/frontkit';

const ActionForm = ({ action, title, csrfToken }) => (
  <form method="post" action={action}>
    <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
    <Button type="submit">{title}</Button>
  </form>
);

export default ActionForm;
