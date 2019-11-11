import * as React from 'react';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

import { RowNav } from '@kocherga/frontkit';

import TemplaterView from '../views/TemplaterView';

import ImageTemplateForm from './ImageTemplateForm';

interface Props {
  view: TemplaterView;
}

const Container = styled.div`
  margin: 0 20px;
`;

const TemplaterScreen = observer(({ view }: Props) => {
  const [selected, setSelected] = React.useState(view.list[0]);

  return (
    <Container>
      <RowNav>
        {view.list.map(template => (
          <RowNav.Item
            key={template.name}
            selected={selected ? template.name === selected.name : false}
            select={() => setSelected(template)}
          >
            {template.name}
          </RowNav.Item>
        ))}
      </RowNav>
      {selected && <ImageTemplateForm template={selected} />}
    </Container>
  );
});

export default TemplaterScreen;
