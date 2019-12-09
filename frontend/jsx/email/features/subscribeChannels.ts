import { createResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { SubscribeChannel, CreateSubscribeChannelParams } from '../types';

const feature = createResourceFeature<SubscribeChannel>({
  name: 'email/subscribeChannels',
  endpoint: 'email/subscribe_channel',
});

/**************** thunks **************/
export const loadSubscribeChannels = feature.thunks.load;

export const addSubscribeChannel = (params: CreateSubscribeChannelParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('email/subscribe_channel', 'POST', params);
    await dispatch(loadSubscribeChannels());
  });

export const deleteSubscribeChannel = (slug: string) =>
  apiThunk(async (api, dispatch) => {
    await api.callDelete(`email/subscribe_channel/${slug}`);
    await dispatch(loadSubscribeChannels());
  });

export const subscribeEmailToSubscribeChannel = (slug: string, email: string) =>
  apiThunk(async (api, dispatch) => {
    await api.call(`email/subscribe_channel/${slug}/subscribe`, 'POST', {
      email,
    });
    await dispatch(loadSubscribeChannels());
  });

/**************** selectors **************/
export const selectSubscribeChannels = feature.selectors.asList;

export default feature.slice;
