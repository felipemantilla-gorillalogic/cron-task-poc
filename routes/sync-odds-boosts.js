const { syncProcessMiddleware } = require("../error-handler/sync-middleware");

const router = require("express").Router();

const getMgmOddsBoosts = async (req) => {
  req.log.warn("Warning getting MGM odds boosts");
  return Promise.resolve("ok");
};
const getDraftKingsOddsBoosts = async (req) => {
  return Promise.resolve("ok");
};
const getFanduelOddsBoosts = async () => {
  throw new Error("Error getting Fanduel odds boosts");
};
const updateBoosts = async () => {
  throw new Error("Error updating boosts");
};

const requestHandler = async (req, res) => {
  try {
    await getMgmOddsBoosts(req)
    await getDraftKingsOddsBoosts()
    await getFanduelOddsBoosts()
    await updateBoosts()

    for (i = 0; i < 1000; i++) {} // simulate a long process that may should fail

    res.status(200).send("ok");
  } catch (error) {
    req.log.error(error);
    res.status(500).send(error.message);
  }
};

router.get("/sync-odds-boost", syncProcessMiddleware, requestHandler);

module.exports = router;
