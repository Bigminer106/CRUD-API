const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('movies');
  },
  getOne(id) {
    return knex('movies').where('id', id).first();
  },
  create(movie) {
    return knex('movies').insert(movie, '*');
  },
  update(id, movie) {
    return knex('movies').where('id', id).update(movie);
  },
  delete(id) {
    return knex('movies').where('id', id).del();
  }
}
