const syncProcessMiddleware = async (req, res, next) => {
  req.syncContext = {
    errors: [],
    warnings: [],
  };
  
  res.on("close", (error) => {
    console.log("closing request");
    console.log(res.statusCode);
  });

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
  next();
};

module.exports = {
  syncProcessMiddleware,
};
