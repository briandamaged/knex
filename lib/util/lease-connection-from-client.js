const LeaseConnectionFromClient = (client) =>
  async function withConnection(next) {
    const connection = await client.acquireConnection();
    try {
      return await next(connection);
    } finally {
      await client.releaseConnection(connection);
    }
  };

module.exports = exports = LeaseConnectionFromClient;
