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

export const deleteSubscribeChannel = (id: number): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());

  await api.callDelete(`email/subscribe_channel/${id}`);
  await dispatch(loadSubscribeChannels());
};

export const subscribeEmailToSubscribeChannel = (
  channel_id: number,
  email: string
): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());

  await api.call(`email/subscribe_channel/${channel_id}/subscribe`, 'POST', {
    email,
  });
  await dispatch(loadSubscribeChannels());
};
