import { useMutation } from '@apollo/client';

import { colors, Column, Row } from '~/frontkit';

import { EvenmanEvent_DetailsFragment, EvenmanUpdateDocument } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventRealm: React.FC<Props> = ({ event }) => {
  const [updateMutation, { loading: mutating }] = useMutation(
    EvenmanUpdateDocument
  );

  return (
    <Column>
      {[
        { value: 'anticafe', title: 'Тариф антикафе' },
        { value: 'free', title: 'Бесплатно' },
      ].map((item) => (
        <Row key={item.value} vCentered>
          <input
            type="radio"
            name="pricing_type"
            id={'pricing_type--' + item.value}
            value={item.value}
            checked={event.pricing_type === item.value}
            onChange={() =>
              updateMutation({
                variables: {
                  input: { event_id: event.id, pricing_type: item.value },
                },
              })
            }
          />
          <label
            htmlFor={'pricing_type--' + item.value}
            style={mutating ? { color: colors.grey[400] } : {}}
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
