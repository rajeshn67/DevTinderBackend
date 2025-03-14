const mongoose = require("mongoose");
const connectDB = async()=>
{
     await mongoose.connect(
        "mongodb+srv://firstweb:DwqjgR7jfh0h60sn@firstweb.9iplm.mongodb.net/"
     );
};

module.exports ={connectDB };
connectDB().then(() =>
{
     console.log("Database connection is established..")
}).catch((err)=>{
     console.log("cannot be connected!!");
}
);