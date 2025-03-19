const express =require("express");
const authRouter=express.Router();
const { validatesignUpData } = require("../utils/validation");
const Usermodel = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of the data
    validatesignUpData(req);
    //extracting the fields here
    const { firstname, lastname, emailId, password } = req.body;
    //encript the password
    const passwordHash = await bcrypt.hash(password, 10); //salt round 10
    console.log(passwordHash);
    //create a new instance of the user model
    const user = new Usermodel({
      firstname,
      lastname,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await Usermodel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const ispasswardvalid = await  user.validatePassword(password);
    if (ispasswardvalid) {
     
      const token = await user.getJWT();
     

      //add the token to cookie and send the response back to the user

      res.cookie("token", token, { expires: new Date(Date.now() + 1*3600000)});
      res.send("Login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/logout", async (req,res)=>
{
  res.cookie("token",null,{expires:new Date(Date.now()),});
  res.send("logout succesfully"); 
});
module.exports=authRouter;
