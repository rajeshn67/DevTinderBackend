const express =require("express");
const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendconnectionrequest",userAuth ,async(req,res)=>
    {
       const user= req.user;
      //sending a connectin request to the user
      console.log("sending connection request");
      res.send( user.firstname+" sent the connect request");
    });

    module.exports=requestRouter;
