const { SyncProcess } = require("../error-handler/sync-process-class");
const { SyncProcessMiddleware } = require("../error-handler/sync-middleware");

const router = require("express").Router();

const syncPlayerProps = (req, league) => {
  if (league === "NBA") {
    return Promise.resolve("ok");
  } else {
    throw new Error("Error syncing player props for " + league);
  }
};

const requestHandler =  async (req, res) => {
  const syncProcess = new SyncProcess(req);
  try {
    const results = {
      NBA: await syncPlayerProps(req, "NBA"),
      NFL: await syncPlayerProps(req, "NFL"),
    };

    res.status(200).send(results);
  } catch (error) {
    req.log.error(error);
    res.status(200).send("ok");
  } finally {
    syncProcess.report(req);
  }
}

router.get("/sync-player-props", SyncProcessMiddleware, requestHandler);

module.exports = router;
