const sessions = require("../data/sessions.json");

const getSessions = async (req, res) => {
  res.json(sessions);
};

module.exports = {
  register: app => {
    app.get("/api/sessions", getSessions);
  }
};
