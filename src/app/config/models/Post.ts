import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const PostSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

const Post = mongoose.models.post || mongoose.model("post", PostSchema);

export default Post;
