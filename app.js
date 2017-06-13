const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movies = require('./api/movies');
const app = express();

app.use(bodyParser.json());
app.use('/api/v1/movies', movies)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
app.listen(process.env.PORT || 3000)

module.exports = app;
