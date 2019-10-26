import React from 'react';

import styled from 'styled-components';

import { Button, fonts } from '@kocherga/frontkit';

import HumanizedDateTime from '~/components/HumanizedDateTime';
import HeroWithImage from '~/components/HeroWithImage';
import HeroHeader from '~/components/HeroHeader';

import { PublicEvent } from '~/events/types';

const Container = styled.div`
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
`;

const BottomRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  font-size: ${fonts.sizes.L};
  color: white;

  > * + * {
    margin-left: 32px;
  }

  > :first-child {
    flex: 1;
    text-align: right;
  }

  > :last-child {
    flex: 1;
    text-align: left;
  }
`;

interface Props {
  event: PublicEvent;
}

const BottomRow: React.FC<Props> = ({ event }) => {
  return (
    <BottomRowContainer>
      <HumanizedDateTime date={event.start} />
      <Button>Зарегистрироваться</Button>
      <div>Через ... дней</div>
    </BottomRowContainer>
  );
};

const ProjectHeroBlock: React.FC<Props> = ({ event }) => {
  const imageUrl = event.image || ''; // TODO - default image url?

  return (
    <HeroWithImage image={imageUrl}>
      <Container>
        <HeroHeader>{event.title}</HeroHeader>
        <BottomRow event={event} />
      </Container>
    </HeroWithImage>
  );
};

export default ProjectHeroBlock;
