const express=require("express");
const connectDB=require("./config/database");
const app =express();
const Usermodel=require("./models/user")


app.use(express.json());
app.post("/signup", async(req,res)=>
{
     const user = new Usermodel(req.body);
    try {
      await user.save();
     res.send("User added successfully");
    }catch(err) {
      res.status(400).send("Error saving the user "+err.message);
    }
});
//get user by email
app.get("/user" , async (req,res)=>{
      const useremail =req.body.emailId;
      try{
         
   const user = await  Usermodel.find({emailId : useremail});
   if(user.length===0)
   {
      res.status(404).send("User not found");
   }
   else
  {  res.send(user);}
      }
      catch(err){
           res.status(400).send("something wrong");
      }
});

//delete a userby its id
app.delete("/delete",async (req,res)=>
{
    const userID = req.body.userID;
    try{
         
     const user = await Usermodel.findByIdAndDelete({_id:userID});
     // work as same
    // const user = await Usermodel.findByIdAndDelete(userID);
    res.send("user deketed successfully");
        }
    catch(err){
     res.status(400).send("something wrong");
}
});
///update we also use the update but here we are using patch which is use to update the one changein the collaction
app.patch("/update",async (req,res)=>
     {
         const data = req.body;
         const userID = req.body.userID;
         console.log(data);
         try{
              
         await Usermodel.findByIdAndUpdate({_id:userID},data)
         res.send("updated");
             }
         catch(err){
          res.status(400).send("something wrong");
     }});




//get user by emailid only one user
app.get("/userone" , async (req,res)=>{
     const useremail =req.body.emailId;
     try{
        
  const user = await  Usermodel.findOne({emailId : useremail});
  if(!user)
  {
     res.status(404).send("User not found");
  }
  else
 {  res.send(user);}
     }
     catch(err){
          res.status(400).send("something wrong");
     }
});


//feed api - get /feed -get all the users from the database
app.get("/feed" , async(req,res)=>
{
     try{
         
          const user = await  Usermodel.find({});
          if(user.length===0)
          {
             res.status(404).send("User not found");
          }
          else
         {  res.send(user);}
             }
             catch(err){
                  res.status(400).send("something wrong");
             }    
} 
);
connectDB()
.then(() =>
{
     console.log("Database connection is established..")
     app.listen(3000 ,()=> 
        {
             console.log("Server is running on port 3000 !!");
        });
}).catch((err)=>{
     console.log("cannot be connected!!");
}
);
