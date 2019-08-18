import { createLoadAction } from '~/redux/action-utils';

import { ImageTemplate } from './types';

export const TEMPLATE_REPLACE_ALL = '[image-templater] TEMPLATE_REPLACE_ALL';
export const TEMPLATE_SET_AND_VIEW = '[image-templater] TEMPLATE_SET_AND_VIEW';

const replaceTemplates = (templates: ImageTemplate[]) => ({
  type: TEMPLATE_REPLACE_ALL as typeof TEMPLATE_REPLACE_ALL,
  payload: templates,
});

const setViewingTemplate = (template: ImageTemplate) => ({
  type: TEMPLATE_SET_AND_VIEW as typeof TEMPLATE_SET_AND_VIEW,
  payload: template,
});

export const loadTemplates = createLoadAction('templater', replaceTemplates);

export const loadTemplateByName = (name: string) =>
  createLoadAction(`templater/${name}/meta`, setViewingTemplate)();

export type ActionTypes =
  | ReturnType<typeof replaceTemplates>
  | ReturnType<typeof setViewingTemplate>;
