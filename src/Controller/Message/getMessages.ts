import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";
import { authPreHandler } from "../../Server/authPreHandler";

const QuerySchema = z.object({
  group: z.string().uuid(),
});

export const getMessages = (app: FastifyInstance) =>
  app.route({
    method: "GET",
    url: "/",
    preHandler: authPreHandler,
    handler: async (request, reply) => {
      const validation = await QuerySchema.safeParseAsync(request.query);
      if (!validation.success)
        return reply.status(400).send({ error: validation.error });

      const query = validation.data;

      const groupExists = await prismaClient.group.findFirst({
        where: {
          id: query.group,
        },
      });

      if (!groupExists)
        return reply.code(400).send({ error: "Group does not exist" });

      const messages = await prismaClient.message.findMany({
        where: {
          groupId: query.group,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return reply.send({ messages });
    },
  });
