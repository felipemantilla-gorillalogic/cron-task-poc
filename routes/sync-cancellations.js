const { syncProcessMiddleware } = require("../error-handler/sync-middleware");

const router = require("express").Router();

const modelsEventUpdate = (req) => {
  return Promise.resolve("ok");
};

const requestHandler = async (req, res) => {
  // verify that we're in app engine. the app engine proxy will strip
  // this header from requests and attach theirs
  //   if (isCloud && req.header("X-Appengine-Cron") !== "true") {
  //     res.status(403).send();
  //     return;
  //   }
  try {
    //   await models.Event.update(
    //     {
    //       eventState: "CANCELLED",
    //     },
    //     {
    //       where: {
    //         eventState: {
    //           [Op.in]: ["TIME_CHANGED", "DATE_CHANGED", "POSTPONED", "SUSPENDED"],
    //         },
    //         startDate: {
    //           // this will always be 6am EST daily
    //           [Op.lte]: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    //         },
    //       },
    //     }
    //   );
    await modelsEventUpdate();
    res.status(200).send("ok");
  } catch (error) {
    req.log.error(error);
    res.status(500).send(error.message);
  }
};

router.get("/sync-cancellations", syncProcessMiddleware, requestHandler);

module.exports = router;
