const express = require("express");
const fs = require("fs");
const movies = require("./../model/moviemodel");
// let movies = JSON.parse(fs.readFileSync("./data.json"));
const responsefunction = (status, data) => {
  return {
    status: status,
    length: data.length,
    data: data,
  };
};
exports.getallmovies = async (req, res) => {
  let query = JSON.stringify(req.query);
  query = query.replace(/\b(gte|lte|gt|lt)\b/g, (el) => `$${el}`);
  const querystr = JSON.parse(query);
  console.log(querystr);
  const exclude=['sort','limit','field','page'];
  exclude.forEach((el)=>{
    delete querystr[el];
  })

  let dataquery = movies.find(querystr);
  console.log(querystr);
  if (req.query.sort) {
    let sortquery= req.query.sort;
    sortquery= sortquery.split(',').join(' ');
    console.log(sortquery);
    dataquery = dataquery.sort(sortquery);
   
  }
  if(req.query.field){
    let field= req.query.field;
    field=field.split(',').join(' ');
    dataquery= dataquery.select(field);
  }
 const data= await dataquery;
  // console.log(data);
   res.status(200).json(responsefunction("succes", data));
  
};
exports.creatmovie = async (req, res) => {
  try {
    const data = req.body;
    const movietitle = req.body.title;
    console.log(movietitle);
    const found = await movies.find({ title: movietitle });
    console.log(found);
    if (found) {
      const movie = await movies.create(data);
      res.status(201).json(responsefunction("succes", movie));
    }
  } catch (err) {
    res
      .status(404)
      .json(responsefunction(`failed to enter the movies data`, err.message));
  }
};
exports.getmovie = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const found = await movies.find({ title: id });
    console.log(found);
    if (found) res.status(200).json(responsefunction("succes", found));
  } catch (err) {
    res.status(404).json(responsefunction("failed", err.message));
  }
};
exports.updatemovie = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await movies.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (found) {
      res.status(200).json(responsefunction("succes", found));
    }
  } catch (err) {
    res.status(404).json(responsefunction("failed", err.message));
  }
};

exports.deletemovie = async (req, res) => {
  try {
    const id = req.params.id;

    const found = await movies.findByIdAndDelete(id);
    if (found) res.status(200).json(responsefunction("status", found));
  } catch (err) {
    res.status(404).json(responsefunction("failed", err.message));
  }
};
