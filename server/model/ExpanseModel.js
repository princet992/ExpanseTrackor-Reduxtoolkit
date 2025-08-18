import mongoose from "mongoose";

const expanseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    types: {
      type: String,
      required: true,
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userAuth",
    },
  },
  { timestamps: true }
);

export const ExpanseModel = new mongoose.model("expanseHistory", expanseSchema);
