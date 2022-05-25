const { SyncProcess } = require("../error-handler/sync-process-class");
const { SyncProcessMiddleware } = require("../error-handler/sync-middleware");

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

router.get("/sync-visitor-stats", SyncProcessMiddleware, requestHandler);

module.exports = router;
