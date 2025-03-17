const express = require("express");
const connectDB = require("./config/database");
const app = express();
const Usermodel = require("./models/user");
const { validatesignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //validation of the data
    validatesignUpData(req);
    //extracting the fields here
    const { firstname, lastname, emailId, password } = req.body;
    //encript the password
    const passwordHash = await bcrypt.hash(password, 10); //salt round 10
    console.log(passwordHash);
    //create a new instance of the user model
    const user = new Usermodel({
      firstname,
      lastname,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
//login checking for email and password
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await Usermodel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const ispasswardvalid = await bcrypt.compare(password, user.password); //(password,hashedpassword)
    if (ispasswardvalid) {
      //create a JWT token here
      const token = jwt.sign({ /*hide the user id*/ _id: user._id }, /*secretekey*/ "Rajesh@2004",{expiresIn:"1h"}); //we pun this if we want to expire in some timeperiod{ expiresIn: "1h" }
      // console.log(token);

      //add the token to cookie and send the response back to the user

      res.cookie("token", token, { expires: new Date(Date.now() + 1*3600000)});
      res.send("Login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.post("/sendconnectionrequest",userAuth ,async(req,res)=>
{
   const user= req.user;
  //sending a connectin request to the user
  console.log("sending connection request");
  res.send( user.firstname+" sent the connect request");
});

//get user by email
app.get("/user", async (req, res) => {
  const useremail = req.body.emailId;
  try {
    const user = await Usermodel.find({ emailId: useremail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something wrong");
  }
});

//delete a userby its id
app.delete("/delete", async (req, res) => {
  const userID = req.body.userID;
  try {
    const user = await Usermodel.findByIdAndDelete({ _id: userID });
    // work as same
    // const user = await Usermodel.findByIdAndDelete(userID);
    res.send("user deketed successfully");
  } catch (err) {
    res.status(400).send("something wrong");
  }
});
///update we also use the update but here we are using patch which is use to update the one changein the collaction
app.patch("/user/:userID", async (req, res) => {
  const data = req.body;
  const userID = req.params?.userID;

  console.log(data);
  try {
    const allowedupdate = [
      "Gender",
      "age",
      "about",
      "password",
      "skills",
      "photoURL",
    ];
    //     "firstname": "bhushan",
    //     "lastname": "musk",
    //     "emailId": "ddfbgsgnsdi@gmail.com",
    //     "password": "dsv",
    //     "age": 81,
    //     "Gender": "others",
    //     "about": "This is a default about",
    //   --> "xyz":"anfsinin",
    // "skills": [
    //      "java",
    //      "cpp",
    //      "php"
    //    ],

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedupdate.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills can not be more then 10");
    }

    await Usermodel.findByIdAndUpdate({ _id: userID }, data, {
      runValidators: true,
    });
    res.send("updated");
  } catch (err) {
    res.status(400).send("udpdate failed " + err.message);
  }
});

//get user by emailid only one user
app.get("/userone", async (req, res) => {
  const useremail = req.body.emailId;
  try {
    const user = await Usermodel.findOne({ emailId: useremail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something wrong");
  }
});

//feed api - get /feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const user = await Usermodel.find({});
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something wrong");
  }
});
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
