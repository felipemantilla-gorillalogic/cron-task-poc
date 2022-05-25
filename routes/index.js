const router = require("express").Router();

const syncPlayerProps = require("./sync-player-props");
const syncOddsBoosts = require("./sync-odds-boosts");
const syncUserStats = require("./sync-user-stats");
const syncCancellations = require("./sync-cancellations");
const syncVisitorStats = require("./sync-visitor-stats");

router.use(syncPlayerProps);
router.use(syncOddsBoosts);
router.use(syncUserStats);
router.use(syncCancellations);
router.use(syncVisitorStats);

module.exports = {
  router,
};
