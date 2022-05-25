const SyncProcessMiddleware = async (req, res, next) => {
  req.syncContext = {
    errors: [],
    warnings: [],
  };

  req.log.warn = (message) => {
    req.syncContext.warnings.push(message);
    console.warn(message);
  };
  req.log.error = (message) => {
    let error = "";

    if (message instanceof Error) {
      error = message;
    } else if (typeof message === "string") {
      error = new Error(message);
    } else {
      error = new Error("Unknown error");
    }

    req.syncContext.errors.push(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );

    console.error(message);
  };
  await next();
};

module.exports = {
  SyncProcessMiddleware,
};
