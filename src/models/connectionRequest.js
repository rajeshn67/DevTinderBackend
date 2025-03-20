const mongoose=require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //reference to the Usermodel collection // after that you can use populate method to get the user details
      required: true,
    },
    toUserId: {
      ref:"User",//reference to the Usermodel collection // after that you can use populate method to get the sender details
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

//compound index to ensure unique connection request
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });//assending order
connectionRequestSchema.pre("save",function(next){
   const connectionRequest=this;
   //Check if the fromuserId is same as toUserId
   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to yourself");
   }
next();
});
const ConnectionRequestModel = mongoose.model( "ConnectionRequest", connectionRequestSchema);
module.exports=ConnectionRequestModel;