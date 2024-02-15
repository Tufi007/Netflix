const express = require("express");
const moviecrud = require("../controller/moviecrud");
const router = express.Router();
router.route("/").get(moviecrud.getallmovies).post(moviecrud.creatmovie);
router
  .route("/highestRated")
  .get(moviecrud.highestRated, moviecrud.getallmovies);
router.route("/movie-state").get(moviecrud.agg);
router.route("/movie-state-genre").get(moviecrud.getMovieByGenre);
router
  .route("/:id")
  .get(moviecrud.getmovie)
  .patch(moviecrud.updatemovie)
  .delete(moviecrud.deletemovie);

module.exports = router;
