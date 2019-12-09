import { combineReducers } from '@reduxjs/toolkit';

import templates from './features/templates';
import templateItem from './features/templateItem';

const reducer = combineReducers({
  templates: templates.reducer,
  templateItem: templateItem.reducer,
});

export default reducer;
