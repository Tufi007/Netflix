const mongoose = require("mongoose");
// const plugins = require("mongoose-user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const customeError = require("../utlility/customerror");
const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "username required"] },
  email: {
    type: String,
    Selection:false,
    required: [true, "email required"],
    validate: [validator.isEmail, "write email correctly"],
    unique: true,
  },
  image: String,
  password: {
    type: String,
    required: [true, "password required"],
    minlength:8,
  
  },
  confirmPassword: {
    type: String,
    required: [true, "password required"],
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "confirm passsword not equal to password",
    },
  },
  passwordChangedat:{
    type:Date,
    default:new Date()
  },
  role:{
    type:String,
    enum:['user','admin1','admin2'],
    default:'user'
  },
  resettoken:String,
  resettokenexpires:Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.comparePassword = async function (pass){
  return await bcrypt.compare(pass,this.password);
};
userSchema.methods.checkPassChanged = async function(JWTtimestamp){
  if (this.passwordChangedat) {
  const changedat = parseInt(this.passwordChangedat.getTime()/1000,10);
  return changedat>JWTtimestamp;
}};
userSchema.methods.makeresettoken= async function(){
  const resettoken=  crypto.randomBytes(2).toString('hex');
  this.resettoken=  crypto.createHash('sha256').update(resettoken).digest('hex');
  this.resettokenexpires = Date.now() + 10*60*1000;
  console.log(`${resettoken} =============${this.resettoken}============${this.resettokenexpires}`);
 
  return resettoken;
};
userSchema.methods.resetPassword= async function(newpass){
  this.resettoken=undefined;
  this.resettokenexpires=undefined;
  this.password=newpass;
  this.confirmPassword=newpass;
 this.passwordChangedat = Date.now();
  return this.passwordChangedat;
};
const user = mongoose.model("netflixuser", userSchema);
module.exports = user;
