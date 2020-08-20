import { A, Button, Column, Input, Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { MailchimpSubscribeBlockFragment as Props } from '../fragments.generated';

const GROUP_ID = 21289;

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

export default function MailchimpSubscribeBlock(props: Props) {
  return (
    <PaddedBlock>
      <form
        action="https://kocherga-club.us11.list-manage.com/subscribe/post?u=275ee3f3bd1fdc7e05496a122&amp;id=d73cd4de36"
        method="post"
        target="_blank"
      >
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
            name="b_275ee3f3bd1fdc7e05496a122_d73cd4de36"
            tabIndex={-1}
            value=""
            readOnly
          />
        </div>

        <Column centered gutter={16}>
          <Row stretch gutter={16}>
            <Input
              type="text"
              name="EMAIL"
              placeholder="Ваш E-mail"
              scale="big"
            />
            <Button type="submit" kind="primary">
              Подписаться
            </Button>
          </Row>

          <small>
            Заполняя форму, я даю согласие на{' '}
            <A href="/terms">обработку персональных данных</A>.
          </small>
        </Column>
      </form>
    </PaddedBlock>
  );
}
