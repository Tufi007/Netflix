const express = require("express");
const moviecrud = require("../controller/moviecrud");
const authController = require("../controller/authcontroller");
const router = express.Router();
router
  .route("/")
  .get(
    // authController.userverify,
     moviecrud.getallmovies)
  .post(moviecrud.creatmovie);
router
  .route("/highestRated")
  .get(
    moviecrud.highestRated, 
    moviecrud.getallmovies);
router.route("/movie-state").get(moviecrud.agg);
router.route("/movie-state-genre").get(moviecrud.getMovieByGenre);
router
  .route("/:id")
  .get(authController.userverify, moviecrud.getmovie)
  .patch(moviecrud.updatemovie)
  .delete(
    authController.userverify,
    authController.checkRole("admin1", "admin2"),
    moviecrud.deletemovie
  );

module.exports = router;
