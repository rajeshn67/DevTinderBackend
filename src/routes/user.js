const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");

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
         if (row.fromUserId._id.toString() === loggedInUser._id.toString()) { //need to conert to string because it is mongoose id
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
userRouter.get("/feed", userAuth ,async(req,res)=>{
   try{
     //user should see all the user cards except
     //0. his own card
     //1.his connections
     //2.ignored people
     //3.already sent the connection request
     const loggedInUser = req.user;
     const page = parseInt(req.query.page) || 1;
     let limit = parseInt(req.query.limit) || 10;
     limit = limit > 50 ? 50:limit;
     const skip = (page - 1) * limit;

    // find all connection request (sent + received)

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

      const hideUserFromFeed=new Set();
      connectionRequest.forEach((req)=>
      {
         hideUserFromFeed.add(req.fromUserId.toString());
         hideUserFromFeed.add(req.toUserId.toString());
      }
      );
     
      const users = await UserModel.find({
        $and: [
          { _id: { $nin: Array.from(hideUserFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ], // nin : not in || ne : not equal
      }).select(USER_SAFE_DATA).skip(skip).limit(limit);
     
     
    res.send(users);
   }catch(err){
     res.status(400).json({ message: "Error : " + err.message });
   
   }
});
module.exports=userRouter;