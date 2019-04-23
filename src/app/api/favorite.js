import sessionStore from "../stores/sessionStore";

const favoriteSession = async (req, res) => {
  res.send("OK");
};

module.exports = app => {
  app.post("/api/favorite", favoriteSession);
};
