import User from "@app/models/user";
import { connectToDB } from "@app/mongodb";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;

    const body = await req.json();

    const { username, profileImage } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        profileImage,
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    return new Response("Failed to update user", { status: 500 });
  }
};
