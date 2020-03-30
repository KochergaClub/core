import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { colors, Row, Column } from '@kocherga/frontkit';

import { Event } from '../stores/Event';

import { useEvenmanSetPricingTypeMutation } from './queries.generated';

interface Props {
  event: Event;
}

const EventRealm: React.FC<Props> = observer(({ event }) => {
  const [reloading, setReloading] = useState(false);

  const [
    setPricingTypeMutation,
    { loading: mutating },
  ] = useEvenmanSetPricingTypeMutation({
    onCompleted: async () => {
      setReloading(true);
      await event.reload();
      setReloading(false);
    },
  });

  return (
    <Column>
      {[
        { value: 'anticafe', title: 'Тариф антикафе' },
        { value: 'free', title: 'Бесплатно' },
      ].map(item => (
        <Row key={item.value} vCentered>
          <input
            type="radio"
            name="pricing_type"
            id={'pricing_type--' + item.value}
            value={item.value}
            checked={event.pricing_type === item.value}
            onChange={() =>
              setPricingTypeMutation({
                variables: { id: event.id, pricing_type: item.value },
              })
            }
          />
          <label
            htmlFor={'pricing_type--' + item.value}
            style={mutating || reloading ? { color: colors.grey[500] } : {}}
          >
            {item.title}
          </label>
        </Row>
      ))}
    </Column>
  );
});

export default EventRealm;
