import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    adresse: { type: String, required: true }, 
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], 
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
