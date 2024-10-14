import { blogconnectionstr } from "@/app/util/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { BlogData } from "@/app/util/model/blogschema";

export async function GET(request, content) {
  const Id = content.params.id;
  const record = { _id: Id };

  await mongoose.connect(blogconnectionstr);
  const result = await BlogData.findById(record);

  return NextResponse.json({ result, success: true });
}

export async function PUT(request, content) {
  const Id = content.params.id;
  const filter = { _id: Id };
  const payload = await request.json();

  console.log("Received payload for update:", payload);

  await mongoose.connect(blogconnectionstr);
  const result = await BlogData.findOneAndUpdate(filter, payload, {
    new: true,
  });
  console.log(result);

  if (result) {
    return NextResponse.json({ result, success: true });
  } else {
    return NextResponse.json({ success: false, message: "Update failed" });
  }
}

export async function DELETE(request, content) {
  const Id = content.params.id;
  const record = { _id: Id };

  await mongoose.connect(blogconnectionstr);
  const result = await BlogData.deleteOne(record);

  return NextResponse.json({ result, success: true });
}
