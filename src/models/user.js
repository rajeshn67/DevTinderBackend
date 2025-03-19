const mongoose=require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
         enum:["male","female","other"],
         message:`{VALUE} is not a valid gender type`,

        // validate(value){   //valid on only at the newcreation of the object not on the existing one durirng when you are updateing the existing one
        //      if(!["male","female","others"].includes(value)){
        //          throw new Error("Gender data is not valid");
        //      }
        // },
    },
    
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

userschema.methods.getJWT= async function (){

    const user = this;//for perticular instance that is perticular user
     const token = await jwt.sign({ _id: user._id },"Rajesh@2004",{expiresIn:"1h"});
     return token;
    };

userschema.methods.validatePassword = async function (passwordInputByUser){

    const user=this;
    const passwordHash=user.password
    const ispasswardvalid = await bcrypt.compare(passwordInputByUser,passwordHash); //(password,hashedpassword)
  return ispasswardvalid;
    
};

const Usermodel =mongoose.model("User" ,userschema);
 module.exports=Usermodel;