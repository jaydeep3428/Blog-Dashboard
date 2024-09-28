import mongoose from "mongoose";

const blogdata = new mongoose.Schema({
  title: String,
  description: String,
  prompt: String,
  content: String,
  category: String,
  cover: String,
  tags: String,
  metatitle: String,
  metadescription: String,
});

export const BlogData =
  mongoose.models.BlogData || mongoose.model("BlogData", blogdata);
