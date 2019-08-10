import { useSelector } from 'react-redux';

import { selectAPI } from '~/core/selectors';

const useAPI = () => useSelector(selectAPI);

export default useAPI;
