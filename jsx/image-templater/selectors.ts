import { Selector } from 'reselect';

import { State } from '~/redux/store';

import { ImageTemplate } from './types';

export const selectTemplates: Selector<State, ImageTemplate[]> = state =>
  state.imageTemplater.templates;

export const selectViewingTemplate: Selector<
  State,
  ImageTemplate | undefined
> = state => state.imageTemplater.viewingTemplate;
