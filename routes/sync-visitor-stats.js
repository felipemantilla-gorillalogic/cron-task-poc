const { syncProcessMiddleware } = require("../error-handler/sync-middleware");
const router = require("express").Router();

const syncVisitorStats = (req) => {
  return Promise.resolve("ok");
};

const requestHandler = async (req, res) => {
  try {
    await syncVisitorStats();
    res.status(200).send("ok");
  } catch (error) {
    req.log.error(error);
    res.status(500).send(error.message);
  }
};

router.get("/sync-visitor-stats", syncProcessMiddleware, requestHandler);

module.exports = router;
