var express = require('express');
var app = express();
var versions = require('./versions');

app.set('json spaces', 2);

app.get('/v1/:account', versions["1"].balance);

app.get('*', function(req, res){
  res.status(404).json({error:{message:"Recurso no encontrado."}});
});

app.listen(process.env.PORT || 5000);
