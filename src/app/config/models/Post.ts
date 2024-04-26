import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("post", PostSchema);

export default Post;
