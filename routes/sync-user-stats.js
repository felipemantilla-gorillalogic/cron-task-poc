const { SyncProcess } = require("../error-handler/sync-process-class");
const { SyncProcessMiddleware } = require("../error-handler/sync-middleware");

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

  const syncProcess = new SyncProcess(req);
  try {
    await statsSync(req, res);
    res.status(200).send("ok");
  } catch (e) {
    req.log.error(e);
    res.status(500).send("ok");
  } finally {
    syncProcess.report(req);
  }
};

router.get("/sync-user-stats", SyncProcessMiddleware, requestHandler);


module.exports = router;
