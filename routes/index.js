const router = require("express").Router();

const syncPlayerProps = require("./sync-player-props");
const syncOddsBoosts = require("./sync-odds-boosts");
const syncUserStats = require("./sync-user-stats");

router.use(syncPlayerProps);
router.use(syncOddsBoosts);
router.use(syncUserStats);

module.exports = {
  router,
};
