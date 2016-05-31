const express = require('express');
const app = express();
const versions = require('./versions');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.set('json spaces', 2);

app.get('/v1/:account', versions['1'].balance);
app.get('/v2/:account', versions['2'].balance);

app.get('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Recurso no encontrado.',
    },
  });
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
