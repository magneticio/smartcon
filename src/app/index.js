const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

const api = require("./api");

const router = express.Router();

api.register(app);

// Production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}

//start server
app.listen(port, (req, res) => {
  console.log(`Server listening on port: ${port}`);
});
