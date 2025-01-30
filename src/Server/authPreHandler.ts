import { RouteHandler } from "fastify";
import { prismaClient } from "../Service/prismaClient";
import { User } from "@prisma/client";

export const authPreHandler: RouteHandler = async (request, reply) => {
  const username = request.headers["authorization"];
  if (!username || typeof username !== "string")
    return reply.status(401).send({ error: "Unauthorized" });

  const user = await prismaClient.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) return reply.status(401).send({ error: "Unauthorized" });

  request.user = user;
};

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}
