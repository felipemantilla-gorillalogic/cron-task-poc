const { SyncProcess } = require("../error-handler/sync-process-class");
const { SyncProcessMiddleware } = require("../error-handler/sync-middleware");
const express = require("express");
const router = express.Router();

const getMgmOddsBoosts = async (req) => {
  req.log.warn("Warning getting MGM odds boosts");
  return "ok";
};

const getDraftKingsOddsBoosts = async (req) => {
  return "ok";
};

const getFanduelOddsBoosts = async (req) => {
  throw new Error("Error getting Fanduel odds boosts");
};

const updateBoosts = async (req) => {
  throw new Error("Error updating boosts");
};

const logError = (req, error) => {
  req.log.error(error);
};

const requestHandler = async (req, res) => {
  const syncProcess = new SyncProcess(req);

  try {
    await getMgmOddsBoosts(req).catch((error) => logError(req, error));
    await getDraftKingsOddsBoosts(req).catch((error) => logError(req, error));
    await getFanduelOddsBoosts(req).catch((error) => logError(req, error));
    await updateBoosts(req).catch((error) => logError(req, error));

    for (let i = 0; i < 1000; i++) {} // Simulate a long process that may fail

    res.status(200).send("ok");
  } catch (error) {
    logError(req, error);
    res.status(500).send("An error occurred during the sync process");
  } finally {
    syncProcess.report(req);
  }
};

router.get("/sync-odds-boost", SyncProcessMiddleware, requestHandler);

module.exports = router;
