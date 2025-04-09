import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const Token = mongoose.model("token", tokenSchema);
