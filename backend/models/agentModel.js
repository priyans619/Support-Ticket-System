import mongoose from "mongoose";

const agentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email:
    {
      type: String,
      required: true,
      unique: true
    },
    phone:
    {
      type: String,
      required: true
    },
    description:
    {
      type: String,
      required: true
    }
  });


export const Agent = mongoose.model('Agent', agentSchema);