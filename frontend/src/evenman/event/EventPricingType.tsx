import { colors, Row, Column } from '@kocherga/frontkit';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanUpdateMutation,
} from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventRealm: React.FC<Props> = ({ event }) => {
  const [updateMutation, { loading: mutating }] = useEvenmanUpdateMutation();

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
              updateMutation({
                variables: { id: event.id, pricing_type: item.value },
              })
            }
          />
          <label
            htmlFor={'pricing_type--' + item.value}
            style={mutating ? { color: colors.grey[500] } : {}}
          >
            {item.title}
          </label>
        </Row>
      ))}
    </Column>
  );
};

export default EventRealm;

//test
