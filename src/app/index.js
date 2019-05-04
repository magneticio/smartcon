import express from "express";
require("express-async-errors");

const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

import registerApi from "./api";

registerApi(app);

// Production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}

app.use(function(err, req, res, next) {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

//start server
app.listen(port, (req, res) => {
  console.log(`Server listening on port: ${port}`);
});
