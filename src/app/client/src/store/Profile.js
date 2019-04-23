const changedProfileType = "CHANGED_PROFILE";
const selectedSessionType = "SELECTEDSESSION_PROFILE";
const initialState = { selectedSessions: [], type: "OTHER" };

export const actionCreators = {
  changeType: type => async (dispatch, getState) => {
    dispatch({ type: changedProfileType, profileType: type });
  },
  selectSession: (sessionId, select, discovered = false) => async (
    dispatch,
    getState
  ) => {
    let { selectedSessions, type } = getState().profile;

    if (select) {
      selectedSessions = [...selectedSessions, sessionId];
    } else {
      selectedSessions = [...selectedSessions.filter(s => s !== sessionId)];
    }
    dispatch({ type: selectedSessionType, selectedSessions });

    if (select) {
      await fetch("api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session: sessionId,
          discovered: discovered,
          profile: { type, favorites: selectedSessions }
        })
      });
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === changedProfileType) {
    return {
      ...state,
      type: action.profileType
    };
  }
  if (action.type === selectedSessionType) {
    return {
      ...state,
      selectedSessions: action.selectedSessions
    };
  }

  return state;
};
