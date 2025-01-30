import { RouteHandler } from "fastify";
import { prismaClient } from "../../Service/prismaClient";
import z from "zod";

const BodySchema = z.object({
  username: z.string(),
});

export const postUsers: RouteHandler = async (request, reply) => {
  const validation = await BodySchema.safeParseAsync(request.body);
  if (!validation.success)
    return reply.status(400).send({ error: validation.error });

  const body = validation.data;

  const userAlreadyExists = await prismaClient.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (userAlreadyExists)
    return reply.status(400).send({ error: "User already exists" });

  const user = await prismaClient.user.create({
    data: {
      username: body.username,
    },
  });

  return { user };
};
