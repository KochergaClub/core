import { parseISO } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

import { HumanizedDateTime } from '~/components';
import { Column, HR, RichText } from '~/frontkit';

import { EvenmanLeadFragment } from './queries.generated';

type Props = {
  lead: EvenmanLeadFragment;
};

const DescriptionContainer = styled.div`
  font-size: 0.8em;
`;

export const LeadCard: React.FC<Props> = ({ lead }) => {
  return (
    <Column stretch>
      <strong>{lead.name}</strong>
      <small>
        Создан: <HumanizedDateTime date={parseISO(lead.created)} />
      </small>
      <small>
        Обновлён: <HumanizedDateTime date={parseISO(lead.updated)} />
      </small>
      {lead.description ? (
        <DescriptionContainer>
          <HR />
          <RichText dangerouslySetInnerHTML={{ __html: lead.description }} />
        </DescriptionContainer>
      ) : null}
    </Column>
  );
};
