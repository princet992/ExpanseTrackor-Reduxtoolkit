import { AuthenticationModel } from "../model/AuthenticationModel.js";
import { ExpanseModel } from "../model/ExpanseModel.js";

export const createExpanseData = async (req, res) => {
  try {
    const { description, amount, types, userId } = req.body;
    const id = await AuthenticationModel.findById(userId);
    if (!id) res.status(400).send({ message: "user not found" });
    const data = await ExpanseModel.create({
      description,
      amount,
      types,
      userId,
    });
    if (data) res.status(200).send({ message: "transaction successfull", data });
    else res.status(400).send({ message: "transaction failed" });
  } catch (error) {
    console.log("error", error.message);
  }
};

export const getExpanseData = async (req, res) => {
  try {
    const data = await ExpanseModel.find().populate("userId");
    res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
  }
};
