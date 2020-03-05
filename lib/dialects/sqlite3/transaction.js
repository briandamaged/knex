const Debug = require('debug');

const Transaction = require('../../transaction');

const debug = Debug('knex:tx');

class Transaction_SQLite3 extends Transaction {
  acquireConnection(config, cb) {
    const configConnection = config && config.connection;
    return new Promise((resolve, reject) => {
      try {
        resolve(configConnection || this.client.acquireConnection());
      } catch (e) {
        reject(e);
      }
    }).then(async (connection) => {
      try {
        connection.__knexTxId = this.txid;
        return await cb(connection);
      } finally {
        if (!configConnection) {
          debug('%s: releasing connection', this.txid);
          this.client.releaseConnection(connection);
        } else {
          debug('%s: not releasing external connection', this.txid);
        }
      }
    });
  }
}

module.exports = exports = Transaction_SQLite3;
