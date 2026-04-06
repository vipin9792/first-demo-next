import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "All fields required ❌" },
        { status: 400 }
      );
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return Response.json(
        { success: false, message: "User already exists ❌" },
        { status: 409 }
      );
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    return Response.json({
      success: true,
      message: "Registered successfully ✅",
    });

  } catch (error) {
    console.log("Register Error:", error);

    return Response.json(
      { success: false, message: "Error registering ❌" },
      { status: 500 }
    );
  }
}