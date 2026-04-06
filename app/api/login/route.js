import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email, password });

  if (!user) {
    return Response.json({
      success: false,
      message: "Invalid credentials ❌"
    });
  }

  // 🔥 JWT generate
  const token = generateToken(user);

  return Response.json({
    success: true,
    token
  });
}