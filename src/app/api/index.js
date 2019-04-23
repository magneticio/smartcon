import registerDiscover from "./discover";
import registerSessions from "./sessions";
import registerFavorite from "./favorite";

module.exports = app => {
  registerSessions(app);
  registerDiscover(app);
  registerFavorite(app);
};
