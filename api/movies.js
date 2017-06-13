const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validMovie(movie) {
  const hasTitle = typeof movie.title == 'string' && movie.title.trim() != '';
  const hasURL = typeof movie.url == 'string' && movie.url.trim() != '';
  const hasDescription = typeof movie.description == 'string' && movie.description.trim() != '';
  const hasRating = !isNaN(movie.rating);
  return hasTitle && hasURL && hasDescription && hasRating;
}

router.get('/', (req, res) => {
  queries.getAll().then(movies => {
    res.json(movies);
  })
})

router.get('/:id', isValidId, (req, res) => {
  queries.getOne(req.params.id).then(movie => {
    res.json(movie);
  })
});

router.post('/', (req, res, next) => {
  if (validMovie(req.body)) {
    queries.create(req.body).then(movies => {
      res.json(movies[0]);
    })
  } else {
    next(new Error('Invalid Movie'))
  }
})

router.put('/:id', isValidId, (req, res, next) => {
  if (validMovie(req.body)) {
    queries.update(req.params.id, req.body).then(movies => {
      res.json(movies[0]);
    })
  } else {
    next(new Error('Invalid Movie'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
