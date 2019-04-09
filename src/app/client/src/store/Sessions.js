const requestSessionsType = "REQUEST_SESSIONS";
const receiveSessionsType = "RECEIVE_SESSIONS";
const initialState = { sessions: [], isLoading: false };

export const actionCreators = {
  requestSessions: () => async (dispatch, getState) => {
    dispatch({ type: requestSessionsType });

    /*const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;
    const response = await fetch(url);
    const forecasts = await response.json();*/
    const sessions = [];

    dispatch({ type: receiveSessionsType, sessions });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestSessionsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveSessionsType) {
    return {
      ...state,
      sessions: action.sessions,
      isLoading: false
    };
  }

  return state;
};
