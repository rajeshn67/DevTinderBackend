const express=require("express");
const connectDB=require("./config/database");
const app =express();
const Usermodel=require("./models/user")


app.post("/signup", async(req,res)=>
{
     const userObj= {
         firstname :"Om",
         lastname :"Patil",
         emailId :"omdede67@gmail.com",
         password :"rsddhvhfi",
        
     }
     const user = new Usermodel(userObj);
    try {
      await user.save();
     res.send("User added successfully");
    }catch(err) {
      res.status(400).send("Error saving the user "+err.message);
    }
});


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
