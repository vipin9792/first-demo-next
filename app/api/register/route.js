import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // check user exists
    const exist = await User.findOne({ email });

    if (exist) {
      return Response.json({
        success: false,
        message: "User already exists ❌"
      });
    }

    // save new user
    const user = new User({ email, password });
    await user.save();

    return Response.json({
      success: true,
      message: "Registered successfully ✅"
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Error registering ❌"
    });
  }
}