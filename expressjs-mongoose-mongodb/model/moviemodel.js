const mongoose = require('mongoose');
const validator= require('validator');
const moviesSchema= mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        validate:{validator.isAlpha}
    }
});
