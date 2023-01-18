const express = require("express");
const app = express();
const proxy = require("express-http-proxy");
const url = require("url");

app.use("/_next/static", express.static("assets"));

app.use(
  "*",
  proxy("localhost:3000", {
    proxyReqPathResolver: (req) => {
      const goHere = url.parse(req.baseUrl).path;
      var parts = req.url.split("?");
      var queryString = parts[1];
      return goHere + (queryString ? "?" + queryString : "");
    },
  })
);

app.listen(8888, function () {
  console.log("Listening!");
});
