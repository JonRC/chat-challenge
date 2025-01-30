import { FastifyInstance } from "fastify";
import { postMessages } from "./postMessages";
import { putMessagesId } from "./putMessagesId";
import { deleteMessagesId } from "./deleteMessagesId";
import { getMessagesId } from "./getMessagesId";
import { getMessages } from "./getMessages";

export const messageRouter = (app: FastifyInstance) => {
  app.register(postMessages);
  app.register(deleteMessagesId);
  app.register(getMessages);
  app.register(getMessagesId);
  app.register(putMessagesId);
};
