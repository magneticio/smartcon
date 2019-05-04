import sessionStore from "../stores/sessionStore";
import responses from "../utils/responses";

const listSessions = async (req, res) => {
  const sessions = sessionStore.listSessions();
  res.json(responses.data(sessions));
};

export default app => {
  app.get("/api/sessions", listSessions);
};
