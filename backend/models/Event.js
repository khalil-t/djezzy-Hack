import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, 
    location: { type: String, required: true },
    pictures: [{ type: String }], 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: String }, 
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    requirements: [
      {
        type: { type: String, enum: ["Person", "Food", "Material"], required: true },
        name: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
