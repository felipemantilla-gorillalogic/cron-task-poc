const cron = require("node-cron");
const axios = require("axios");

const init = async () => {
  cron.schedule("*/10 * * * * *", function () {
    axios
      .get("http://localhost:3000/sync-cancellations")
      .then(successHandler)
      .catch(errorHandler);
    axios
      .get("http://localhost:3000/sync-odds-boost")
      .then(successHandler)
      .catch(errorHandler);
    axios
      .get("http://localhost:3000/sync-player-props")
      .then(successHandler)
      .catch(errorHandler);
    axios
      .get("http://localhost:3000/sync-user-stats")
      .then(successHandler)
      .catch(errorHandler);
    axios
      .get("http://localhost:3000/sync-visitor-stats")
      .then(successHandler)
      .catch(errorHandler);
  });
};

const successHandler = (res) => {
  console.log("Success:", res.data);
};

const errorHandler = (res) => {
  console.log("Failed:", res.response.data);
};

module.exports = {
  init,
};
