import { blogconnectionstr } from "@/app/util/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { BlogData } from "@/app/util/model/blogschema";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(blogconnectionstr);
    data = await BlogData.find();
    // console.log(data);
  } catch (error) {
    data = { result: "error" };
    success = false;
  }
  return NextResponse.json({ result: data, success });
}
export async function POST(request) {
  let success = true;
  const payload = await request.json();

  if (!payload.author) {
    return NextResponse.json({ error: "Author is required" }, { status: 400 });
  }

  await mongoose.connect(blogconnectionstr);

  let Bloglist = new BlogData(payload);
  const result = await Bloglist.save();

  return NextResponse.json({ result, success });
}
