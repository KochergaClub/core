import React from 'react';

import { A, Button, Input, Row, Column } from '@kocherga/frontkit';

import { MailchimpSubscribeBlockType as Props } from '../types';

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
    <form
      action="https://kocherga-club.us11.list-manage.com/subscribe/post?u=275ee3f3bd1fdc7e05496a122&amp;id=d73cd4de36"
      method="post"
      target="_blank"
    >
      <div style={{ display: 'none' }}>
        <InterestCheckbox interest="news" value={props.value.news} />
        <InterestCheckbox interest="events" value={props.value.events} />
        <InterestCheckbox interest="trainings" value={props.value.trainings} />
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

      <Column centered>
        <Row>
          <Input type="text" name="EMAIL" placeholder="Ваш E-mail" />
          <Button type="submit">Подписаться</Button>
        </Row>

        <div>
          Заполняя форму, я даю согласие на{' '}
          <A href="/terms">обработку персональных данных</A>.
        </div>
      </Column>
    </form>
  );
}
