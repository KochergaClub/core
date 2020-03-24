import { useContext } from 'react';
import { ToasterContext } from '~/components/Page/WithToaster';

const useNotification = () => {
  const dispatch = useContext(ToasterContext);
  return (payload: { text: string; type: 'Error' }) =>
    dispatch({
      type: 'NOTIFY',
      payload,
    });
};

export default useNotification;
