import sessionStore from "../stores/sessionStore";

const listSessions = async (req, res) => {
  const sessions = sessionStore.listSessions();
  res.json(sessions);
};

module.exports = app => {
  app.get("/api/sessions", listSessions);
};
