function ReuseConnection(connection) {
  let previous = Promise.resolve();

  function reuseConnection(next) {
    const basePromise = previous.then(() => next(connection));
    previous = basePromise.catch((err) => {});
    return basePromise.then((x) => x);
  }

  return reuseConnection;
}

module.exports = exports = ReuseConnection;
