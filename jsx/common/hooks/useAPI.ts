import { useSelector } from 'react-redux';

import { selectAPI } from '~/navigation/selectors';

const useAPI = () => useSelector(selectAPI);

export default useAPI;
