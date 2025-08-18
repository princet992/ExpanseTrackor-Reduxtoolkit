import { AuthenticationModel } from "../model/AuthenticationModel.js";
import jwt from "jsonwebtoken";

export const registerUsers = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await AuthenticationModel.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "user with this email is already exists" });
    }
    const data = await AuthenticationModel.create({
      userName,
      email,
      password,
    });
    if (data) res.status(200).send({ message: "registerd successfully", data });
    else res.status(400).send({ message: "failed to register" });
  } catch (error) {
    console.log("error", error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthenticationModel.findOne({
      email,
      password,
    });
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN);
      res.status(200).json({
        message: "login successfull",
        email: user.email,
        userName: user.userName,
        token,
        userId: user._id,
      });
    } else {
      res.status(400).send({ message: "Wrong email password" });
    }
  } catch (error) {
    console.log("error", error.message);
  }
};
