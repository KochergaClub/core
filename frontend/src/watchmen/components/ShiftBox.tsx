import clsx from 'clsx';
import { useContext } from 'react';

import { useExpandable, useSmartMutation } from '~/common/hooks';
import { colors } from '~/frontkit';
import { staffMemberRoute } from '~/staff/routes';

import { EditingContext } from '../contexts';
import {
    ShiftFragment, ShiftFragmentDoc, WatchmanForPickerFragment, WatchmenUpdateShiftDocument
} from '../queries.generated';
import WatchmanPicker from './WatchmanPicker';

export const nightColor = colors.grey[700];

const Box: React.FC<{ className?: string; bgColor?: string }> = ({
  className = '',
  bgColor,
  children,
}) => (
  <div
    className={clsx('h-8 leading-8 text-center border border-white', className)}
    style={{
      ...({ backgroundColor: bgColor } || {}),
    }}
  >
    {children}
  </div>
);

interface InnerProps {
  shift: ShiftFragment;
  editing: boolean;
}

const InnerShiftBox: React.FC<InnerProps> = ({ shift, editing }) => {
  if (shift.is_night) {
    return (
      <Box className="text-white" bgColor={nightColor}>
        Ночь
      </Box>
    );
  }
  if (!shift.watchman) {
    return <Box className="bg-gray-100" />;
  }

  let content = <>{shift.watchman.member.short_name}</>;
  if (!editing) {
    content = (
      <a
        className="text-black no-underline"
        href={staffMemberRoute(shift.watchman.member.id)}
      >
        {content}
      </a>
    );
  }

  return <Box bgColor={shift.watchman.member.color || 'white'}>{content}</Box>;
};

interface Props {
  shift: ShiftFragment;
}

export const ShiftBox: React.FC<Props> = (props) => {
  const { editing } = useContext(EditingContext);
  const updateMutation = useSmartMutation(WatchmenUpdateShiftDocument, {
    expectedTypename: 'WatchmenShift',
    update(cache, { data }) {
      if (!data) {
        return;
      }
      if (data.result.__typename !== 'WatchmenShift') {
        return;
      }
      // TODO - smarter useSmartMutation with generic over result type would fix this
      const shift = data.result as ShiftFragment;

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
    <div className={clsx('relative', editing && 'cursor-pointer')} ref={ref}>
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
    </div>
  );
};
