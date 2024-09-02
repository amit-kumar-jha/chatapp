import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  {
    cluster: "ap2",
  }
);

// console.log("Pusher App ID:", process.env.NEXT_PUBLIC_PUSHER_APP_ID);
// console.log("Pusher App Key:", process.env.NEXT_PUBLIC_PUSHER_APP_KEY);
// console.log("Pusher Secret:", process.env.NEXT_PUBLIC_PUSHER_SECRET);
