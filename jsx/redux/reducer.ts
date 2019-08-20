import { combineReducers } from 'redux';

import coreReducer from '~/core/reducer';

// TODO - lazy-load non-core reducers instead of using everything; replace with replaceReducer()
import staffReducer from '~/staff/reducer';
import watchmenReducer from '~/watchmen/reducer';
import myReducer from '~/my/reducer';
import imageTemplaterReducer from '~/image-templater/reducer';
import ratioReducer from '~/ratio/reducer';
import kkmReducer from '~/kkm/redux-reducer';

const reducer = combineReducers({
  staff: staffReducer,
  watchmen: watchmenReducer,
  my: myReducer,
  core: coreReducer,
  imageTemplater: imageTemplaterReducer,
  ratio: ratioReducer,
  kkm: kkmReducer,
});

export default reducer;
