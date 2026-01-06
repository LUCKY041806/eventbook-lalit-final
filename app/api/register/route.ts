// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name = "User" } = await request.json();

    const db = await getDb();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await users.insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      role: "user",
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
