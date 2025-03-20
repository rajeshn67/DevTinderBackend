const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA="firstname lastname photoURL age Gender about skills";

//get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/recieved",userAuth, async (req,res)=>{

    try{
        
        const loggedInUser=req.user;
        const connectionRequestModel = await ConnectionRequestModel.find({
          toUserId: loggedInUser._id,
          status: "interested",
        }).populate("fromUserId",USER_SAFE_DATA);//also can be done like this
      //  }).populate("fromUserId","firstname lastname photoURL age Gender about skills");//like a string 
     // }).populate("fromUserId",["firstname","lastname"]); //like a array
res.json({
  message: "Data fetched successfully",
  data: connectionRequestModel,
});

    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
     try{
       //Aniket Send request to Rajesh ==>> accepted
       //Rajesh send request to Anket ==>>accepteed
       //status should be accepted for both of them to be shown in the connection list: accepted
       const loggedInUser=req.user;
       const connectionRequest=await ConnectionRequestModel.find({
         $or:[{toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
         ],
       }).populate("fromUserId",USER_SAFE_DATA)
         .populate("toUserId",USER_SAFE_DATA);

       const data=connectionRequest.map(row=> 
       {
         if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
           return row.toUserId;
         }
         return row.fromUserId;
       });
       res.json({
        
         data
       });

     }catch(err){
        res.status(400).send("ERROR : "+err.message);
     }
});
module.exports=userRouter;