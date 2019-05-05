import sessionStore from "../stores/sessionStore";
import favoriteStore from "../stores/favoriteStore";

const favoriteSession = async (req, res) => {
  favoriteStore.favoriteSession(req.body.session, req.body.version);
  res.send("OK");
};

export default app => {
  app.post("/api/favorite", favoriteSession);
};
