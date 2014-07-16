var util = require('util');
var memjs = require('memjs');
var Tuc = require('tuc');
var S = require('string');
var tuc = new Tuc();
var mc = memjs.Client.create();
var expire = 3600; // 1 heour

module.exports.balance = function(req, res){

  var account = req.params.account;

  if( S( account ).isNumeric() ){

    if( account.length === 8 ){
      var stringKey = util.format('tuc_%d', account);

      mc.get(stringKey, function(err, value, key) {

        if( value === null ){

          tuc.getBalance(account, function( balance ){

            tuc.getType(account, function( type ){

              var response = {
                account: account,
                balance: balance,
                type: type
              };

              mc.set(stringKey, JSON.stringify(response), function(err, success) {

                response.source = "request";

                res.json( response );

              },expire);

            });

          });

        }
        else{

          var memcachedResponse = JSON.parse( value );
          memcachedResponse.source = "memcached";

          res.json( memcachedResponse );

        }


      });

    }
    else{
      res.json({error:{message:"Número de tarjeta inválido. Require 8 dígitos numéricos."}});
    }

  }
  else{
    res.json({error:{message:"Número de tarjeta inválido. El formato correcto es 00000000."}});
  }

};
