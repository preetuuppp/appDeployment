const express = require("express");
const { connectDB } = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { noteRouter } = require("./Routes/notesRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Hello Developer!" });
});
app.use("/users", userRouter);
app.use("/notes", noteRouter);
connectDB().then(() => {
  app.listen(5050, async () => {
    try {
      console.log("server is running at port 5050");
    } catch (err) {
      console.log(err);
      console.log("Something Went Wrong!!");
    }
  });
});
