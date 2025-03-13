import mongoose from "mongoose";

const mapSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    rerouteLink: { type: String }, 
  },
  { timestamps: true }
);

const Map = mongoose.model("Map", mapSchema);
export default Map;
