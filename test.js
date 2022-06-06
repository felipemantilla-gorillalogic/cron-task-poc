const processError = (message) => {
    const error = new Error(message);
    return error.stack.split(/\n/g)
  };

const syncContext = {
  id: "d1828119-307c-4446-8ee8-eff2bb0417ef",
  route: "/sync-user-stats",
  executionTime: 302,
  lastExecutionTimeAt: "2021-12-29 03:10:00",
  warnings: JSON.stringify(["first warning", "second warning"]),
  errors: JSON.stringify([processError("first Error "), processError("second Error")]),
};

console.log(syncContext);