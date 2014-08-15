var util = require('util');
var memjs = require('memjs');
var Tuc = require('tuc');
var S = require('string');
var tuc = new Tuc();
var mc = memjs.Client.create();
var expire = 60; // 1 min

module.exports.balance = function(req, res) {

  var account = req.params.account;
  var stringKey = util.format('tuc_%d', account);

  mc.get(stringKey, function(err, value, key) {
    if (value === null) {
      // get account balance
      tuc.getBalance(account, function(balance) {
        if (tuc.isError(balance)) {
          res.json(balance);
        }
        else {
          // get account type
          tuc.getType(account, function(type) {
            var response = {
              account: account,
              balance: balance,
              type: type
            };
            // save result ond memcached
            mc.set(stringKey, JSON.stringify(response),
              function(err, success) {
                response.source = 'request';
                res.json(response);
              },
            expire);
          });
        }
      });
    }
    else {
      var memcachedResponse = JSON.parse(value);
      memcachedResponse.source = 'memcached';
      res.json(memcachedResponse);
    }
  });
};
