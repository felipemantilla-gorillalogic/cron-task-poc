const express = require("express");
const app = express();

const { router } = require("./routes/index");
const localCron = require("./local-cron/index");

app.use((req, res, next) => {
  req.log = {
    warn: console.warn,
    error: console.error,
    info: console.info,
    log: console.log,
  };
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Express Error handling POC running ok");
});

app.use(router);

localCron.init();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
