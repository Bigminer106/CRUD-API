const moviesSeed = require('../movies-seed.js');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE movies RESTART IDENTITY CASCADE;')
    .then(function () {
      return knex('movies').insert(moviesSeed);
    });
};
