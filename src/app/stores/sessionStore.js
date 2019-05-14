const axios = require("axios");
import config from "../config";

const client = axios.default;
import sessions from "../data/sessions.json";

const listSessions = () => {
  return sessions;
};

const discoverSessions = async (count, favorites) => {
  if (config.version == "1.0") {
    return { version: "1.0", data: [] };
  }
  let baseUrl = process.env.DISCOVER_URL;
  if (!baseUrl) {
    throw new Error(
      "Recommendation service not configured. Please set the DISCOVER_URL environment variable."
    );
  }

  if (!baseUrl.endsWith("/")) baseUrl += "/";

  const url = baseUrl + "api/model";
  const result = await client.post(url, { count, favorites });
  return {
    version: result.data.version,
    data: sessions.filter(session => result.data.data.indexOf(session.id) >= 0)
  };
};

module.exports = {
  listSessions: listSessions,
  discoverSessions: discoverSessions
};
