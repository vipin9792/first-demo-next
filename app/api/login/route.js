import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email & Password required ❌" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found ❌" },
        { status: 404 }
      );
    }

    // ✅ PASSWORD MATCH
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid password ❌" },
        { status: 401 }
      );
    }

    // ✅ JWT
    const token = generateToken(user);

    return Response.json({
      success: true,
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Login Error:", error);

    return Response.json(
      { success: false, message: "Server error ❌" },
      { status: 500 }
    );
  }
}