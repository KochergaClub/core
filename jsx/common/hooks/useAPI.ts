import { useContext } from 'react';
import GlobalContext from '~/components/GlobalContext';

const useAPI = () => {
  const { api } = useContext(GlobalContext);
  return api;
};

export default useAPI;
