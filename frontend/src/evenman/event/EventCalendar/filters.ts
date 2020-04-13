const SET_EVENT_TYPE = 'SET_EVENT_TYPE';
const SET_HIDE_ANNOUNCED = 'SET_HIDE_ANNOUNCED';
const SET_HIDE_UNPUBLISHED = 'SET_HIDE_UNPUBLISHED';

interface SetEventTypeAction {
  type: typeof SET_EVENT_TYPE;
  payload: string | undefined;
}

interface SetHideAnnouncedAction {
  type: typeof SET_HIDE_ANNOUNCED;
  payload: boolean;
}

interface SetHideUnpublishedAction {
  type: typeof SET_HIDE_UNPUBLISHED;
  payload: boolean;
}

export type Action =
  | SetEventTypeAction
  | SetHideAnnouncedAction
  | SetHideUnpublishedAction;

export interface State {
  eventType: string | undefined;
  hideAnnounced: boolean;
  hideUnpublished: boolean;
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

export const setHideUnpublished = (
  payload: boolean
): SetHideUnpublishedAction => ({
  type: SET_HIDE_UNPUBLISHED,
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
    case SET_HIDE_UNPUBLISHED:
      return {
        ...state,
        hideUnpublished: action.payload,
      };
    default:
      return state;
  }
};
