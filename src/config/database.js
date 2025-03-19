const mongoose = require("mongoose");
const connectDB = async()=>
{
     await mongoose.connect(
       // "mongodb+srv://firstweb:GSQ9fjFvs6nsvKya@firstweb.9iplm.mongodb.net/FirstDatabase"
     );
};
 
module.exports=connectDB;
