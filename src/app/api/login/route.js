import { connectionstr } from "@/app/util/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { RegisterData } from "@/app/util/model/schema";

export async function POST(request) {
  await mongoose.connect(connectionstr);
  const payload = await request.json();

  const user = await RegisterData.findOne({ email: payload.email });

  if (!user) {
    return NextResponse.json({ message: "User not found!" }, { status: 400 });
  }

  return NextResponse.json({ message: "Login successful!", user });
}
