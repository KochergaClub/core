import { API } from '../api';

const useAPI = () => {
  // In the past this code dependent on csrfToken, but currently we use REST API on frontend only, so we can just grab
  // CSRF token from cookies.
  // Still, we might need some other info from React context in the future, so please use `useAPI()` instead of
  // `new API()` for now.
  return new API({});
};

export default useAPI;
