const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);

connectDB()
  .then(() => {
    console.log("Database connection is established..");
    app.listen(3000, () => {
      console.log("Server is running on port 3000 !!");
    });
  })
  .catch((err) => {
    console.log("cannot be connected!!");
  });

// //get user by email
// app.get("/user", async (req, res) => {
//   const useremail = req.body.emailId;
//   try {
//     const user = await Usermodel.find({ emailId: useremail });
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("something wrong");
//   }
// });

// //delete a userby its id
// app.delete("/delete", async (req, res) => {
//   const userID = req.body.userID;
//   try {
//     const user = await Usermodel.findByIdAndDelete({ _id: userID });
//     // work as same
//     // const user = await Usermodel.findByIdAndDelete(userID);
//     res.send("user deketed successfully");
//   } catch (err) {
//     res.status(400).send("something wrong");
//   }
// });
// ///update we also use the update but here we are using patch which is use to update the one changein the collaction
// app.patch("/user/:userID", async (req, res) => {
//   const data = req.body;
//   const userID = req.params?.userID;

//   console.log(data);
//   try {
//     const allowedupdate = [
//       "Gender",
//       "age",
//       "about",
//       "password",
//       "skills",
//       "photoURL",
//     ];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       allowedupdate.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("skills can not be more then 10");
//     }

//     await Usermodel.findByIdAndUpdate({ _id: userID }, data, {
//       runValidators: true,
//     });
//     res.send("updated");
//   } catch (err) {
//     res.status(400).send("udpdate failed " + err.message);
//   }
// });

// //get user by emailid only one user
// app.get("/userone", async (req, res) => {
//   const useremail = req.body.emailId;
//   try {
//     const user = await Usermodel.findOne({ emailId: useremail });
//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("something wrong");
//   }
// });

// //feed api - get /feed -get all the users from the database
// app.get("/feed", async (req, res) => {
//   try {
//     const user = await Usermodel.find({});
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("something wrong");
//   }
// });
