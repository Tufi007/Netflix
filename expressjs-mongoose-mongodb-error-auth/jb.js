const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./model/moviemodel');
const express= require('express');
const app= express();
// const app = require('./app');

dotenv.config({path: './config.env'});

//CONNECT TO MONGODB
mongoose.connect(process.env.CONN_STR).then((conn)=>{
    console.log('database connected');
});

PORT= process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log('server connected');
})
//READ MOVIES.JSON FILE
const movies = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const obj= [...movies];console.log(obj);
//DELETE EXISTING MOVIE DOCUMENTS FROM COLLECTION
const deleteMovies = async () => {
    try{
        await Movie.deleteMany();
        console.log('Data successfully deleted!');
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}

//IMPORT MOVIES DATA TO MONGODB COLLECTION
const importMovies = async () => {
    try{
        await Movie.insertMany(obj);
        console.log('Data successfully imported!');
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importMovies();
}
if(process.argv[2] === '--delete'){
    deleteMovies();
}