import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { verifyToken } from "@/lib/jwt";

// 🔐 Helper
const checkAuth = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  return verifyToken(token);
};

// ✅ CREATE (POST)  🔥 FIX
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newContact = new Contact(body);
    await newContact.save();

    return Response.json({
      success: true,
      message: "Data saved ✅"
    });

  } catch (err) {
    return Response.json({
      success: false,
      message: "Error ❌"
    });
  }
}

// ✅ READ (GET)
export async function GET(req) {
  const user = checkAuth(req);

  if (!user) {
    return Response.json({ success: false, message: "Unauthorized ❌" });
  }

  await connectDB();

  const data = await Contact.find();

  return Response.json({
    success: true,
    data
  });
}

// ✅ UPDATE (PUT)
export async function PUT(req) {
  const user = checkAuth(req);

  if (!user) {
    return Response.json({ success: false });
  }

  await connectDB();

  const { id, name, email, message } = await req.json();

  await Contact.findByIdAndUpdate(id, { name, email, message });

  return Response.json({ success: true });
}

// ✅ DELETE
export async function DELETE(req) {
  const user = checkAuth(req);

  if (!user) {
    return Response.json({ success: false });
  }

  await connectDB();

  const { id } = await req.json();

  await Contact.findByIdAndDelete(id);

  return Response.json({ success: true });
}