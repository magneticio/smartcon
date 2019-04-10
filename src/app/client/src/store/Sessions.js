const requestSessionsType = "REQUEST_SESSIONS";
const receiveSessionsType = "RECEIVE_SESSIONS";
const initialState = { sessions: [], isLoading: false };

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
    }
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
    let sessions = sessionCache;
    if (!sessionCache) {
      dispatch({ type: requestSessionsType });
      const url = `api/sessions`;
      const response = await fetch(url);
      sessions = (await response.json()).map(transformSession);
    }

    if (date) sessions.filter(session => session.date === date);
    if (time) sessions.filter(session => session.time === time);
    if (category)
      sessions.filter(
        session => session.category && session.category.name === category
      );
    if (skill)
      sessions.filter(session => session.skill && session.skill.name === skill);

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
