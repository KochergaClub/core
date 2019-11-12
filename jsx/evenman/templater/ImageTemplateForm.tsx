import React from 'react';

import { Column, Input, Label } from '@kocherga/frontkit';

import ImageTemplate from '../stores/ImageTemplate';

import { reducer, TemplateState, TemplateContext } from './reducer';

import { state2link } from './utils';

interface Props {
  template: ImageTemplate;
}

const Fields = ({
  template,
  state,
}: {
  template: ImageTemplate;
  state: TemplateState;
}) => {
  const dispatch = React.useContext(TemplateContext);
  return (
    <div>
      {template.schema.fields.map(field => (
        <div key={field.name}>
          <Label>{field.name}</Label>
          <Input
            type="text"
            name={field.name}
            value={state[field.name]}
            onChange={e =>
              dispatch({
                type: 'SET_FIELD',
                payload: { name: field.name, value: e.currentTarget.value },
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

const Preview: React.FC<{ state: TemplateState; template: ImageTemplate }> = ({
  state,
  template,
}) => {
  const src = state2link({
    name: template.name,
    state,
    type: 'html',
  });

  const { width, height } = template.sizes;

  return <iframe src={src} style={{ width, height, border: 0 }} />;
};

const ImageTemplateForm = ({ template }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <TemplateContext.Provider value={dispatch}>
      <Column>
        <Fields template={template} state={state} />
        <Preview state={state} template={template} />
        <a
          href={state2link({
            name: template.name,
            state,
            type: 'png',
          })}
        >
          png
        </a>
      </Column>
    </TemplateContext.Provider>
  );
};

export default ImageTemplateForm;
