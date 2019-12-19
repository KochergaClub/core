import { API } from '~/common/api';

import { WagtailPageProps } from './types';

export const getWagtailPreviewPage = async (
  api: API,
  token: string
): Promise<WagtailPageProps> => {
  const wagtailPage = (await api.callWagtail(
    `page_preview/find/?token=${token}`
  )) as WagtailPageProps;

  return wagtailPage;
};

export const getWagtailPageId = async (
  api: API,
  path: string
): Promise<number> => {
  const locateResult = await api.callWagtail(`pages/locate/?html_path=${path}`);
  return locateResult.id as number;
};

export const getWagtailPage = async (
  api: API,
  pageId: number
): Promise<WagtailPageProps> => {
  const wagtailPage = (await api.callWagtail(
    `pages/${pageId}/?fields=*`
  )) as WagtailPageProps;

  return wagtailPage;
};
