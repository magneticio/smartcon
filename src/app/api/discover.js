import sessionStore from "../stores/sessionStore";

const discoverSessions = async (req, res) => {
  const sessions = await sessionStore.discoverSessions();
  res.json(sessions);
};

module.exports = app => {
  app.post("/api/discover", discoverSessions);
};
