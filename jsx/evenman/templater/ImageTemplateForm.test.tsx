import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImageTemplateForm from './ImageTemplateForm';

import { RootStore } from '../stores/RootStore';
import ImageTemplate from '../stores/ImageTemplate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = new RootStore();
  const template = new ImageTemplate(root.apiStore, {
    name: 'test',
    sizes: {
      width: 600,
      height: 400,
    },
    schema: {
      fields: [
        {
          name: 'foo',
          type: 'string',
        },
      ],
    },
  });
  ReactDOM.render(<ImageTemplateForm template={template} />, div);
});
