const express = require("express");
const authController= require('./../controller/authcontroller');
const router= express.Router();
router.route('/signup').get().post(authController.createuser);
module.exports=router;