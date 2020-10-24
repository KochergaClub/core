import styled from 'styled-components';

import { gql } from '@apollo/client';
import { A, Button, Column, deviceMediaQueries, Input } from '~/frontkit';

import { PaddedBlock } from '~/components';

import { BlockComponent } from '../../types';
import { MailchimpSubscribeBlockFragment as Props } from './index.generated';

// FIXME - move to config
const GROUP_ID = 21289;
const MAILCHIMP_CODE = 'b_275ee3f3bd1fdc7e05496a122_d73cd4de36';
const MAILCHIMP_ACTION =
  'https://kocherga-club.us11.list-manage.com/subscribe/post?u=275ee3f3bd1fdc7e05496a122&id=d73cd4de36';

const SubscribeButton = styled(Button)`
  padding: 10px 40px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  > * + * {
    margin-top: 16px;
  }

  ${deviceMediaQueries.desktop(`
    width: auto;
    flex-direction: row;
    > input {
      min-width: 500px;
    }
    > * + * {
      margin-left: 16px;
      margin-top: 0;
    }
  `)}
`;

const INTEREST_IDS: { [k: string]: number } = {
  news: 2,
  events: 4,
  trainings: 8,
};

const InterestCheckbox = ({
  interest,
  value,
}: {
  interest: string;
  value: boolean;
}) => {
  const id = INTEREST_IDS[interest];

  return (
    <input
      type="checkbox"
      checked={value}
      value={id}
      name={`group[${GROUP_ID}][${id}]`}
      readOnly
    />
  );
};

const MailchimpSubscribeBlock: BlockComponent<Props> = (props) => {
  return (
    <PaddedBlock>
      <form action={MAILCHIMP_ACTION} method="post" target="_blank">
        <div style={{ display: 'none' }}>
          <InterestCheckbox interest="news" value={props.mailchimp.news} />
          <InterestCheckbox interest="events" value={props.mailchimp.events} />
          <InterestCheckbox
            interest="trainings"
            value={props.mailchimp.trainings}
          />
        </div>

        <div style={{ position: 'absolute', left: -5000 }} aria-hidden="true">
          <input
            type="text"
            name={MAILCHIMP_CODE}
            tabIndex={-1}
            value=""
            readOnly
          />
        </div>

        <Column centered gutter={16}>
          <InputContainer>
            <Input
              type="text"
              name="EMAIL"
              placeholder="Ваш E-mail"
              scale="big"
            />

            <SubscribeButton type="submit" kind="primary">
              Подписаться
            </SubscribeButton>
          </InputContainer>
          <small>
            Заполняя форму, вы даёте согласие на{' '}
            <A href="/terms">обработку персональных данных</A>.
          </small>
        </Column>
      </form>
    </PaddedBlock>
  );
};

MailchimpSubscribeBlock.fragment = gql`
  fragment MailchimpSubscribeBlock on MailchimpSubscribeBlock {
    id
    mailchimp: value {
      news
      events
      trainings
    }
  }
`;

export default MailchimpSubscribeBlock;
