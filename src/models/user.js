const mongoose=require("mongoose");
const userschema= new mongoose.Schema({
     firsname : {
         type :String
     } ,
     lastname : {
        type :String
    } ,
    emailId : {
        type :String
    } ,
    password : {
        type :String
    } ,
    age : {
        type :Number
    } ,
   Gender : {
        type :String
    } 
});

const Usermodel =mongoose.model("User" ,userschema);
 module.exports=Usermodel;