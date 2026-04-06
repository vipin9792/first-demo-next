export async function GET() {
  const data = {
    title: "Welcome to MyApp",
    description: "This data is coming from API 🚀",
    features: ["Fast", "Responsive", "Easy"]
  };

  return Response.json(data);
}