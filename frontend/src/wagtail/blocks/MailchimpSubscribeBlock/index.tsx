import { gql } from '@apollo/client';

import { PaddedBlock } from '~/components';
import { kochergaConfig } from '~/config';
import { A, Button, Column, Input } from '~/frontkit';

import { BlockComponent } from '../../types';
import { MailchimpSubscribeBlockFragment as Props } from './index.generated';

const GROUP_ID = kochergaConfig.mailchimp.groupId;
const MAILCHIMP_CODE = kochergaConfig.mailchimp.code;
const MAILCHIMP_ACTION = kochergaConfig.mailchimp.action;

// TODO - move to config
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
        <div className="hidden">
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
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Input
              type="text"
              name="EMAIL"
              placeholder="Ваш E-mail"
              scale="big"
              size={20}
            />

            <Button type="submit" kind="primary">
              Подписаться
            </Button>
          </div>
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
