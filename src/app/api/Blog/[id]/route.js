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

  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());

    if (formData.has("cover")) {
      // Optional: handle image upload, for example, saving to cloud storage
      const cover = formData.get("cover");
      // Process cover if it's a new file, e.g., save it and update the path in the payload
      payload.cover = cover; // Set cover URL or file path
    }

    await mongoose.connect(blogconnectionstr);
    const result = await BlogData.findOneAndUpdate(filter, payload, {
      new: true,
    });

    return result
      ? NextResponse.json({ result, success: true })
      : NextResponse.json({ success: false, message: "Update failed" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, message: "Update error" });
  }
}

export async function DELETE(request, content) {
  const Id = content.params.id;
  const record = { _id: Id };

  await mongoose.connect(blogconnectionstr);
  const result = await BlogData.deleteOne(record);

  return NextResponse.json({ result, success: true });
}
