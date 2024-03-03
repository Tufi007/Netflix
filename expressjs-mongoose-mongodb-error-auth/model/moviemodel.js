const mongoose = require("mongoose");
const validator = require("validator");
const fs = require('fs');
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    validate: [validator.isAscii, "Movie name should be Of Alphabhits only"],
    maxlength: [100, " The length of should not exceed by 30"],
    trim: true,
    unique: true,
    minlength: [3, "The length of shuold be greater then 3"],
  },
  description: {
    type: String,
    required: [true, "Description is required field!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required field!"],
  },
  ratings: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 1 && value <= 10;
      },
      message: "Ratings ({VALUE}) should be above 1 and below 10",
    },
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release`${this.vlaue}` year is required field!"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  genres: {
    type: [String],
    required: [true, "Genres is required field!"],
    enum: {
         values: ["Action", "Adventure", "Sci-Fi", "Thriller", "Crime", "Drama", "Comedy", "Romance", "Biography"],
         message: "This genre does not exist"
    }
  },
  directors: {
    type: [String],
    required: [true, "Directors is required field!"],
  },
  coverImage: {
    type: String,
    require: [true, "Cover image is required field!"],
  },
  actors: {
    type: [String],
    select:false,
    require: [true, "actors is required field!"],
  },
  price :{
    type: Number,
    require: [true, "Price is required field!"],
  },
  createdBy: String,
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true},
});
moviesSchema.virtual('totalhoures').get(function(){
  return this.duration/60;
});
moviesSchema.pre('save',function(next){
 this.createdBy="AdminTaufeeq";
 next();
});
moviesSchema.post('save',function(doc,next){
const data = `following movie${doc.title} has been added by ${doc.createdBy}`;
fs.writeFileSync('./controller/abc.txt',data,{flag:'a'},(err)=>{
  console.log(err);
});
next();
});
moviesSchema.pre(/^find/,function(next){
 this.find({releaseDate:{$lte: Date.now()}});
 next();
});
const movie = mongoose.model("netflix", moviesSchema);
module.exports = movie;
//{ plot: {
//   type: String,
//   maxlength: [10000, "upto 10000 wqords allowed in plot"],
// },
// genres: {
//   enum: {
//     values: ["Animation", "Short", "Comedy"]
//   },
// },
// runtime: { type: Number, require: [true, " provide runtime for movie"] },
// cast: { type: Array },
// num_mflix_comments: { type: Number },
// poster: { type: String, require: [true, "title required"], unique: true },
// fullplot: {
//   type: String,
//   maxlength: [15000, "upto 15000 fullplot words required"],
// },
// languages: { type: Array },
// released: { type: Date },
// directors: { type: Array },
// writers: { type: Array },
// awards: {
//   wins: { type: Number },
//   nominations: { type: Number },
//   text: { type: String },
// },
// lastupdated: { type: Date, default: Date.now() },
// year: { type: Number },
// imdb: {
//   rating: { type: Number },
//   votes: { type: Number },
//   id: { type: Number },
// },
// countries: Array,
// type: String,
// tomatoes: {
//   viewer: { rating: { type: Number }, numReviews: { type: Number } },
//   lastUpdated: { $date: { Date } }}}
