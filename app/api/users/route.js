import User from "@app/models/user";
import { connectToDB } from "@app/mongodb";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const allUsers = await User.find();

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (err) {
    return new Response("Failed to get all users", { status: 500 });
  }
};
