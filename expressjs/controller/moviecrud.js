const express = require("express");
const fs = require("fs");
let movies = JSON.parse(fs.readFileSync("./data.json"));
const responsefunction = (status, data) => {
    return {
      status: status,
      data: data,
    };
  };
  exports.getallmovies = (req, res) => {
    res.status(200).json({
      status: "succes",
      data: movies,
    });
  };
  exports.creatmovie = (req, res) => {
    
    if (!req.body.id || !req.body.movie)
      return res.json(responsefunction("failed", req.body));
    if (req.body.id || req.body.movie) {
      
      movies.push(req.body);
      let newmovies = JSON.stringify(movies);
      
      fs.writeFile("./data.json",newmovies, () => {
        
        return res.status(201).json(responsefunction("succes", req.body));
      });
    }
  };
  exports.getmovie = (req, res) => {
  
    const foundmovie = movies.find((movie) => {
      return movie.id == req.params.id * 1;
    });
    if (!foundmovie)
      return res
        .status(404)
        .json(responsefunction("failed no id", req.params.id));
    if (foundmovie)
      return res.status(200).json(responsefunction("succes", foundmovie));
  };
  exports.updatemovie = (req,res) => {
    const patch=req.body;
    const id = req.params.id*1;
    const foundmovie= movies.find(movie => movie.id=== id);
    if (!foundmovie) return res.status(404).json(responsefunction('cannot update as id not',id));
    if (foundmovie){
      let index= movies.indexOf(foundmovie);
      Object.assign(foundmovie,req.body);
      movies[index]=foundmovie;
      const newmovie= JSON.stringify(movies);
      fs.writeFile('./data.json',newmovie,(err)=>{
        res.status(202).json(responsefunction('updated',foundmovie));
      });
      
    }
  };
  exports.deletemovie = (req,res) => {
    const id = req.params.id*1;
    const foundmovie= movies.find((movie) => movie.id === id);
 
    if(!foundmovie) return res.status(404).json(responsefunction('no data found'));
    if(foundmovie){
      const index= movies.indexOf(foundmovie);
     
      movies.splice(index,1);
      const newmovie= JSON.stringify(movies);
      fs.writeFile('./data.json',newmovie,(err)=>{
       res.status(202).json(responsefunction('succesfully deleted'));
      });
      
    }
  }