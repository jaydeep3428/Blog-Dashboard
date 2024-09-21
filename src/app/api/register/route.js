import { connectionstr } from "@/app/util/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { RegisterData } from "@/app/util/model/schema";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connectionstr);
    data = await RegisterData.find();
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
  await mongoose.connect(connectionstr);

  let UserDataList = new RegisterData(payload);
  const result = await UserDataList.save();

  return NextResponse.json({ result, success });
}
