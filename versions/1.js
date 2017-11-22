const util = require('util');
const memjs = require('memjs');
const Tuc = require('tuc');
const S = require('string');
const tuc = new Tuc();
const mc = memjs.Client.create();
const expire = 60; // 1 min

module.exports.balance = (req, res) => {

  let account = req.params.account;
  let stringKey = util.format('tuc_%d', account);

  mc.get(stringKey, (err, value, key) => {
    if (value === null) {
      // get account balance
      tuc.getBalance(account, (balance) => {
        if (tuc.isError(balance)) {
          res.json(balance);
        } else {
          let response = {
            account: account,
            balance: balance,
          };

          // save result ond memcached
          mc.set(stringKey, JSON.stringify(response), (err, success) => {
            response.source = 'request';
            res.json(response);
          }, expire);
        }
      });
    } else {
      let memcachedResponse = JSON.parse(value);
      memcachedResponse.source = 'memcached';
      res.json(memcachedResponse);
    }
  });
};
