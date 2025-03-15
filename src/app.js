const express=require("express");
const connectDB=require("./config/database");
const app =express();
const Usermodel=require("./models/user")

// go to the postman app
app.post("/signup", async(req,res)=>
{
     const userObj= {
         firstname :"ms",
         lastname :"Dhoni",
         emailId :"omsdhoni@gmail.com",
         password :"rsdsafvhfi",
        
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
