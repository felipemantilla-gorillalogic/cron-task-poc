const { syncProcessMiddleware } = require("../error-handler/sync-middleware");

const router = require("express").Router();

const syncPlayerProps = (req, league) => {
  if (league === "NBA") {
    return Promise.resolve("ok");
  } else {
    throw new Error("Error syncing player props for " + league);
  }
};

const requestHandler = async (req, res) => {
  try {
    const results = {
      NBA: await syncPlayerProps(req, "NBA"),
      NFL: await syncPlayerProps(req, "NFL"),
    };

    res.status(200).send(results);
  } catch (error) {
    req.log.error(error);
    res.status(500).send("ok");
  }
};

router.get("/sync-player-props", syncProcessMiddleware, requestHandler);

module.exports = router;
