const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "username required"] },
  email: {
    type: String,
    required: [true, "email required"],
    validate: [validator.isEmail, "write email correctly"],
    unique: true,
  },
  image: String,
  password: {
    type: String,
    required: [true, "password required"],
    // minlength:8
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
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
const user = mongoose.model("netflixuser", userSchema);
module.exports = user;
