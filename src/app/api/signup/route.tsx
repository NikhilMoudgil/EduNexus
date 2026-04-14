import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // 1. Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create the user in Supabase
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: { email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}