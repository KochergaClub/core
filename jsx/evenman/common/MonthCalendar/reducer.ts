import moment from 'moment';

type WeeksState = {
  weeks: moment.Moment[];
  heights: { [k: string]: number };
};

interface SetSizeAction {
  type: 'SET_SIZE';
  payload: {
    date: moment.Moment;
    height: number;
  };
}

interface SetWeeksAction {
  type: 'SET_WEEKS';
  payload: moment.Moment[];
}

export type Action = SetSizeAction | SetWeeksAction;

export const reducer = (state: WeeksState, action: Action): WeeksState => {
  switch (action.type) {
    case 'SET_SIZE':
      const key = action.payload.date.format('YYYY-MM-DD');
      return {
        weeks: state.weeks,
        heights: {
          ...state.heights,
          [key]: action.payload.height,
        },
      };
    case 'SET_WEEKS':
      return {
        weeks: action.payload,
        heights: state.heights,
      };
    default:
      return state;
  }
};
