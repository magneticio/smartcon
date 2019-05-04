import sessionStore from "../stores/sessionStore";

const favoriteSession = async (req, res) => {
  res.send("OK");
};

export default app => {
  app.post("/api/favorite", favoriteSession);
};
