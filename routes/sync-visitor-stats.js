const { SyncProcess } = require("../error-handler/sync-process-class");
const { syncProcessMiddleware } = require("../error-handler/sync-middleware");
const { syncProcessAfterware } = require("../error-handler/sync-afterware");

const router = require("express").Router();

const syncVisitorStats = (req) => {
  return Promise.resolve("ok");
};

const requestHandler = async (req, res) => {
  const syncProcess = new SyncProcess(req);
  try {
    await syncVisitorStats();
  } catch (error) {
  } finally {
    syncProcess.report(req);
    res.status(200).send("ok");
  }
};

router.get(
  "/sync-visitor-stats",
  syncProcessMiddleware,
  requestHandler,
  syncProcessAfterware
);

module.exports = router;
