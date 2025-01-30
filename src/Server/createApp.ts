import { fastify } from "fastify";
import { userRouter } from "../Controller/User/userRouter";
import { groupRouter } from "../Controller/Group/groupRouter";
import { messageRouter } from "../Controller/Message/messageRouter";

export const createApp = async () => {
  const app = fastify();

  app.register(userRouter, { prefix: "users" });
  app.register(groupRouter, { prefix: "groups" });
  app.register(messageRouter, { prefix: "messages" });

  await app.listen({
    port: 3030,
  });

  console.log("Server running on port 3030 🚀");
};
