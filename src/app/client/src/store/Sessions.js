const requestSessionsType = "REQUEST_SESSIONS";
const receiveSessionsType = "RECEIVE_SESSIONS";
const discoverSessionsType = "DISCOVER_SESSIONS";
const discoveredSessionsType = "DISCOVERED_SESSIONS";
const selectedSessionType = "SELECTEDSESSION_PROFILE";
const initialState = {
  sessions: [],
  selectedSessions: [],
  discoveredSessions: [],
  isLoading: false,
  dateFilter: undefined,
  placeFilter: undefined,
  categoryFilter: undefined
};

const transformSession = session => {
  let result = {
    id: session.id,
    title: session.title,
    description: session.description,
    date: parseDate(session.time),
    time: parseTime(session.time),
    place: session.place,
    category: {
      name: session.category
    },
    selected: false
  };

  if (session.category) {
    result["category"] = {
      name: session.category
    };
  }
  if (session.skill) {
    result["skill"] = {
      name: parseSkillName(session.skill_level),
      desciption: parseSkillDescription(session.skill_level)
    };
  }
  return result;
};

const parseDate = datetime =>
  datetime ? datetime.slice(0, datetime.length - 14) : datetime;
const parseTime = datetime => (datetime ? datetime.slice(-13) : datetime);
const parseSkillName = skill =>
  skill && skill.startsWith("Skill Level ")
    ? skill.substring(12, skill.indexOf("("))
    : "";
const parseSkillDescription = skill =>
  skill && skill.indexOf("(") > 0
    ? skill.substring(skill.indexOf("(") + 1, skill.indexOf(")"))
    : "";

let sessionCache = undefined;

export const actionCreators = {
  requestSessions: (date, time, category, skill) => async dispatch => {
    if (!sessionCache) {
      dispatch({ type: requestSessionsType });
      const url = `api/sessions`;
      const response = await fetch(url);
      sessionCache = (await response.json()).map(transformSession);
    }
    const sessions = sessionCache;

    if (date) sessions.filter(session => session.date === date);
    if (time) sessions.filter(session => session.time === time);
    if (category)
      sessions.filter(
        session => session.category && session.category.name === category
      );
    if (skill)
      sessions.filter(session => session.skill && session.skill.name === skill);

    dispatch({ type: receiveSessionsType, sessions });
  },
  discoverSessions: count => async (dispatch, getState) => {
    dispatch({ type: discoverSessionsType });

    const { profile } = getState();

    const url = `api/discover`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        count: count,
        favorites: profile.selectedSessions
      })
    });
    let sessions = [];
    try {
      sessions = (await response.json()).map(transformSession);
    } catch (error) {
      console.log("Failed discovering sessions.");
    }

    dispatch({ type: discoveredSessionsType, sessions });
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

  if (action.type === discoverSessionsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === discoveredSessionsType) {
    return {
      ...state,
      isLoading: false,
      discoveredSessions: action.sessions
    };
  }

  if (action.type === selectedSessionType) {
    const sessions = [...state.sessions];
    const discoveredSessions = [...state.discoveredSessions];
    sessions.forEach(session => {
      session.selected = action.selectedSessions.indexOf(session.id) >= 0;
    });
    discoveredSessions.forEach(session => {
      session.selected = action.selectedSessions.indexOf(session.id) >= 0;
    });

    return {
      ...state,
      sessions: sessions,
      discoveredSessions: discoveredSessions,
      isLoading: false
    };
  }

  return state;
};
