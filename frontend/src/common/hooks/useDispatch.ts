import { useDispatch } from 'react-redux';
import { Dispatch } from '~/redux/store';

// correctly typed version of useDispatch
export default useDispatch as () => Dispatch;
