import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const Users = new Schema(
  {
    fullname: {
      type: String,
      reuired: true,
    },
    age: {
      required: true,
      type: Number,
      default: 18,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 70,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    confirmpassword: {
      type: String,
      minLength: 8,
      required: true,
    },
    admin: {
      default: false,
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

export default models.Users || mongoose.model("Users", Users);
