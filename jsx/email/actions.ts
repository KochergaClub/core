import { AsyncAction } from '~/redux/store';

import { selectAPI } from '~/core/selectors';

import { subscribeChannelsSlice, mailchimpCategoriesSlice } from './slices';

import { CreateSubscribeChannelParams } from './types';

export const loadSubscribeChannels = subscribeChannelsSlice.actions.loadAll;
export const loadMailchimpCategories = mailchimpCategoriesSlice.actions.loadAll;

export const addSubscribeChannel = (
  params: CreateSubscribeChannelParams
): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());

  await api.call('email/subscribe_channel', 'POST', params);
  await dispatch(loadSubscribeChannels());
};

export const deleteSubscribeChannel = (id: string): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());

  await api.call(`email/subscribe_channel/${id}`, 'DELETE');
  await dispatch(loadSubscribeChannels());
};
