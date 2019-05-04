import sessionStore from "../stores/sessionStore";
import responses from "../utils/responses";

const discoverSessions = async (req, res) => {
  const sessions = await sessionStore.discoverSessions();
  res.json(responses.model(sessions.data, sessions.version));
};

export default app => {
  app.post("/api/discover", discoverSessions);
};
