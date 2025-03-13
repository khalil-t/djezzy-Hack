import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String }, // Optional image URL
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    wilaya: { type: String, required: true }, 
    contact: { type: String, required: true },
  },
  
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
