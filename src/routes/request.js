const express =require("express");
const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnnectionRequest=require("../models/connectionRequest");
const Usermodel=require("../models/user");

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

        const toUser = await Usermodel.findById(toUserId);
        if(!toUser){
          return res.status(404).json({ message: "user not found" });

        }

//if there is an existing connectionrequest
const existingConnectionRequest = await ConnnectionRequest.findOne({
   $or: [
       {fromUserId,toUserId}, 
       {fromUserId:toUserId, toUserId:fromUserId }
      ],
});

 if(existingConnectionRequest){
    return res
      .status(400)
      .json({
        message: "connection request already exists",
      });
 }
        const ConnectionRequest= new ConnnectionRequest({
           fromUserId,
           toUserId,
           status,
        });

        const data=await ConnectionRequest.save();
        res.json({
          message:
            req.user.firstname +" is " + status +" in " + toUser.firstname,
          data,
        });
      }
       catch(err){
         res.status(400).send("ERROR : "+err.message);
       }
     
    });

    module.exports=requestRouter;
