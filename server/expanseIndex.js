import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createExpanseData, getExpanseData, removeExpanseData } from "./controller/ExpanseController.js";
import { registerUsers, userLogin } from "./controller/AuthenticationController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

//test
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

//create transaction
app.post("/txHistory", createExpanseData);
app.get("/txHistory/:userId", getExpanseData);
app.delete("/txHistory/:id", removeExpanseData);

//user Authentication
app.post("/usersAuth", registerUsers);

//loignUser
app.post("/loginAuth", userLogin);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("dataBase connected");
    app.listen(process.env.PORT, () => {
      console.log(`server running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error.message);
  });
