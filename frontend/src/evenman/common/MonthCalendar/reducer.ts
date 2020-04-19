import { formatDate } from '~/common/utils';

type WeeksState = {
  weeks: Date[];
  heights: { [k: string]: number };
};

interface SetSizeAction {
  type: 'SET_SIZE';
  payload: {
    date: Date;
    height: number;
  };
}

interface SetWeeksAction {
  type: 'SET_WEEKS';
  payload: Date[];
}

export type Action = SetSizeAction | SetWeeksAction;

export const reducer = (state: WeeksState, action: Action): WeeksState => {
  switch (action.type) {
    case 'SET_SIZE':
      const key = formatDate(action.payload.date, 'yyyy-MM-dd');
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
