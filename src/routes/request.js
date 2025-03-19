const express =require("express");
const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnnectionRequest=require("../models/connectionRequest");
requestRouter.post("/request/send/:status/:toUserId",userAuth ,async(req,res)=>
    {
      try{
        const fromUserId=req.user._id;
        const toUserId = req.params.toUserId;
        const status=req.params.status;
const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
           return res.status(400).json({ message: "Invalid status type :"+status });
        }
        const ConnectionRequest= new ConnnectionRequest({
           fromUserId,toUserId,status,
        });

        const data=await ConnectionRequest.save();
        res.json({
           message:"Connection request sent Successfully",
           data,
        });
      }
       catch(err){
         res.status(400).send("ERROR : "+err.message);
       }
     
    });

    module.exports=requestRouter;
