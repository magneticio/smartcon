const favoriteMetrics = { total: 0 };

const metricVersion = (prefix, version) => {
  if (!version) {
    return;
  }
  const key = `${prefix}:${version}`;
  if (!favoriteMetrics[key]) favoriteMetrics[key] = 0;
  favoriteMetrics[key] += 1;
};

const favoriteSession = (session, version) => {
  metricVersion("app", version.app);
  metricVersion("model", version.model);
  favoriteMetrics["total"] += 1;
};

module.exports = {
  favoriteSession: favoriteSession,
  getMetrics: () => favoriteMetrics
};
