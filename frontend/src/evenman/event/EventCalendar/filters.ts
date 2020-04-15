const SET_EVENT_TYPE = 'SET_EVENT_TYPE';
const SET_HIDE_ANNOUNCED = 'SET_HIDE_ANNOUNCED';

interface SetEventTypeAction {
  type: typeof SET_EVENT_TYPE;
  payload: string | undefined;
}

interface SetHideAnnouncedAction {
  type: typeof SET_HIDE_ANNOUNCED;
  payload: boolean;
}

export type Action = SetEventTypeAction | SetHideAnnouncedAction;

export interface State {
  eventType: string | undefined;
  hideAnnounced: boolean;
}

export const setEventType = (
  payload: string | undefined
): SetEventTypeAction => ({
  type: SET_EVENT_TYPE,
  payload,
});

export const setHideAnnounced = (payload: boolean): SetHideAnnouncedAction => ({
  type: SET_HIDE_ANNOUNCED,
  payload,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_EVENT_TYPE:
      return {
        ...state,
        eventType: action.payload,
      };
    case SET_HIDE_ANNOUNCED:
      return {
        ...state,
        hideAnnounced: action.payload,
      };
    default:
      return state;
  }
};
