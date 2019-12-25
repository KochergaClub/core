import { connect } from 'react-redux';

import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import WatchmanPicker from './WatchmanPicker';

import { useExpandable } from '~/common/hooks';
import { State } from '~/redux/store';

import { nightColor } from '../constants';

import { selectEditing } from '../features/editing';

import {
  ShiftFragment,
  ShiftFragmentDoc,
  WatchmanForPickerFragment,
  useWatchmenUpdateShiftMutation,
} from '../queries.generated';

const Container = styled.div<{ editing: boolean }>`
  position: relative;
  cursor: ${props => (props.editing ? 'pointer' : 'auto')};
`;

const Box = styled.div`
  height: 2em;
  line-height: 2em;
  text-align: center;
  border: 1px solid white;
`;

const EmptyBox = styled(Box)`
  background-color: ${colors.grey[100]};
`;

const NightBoxContainer = styled(Box)`
  background-color: ${nightColor};
  color: white;
`;

const NightBox = () => <NightBoxContainer>Ночь</NightBoxContainer>;

const WatchmanLink = styled.a`
  color: black;
  text-decoration: none;
`;

const InnerShiftBox = ({
  shift,
  editing,
}: {
  shift: ShiftFragment;
  editing: boolean;
}) => {
  if (shift.is_night) {
    return <NightBox />;
  }
  if (!shift.watchman) {
    return <EmptyBox />;
  }

  let content = <>{shift.watchman.member.short_name}</>;
  if (!editing) {
    content = (
      <WatchmanLink href={`/team/staff/${shift.watchman.member.id}`}>
        {content}
      </WatchmanLink>
    );
  }

  return (
    <Box style={{ backgroundColor: shift.watchman.member.color || 'white' }}>
      {content}
    </Box>
  );
};

interface OwnProps {
  shift: ShiftFragment;
}

interface StateProps {
  editing: boolean;
}

type Props = OwnProps & StateProps;

const ShiftBox = (props: Props) => {
  const { editing } = props;
  const [updateMutation] = useWatchmenUpdateShiftMutation({
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const shift = data.shift;

      cache.writeFragment({
        id: 'WatchmenShift:' + shift.date + '/' + shift.shift, // should match dataIdFromObject
        fragment: ShiftFragmentDoc,
        fragmentName: 'Shift',
        data: shift,
      });
    },
  });

  const { flipExpand, unexpand, ref, expanded } = useExpandable();

  const pickWatchman = async (watchman: WatchmanForPickerFragment) => {
    await updateMutation({
      variables: {
        params: {
          date: props.shift.date,
          shift: props.shift.shift,
          watchman_id: watchman.id,
          is_night: false,
        },
      },
    });
    unexpand();
  };

  const pickExtra = async (text: string) => {
    await updateMutation({
      variables: {
        params: {
          date: props.shift.date,
          shift: props.shift.shift,
          is_night: text === 'Ночь',
        },
      },
    });
    unexpand();
  };

  return (
    <Container ref={ref} editing={editing}>
      <div onClick={editing ? flipExpand : undefined}>
        <InnerShiftBox shift={props.shift} editing={editing} />
      </div>
      {expanded && (
        <WatchmanPicker
          pickedWatchman={pickWatchman}
          pickedExtra={pickExtra}
          extra={[
            { text: 'Ночь', color: nightColor, dark: true },
            { text: 'Очистить', color: 'white', dark: false },
          ]}
        />
      )}
    </Container>
  );
};

export default connect((state: State) => ({ editing: selectEditing(state) }))(
  ShiftBox
);
