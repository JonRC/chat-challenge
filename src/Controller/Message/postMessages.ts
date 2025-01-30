import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";
import { authPreHandler } from "../../Server/authPreHandler";

const BodySchema = z.object({
  content: z.string().min(1),
  groupId: z.string().uuid(),
});

export const postMessages = (app: FastifyInstance) =>
  app.route({
    method: "POST",
    url: "/",
    preHandler: authPreHandler,
    handler: async (request, reply) => {
      const validation = await BodySchema.safeParseAsync(request.body);
      if (!validation.success)
        return reply.status(400).send({ error: validation.error });

      const body = validation.data;

      const userId = request.user.id;

      const groupExists = await prismaClient.group.findFirst({
        where: {
          id: body.groupId,
        },
      });

      if (!groupExists)
        return reply.status(400).send({ error: "Group does not exist" });

      const message = await prismaClient.message.create({
        data: {
          userId,
          content: body.content,
          groupId: body.groupId,
        },
      });

      return { message };
    },
  });
