import { FastifyInstance } from "fastify";
import { postGroups } from "./postGroups";
import { getGroups } from "./getGroups";

export const groupRouter = (app: FastifyInstance) => {
  app.post("/", postGroups);
  app.get("/", getGroups);
};
