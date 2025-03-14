const express =require("express");
const connectDB =require("./config/database");
const app =express();
const Usermodel=require("./models/user")


app.post("/singup", async(req,res)=>
{
     const userObj= {
         firstname : "Rajesh",
         lastname :"Narwade",
         emailId :"rajeshnarwade67@gmail.com",
         password :"rajeshh899",
        
     }
     const user = new Usermodel(userObj);
});
await user.save();

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
