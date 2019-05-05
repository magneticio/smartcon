import registerDiscover from "./discover";
import registerSessions from "./sessions";
import registerFavorite from "./favorite";
import registerMetrics from "./metrics";

export default app => {
  registerSessions(app);
  registerDiscover(app);
  registerFavorite(app);
  registerMetrics(app);
};
