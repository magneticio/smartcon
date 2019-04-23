const axios = require("axios");

const client = axios.default;
import sessions from "../data/sessions.json";

const listSessions = () => {
  return sessions;
};

const discoverSessions = async (count, favorites) => {
  let baseUrl = process.env.DISCOVER_URL;
  if (!baseUrl) {
    return next(
      new Error(
        "Recommendation service not configured. Please set the RECOMMENDATION_URL environment variable."
      )
    );
  }

  if (!baseUrl.endsWith("/")) baseUrl += "/";

  const url = baseUrl + "api/model";
  const result = await client.post(url, { count, favorites });
  return sessions.filter(session => result.data.indexOf(session.id) >= 0);
};

module.exports = {
  listSessions: listSessions,
  discoverSessions: discoverSessions
};
