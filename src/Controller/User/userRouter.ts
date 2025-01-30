import { FastifyInstance } from "fastify";
import { postUsers } from "./postUsers";

export const userRouter = (app: FastifyInstance) => {
  app.post("/", postUsers);
};
