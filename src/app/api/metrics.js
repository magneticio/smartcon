import favoriteStore from "../stores/favoriteStore";

const getMetrics = async (req, res) => {
  const metrics = favoriteStore.getMetrics();
  const output = [];
  output.push(
    "# HELP smartcon_favorites Number of favorites tagged with service and version"
  );
  output.push("# TYPE smartcon_favorites counter");
  Object.keys(metrics).forEach(key => {
    if (key === "total") {
      return;
    }
    const val = key.split(":");
    output.push(
      `smartcon_favorites{service="${val[0]}",version="${val[1]}"} ${
        metrics[key]
      }`
    );
  });
  output.push("# HELP smartcon_favorites_total Total number of favorites");
  output.push("# TYPE smartcon_favorites_total counter");
  output.push(`smartcon_favorites_total ${metrics.total}`);
  res.send(output.join("\n"));
};

export default app => {
  app.get("/metrics", getMetrics);
};
