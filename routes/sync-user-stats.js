const { SyncProcess } = require("../error-handler/sync-process-class");
const { syncProcessMiddleware } = require("../error-handler/sync-middleware");

const router = require("express").Router();

const statsSync = (req) => {
  req.log.warn("Warning example syncing stats");
  try {
    throw new Error("Error syncing stats");
  } catch (error) {
    req.log.error(error);
  }
  return Promise.resolve("ok");
};

const requestHandler = async (req, res) => {
  // Verify that we're in app engine.
  // The app engine proxy will strip this header from requests and attach its own.
  //   if (isCloud && req.header("X-Appengine-Cron") !== "true") {
  //     return res.status(403).send();
  //   }

  try {
    await statsSync(req, res);
    throw new Error("Error syncing stats 2");
    res.status(200).send("ok");
  } catch (e) {
    req.log.error(e);
    res.status(500).send(e.message);
  }
};

router.get("/sync-user-stats", syncProcessMiddleware, requestHandler);

module.exports = router;
