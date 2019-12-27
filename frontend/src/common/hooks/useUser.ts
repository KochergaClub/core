import { useSelector } from 'react-redux';

import { selectUser } from '~/core/selectors';

export default () => useSelector(selectUser);
