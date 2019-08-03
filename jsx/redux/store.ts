import { createStore, combineReducers } from 'redux';
import staffReducer from '../staff/reducer';

const reducer = combineReducers({
  staff: staffReducer,
});

const store = createStore(reducer);
export default store;

export type State = ReturnType<typeof reducer>;
