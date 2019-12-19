import { createValueSlice } from '~/redux/slices/value';

const slice = createValueSlice({
  name: 'watchmen/editing',
  initialState: false,
});

export default slice;

export const setEditing = slice.actions.set;

export const selectEditing = slice.selectors.self;
