import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createExpanseData, getExpanseData } from "./controller/ExpanseController.js";
import { registerUsers, userLogin } from "./controller/AuthenticationController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://localhost:5173",
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],

  credentials: true
}));

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.get("/health", (_, res) => res.status(200).send("ok")); 

//create transaction
app.post("/txHistory", createExpanseData);
app.get("/txHistory/:userId", getExpanseData);

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
