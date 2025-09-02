const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

require("dotenv").config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // backend should know where the frontend is running
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");

const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");
app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);


const server = http.createServer(app);
initializeSocket(server);


connectDB()
  .then(() => {
    console.log("Database connection is established..");
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000 !!");
    });
  })
  .catch((err) => {
    console.log("cannot be connected!!");
  });

