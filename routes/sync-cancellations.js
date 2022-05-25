const { SyncProcess } = require("../error-handler/sync-process-class");
const { SyncProcessMiddleware } = require("../error-handler/sync-middleware");

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

  const syncProcess = new SyncProcess(req);
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
  } catch (error) {
    req.log.error(error);
  } finally {
    syncProcess.report(req);
    res.status(200).send("ok");
  }
};

router.get("/sync-cancellations", SyncProcessMiddleware, requestHandler);

module.exports = router;
