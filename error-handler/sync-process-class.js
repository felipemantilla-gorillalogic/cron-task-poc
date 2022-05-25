class SyncProcess {
  constructor(request) {
    this.requestObject = {
      route: request.url,
      params: request.params,
      startAt: new Date().getTime(),
      endAt: new Date().getTime(),
      executionTime: 0,
    };
  }

  report(request) {
    this.requestObject.endAt = new Date().getTime();
    this.requestObject.executionTime =
      this.requestObject.endAt - this.requestObject.startAt;
    this.requestObject = {
      ...this.requestObject,
      ...request.syncContext,
    };
    console.log(this.requestObject);
  }
}

module.exports = { SyncProcess };
