import { RouteHandler } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";

const bodySchema = z.object({
  name: z.string().min(3),
});

export const postGroups: RouteHandler = async (request, reply) => {
  const validation = await bodySchema.safeParse(request.body);
  if (!validation.success)
    return reply.status(400).send({ error: validation.error });

  const body = validation.data;

  const alreadyExists = await prismaClient.group.findFirst({
    where: {
      name: body.name,
    },
  });

  if (alreadyExists)
    return reply.status(400).send({ error: "Group already exists" });

  const group = await prismaClient.group.create({
    data: {
      name: body.name,
    },
  });

  return { group };
};
