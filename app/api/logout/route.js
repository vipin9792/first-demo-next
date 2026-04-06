export async function POST() {
  // Future me token blacklist / session destroy kar sakte ho

  return Response.json({
    success: true,
    message: "Logged out successfully ✅"
  });
}