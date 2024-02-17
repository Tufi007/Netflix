const express = require("express");
const fs = require("fs");
const movies = require("./../model/moviemodel");
const filterapi = require("./../utlility/filterapi");
const errorhandler = require("./errorHandler");
const customeError = require("../utlility/customerror");
const asyncerrorhandler = require("../utlility/asyncerrorhandler");
exports.responsefunction = responsefunction = (status, data) => {
  return {
    status: status,
    length: data.length,
    data: data,
  };
};

exports.agg = asyncerrorhandler(async (req, res, next) => {
  const data = await movies.aggregate([
    { $match: { ratings: { $gte: 7 } } },
    {
      $group: {
        _id: "$releaseYear",
        avgratings: { $avg: "$ratings" },
        avgtotalratings: { $avg: "$totalRatings" },
        maxprice: { $max: "$price" },
        movies: { $sum: 1 },
      },
    },
    {
      $sort: { minprice: 1 },
    },
  ]);
  res.json(responsefunction("succes", data));
});
exports.getMovieByGenre = asyncerrorhandler(async (req, res, next) => {
  const genre = req.params.genre;
  const data = await movies.aggregate([
    { $unwind: "$genres" },
    {
      $group: {
        _id: "$genres",
        movieCount: { $sum: 1 },
        movies: { $push: "$title" },
      },
    },
    { $addFields: { genre: "$_id" } },
    // {$project: {_id: 0}},
    // {$sort: {movieCount: -1}},
    //{$limit: 6}
    //{$match: {genre: genre}}
  ]);
  res.json(responsefunction("succes", data));
});
exports.highestRated = asyncerrorhandler((req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratings";
  next();
});
exports.getallmovies = asyncerrorhandler(async (req, res, next) => {
  //  try{
  const filterapiobj = new filterapi(movies.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await filterapiobj.query;
  console.log(data);
  if (!data) {
    const error = new customeError(
      `error from all movies${err} ========${err.message}`,
      404
    );
    next(error);
  }

  res.status(200).json(responsefunction("succes", data));
  //
});
exports.creatmovie = asyncerrorhandler(async (req, res, next) => {
  // try {
  const data = req.body;
  const movietitle = req.body.title;
  console.log(movietitle);
  const found = await movies.find({ title: movietitle });
  console.log(found);
  if (found) {
    const movie = await movies.create(data);
    res.status(201).json(responsefunction("succes", movie));
  }
  // } catch (err) {
  //   res
  //     .status(404)
  //     .json(responsefunction(`failed to enter the movies data`, err.message));
  // }
});
exports.getmovie = asyncerrorhandler(async (req, res, next) => {
  // try {
  const id = req.params.id;
  console.log(id);
  const found = await movies.findById(id);

  if (!found) {
    const error = new customeError(`given movie with ${id} not found`, 404);
    next(error);
  }
  res.status(200).json(responsefunction("succes", found));
});
exports.updatemovie = asyncerrorhandler(async (req, res, next) => {
  // try {
  const id = req.params.id;
  const found = await movies.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!found) {
    const error = new customeError(`given movie with ${id} not found`, 404);
    next(error);
  }
  res.status(200).json(responsefunction("succes", found));
  // } catch (err) {
  //   res.status(404).json(responsefunction("failed", err.message));
  // }
});

exports.deletemovie = asyncerrorhandler(async (req, res, next) => {
  const id = req.params.id;

  const found = await movies.findByIdAndDelete(id);
  if (!found) {
    const error = new customeError(`given movie with ${id} not found`, 404);
    next(error);
  }
  // } catch (err) {
  //   res.status(404).json(responsefunction("failed", err.message));
  // } 
  res.status(200).json(responsefunction("status", found));
});
