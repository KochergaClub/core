import * as React from 'react';
import * as ReactGA from 'react-ga';

import { Button } from 'reactstrap';

import { ButtonLine } from './components/layout';

import { Room } from './store';

interface Props {
  possibleRooms: Array<[Room, boolean]>;
  room: Room | null;
  setRoom: (room: Room) => void;
}

export class RoomPicker extends React.Component<Props> {
  setRoom(room: Room) {
    ReactGA.event({
      category: 'Form',
      action: 'Set room',
      label: room,
    });
    this.props.setRoom(room);
  }

  render() {
    return (
      <ButtonLine>
        {this.props.possibleRooms.map(([room, isPossible], i) => {
          const isSelected = room === this.props.room;
          let color = 'primary';
          if (!isPossible) {
            color = isSelected ? 'danger' : 'secondary';
          }
          return (
            <Button
              key={i}
              onClick={() => this.setRoom(room)}
              outline={!isSelected}
              className="mr-1"
              color={color}
            >
              {room}
            </Button>
          );
        })}
      </ButtonLine>
    );
  }
}
