import registerDiscover from "./discover";
import registerSessions from "./sessions";
import registerFavorite from "./favorite";

export default app => {
  registerSessions(app);
  registerDiscover(app);
  registerFavorite(app);
};
