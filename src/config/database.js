const mongoose = require("mongoose");
const connectDB = async()=>
{
     await mongoose.connect(
        "mongodb+srv://firstweb:DwqjgR7jfh0h60sn@firstweb.9iplm.mongodb.net/"
     );
};
 
module.exports=connectDB;
