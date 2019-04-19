import { getCSRFToken } from '../utils';

export default () => (
  <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()} />
);