const mongoose=require("mongoose");
const validator = require('validator');
const userschema= new mongoose.Schema({
     firstname : {
         type :String,
         required:true,
         minLength:4,
     } ,
     lastname : {
        type :String
    } ,
    photoURL : {
        type :String,
        default:"https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value))
            {
                throw new Error("Invalid photo url"+value);
            }
       },
        
    },
    emailId : {
        type :String,
         required:true,
        unique: true,
        lowercase:true,
        trim:true,//remove white spaces
        validate(value){
             if(!validator.isEmail(value))
             {
                 throw new Error("Invalid email address"+value);
             }
        },
    } ,
    password : {
        type :String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Enter a strong password"+value);
            }
       },
        
    } ,
    age : {
        type :Number,
        min:18,
    } ,
   Gender : {  
        type :String,
        validate(value){   //valid on only at the newcreation of the object not on the existing one durirng when you are updateing the existing one
             if(!["male","female","others"].includes(value)){
                 throw new Error("Gender data is not valid");
             }
        },
    },
    Photo :{
         type :String,

    } ,
   about :{
    type :String,
    default:"This is a default about",
   },
   skills :{
    type :[String],
   }

},
{
    timestamps: true
});

const Usermodel =mongoose.model("User" ,userschema);
 module.exports=Usermodel;