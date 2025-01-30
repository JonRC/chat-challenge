import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";
import { authPreHandler } from "../../Server/authPreHandler";

const ParamsSchema = z.object({
  messageId: z.string().uuid(),
});

export const deleteMessagesId = (app: FastifyInstance) =>
  app.route({
    method: "DELETE",
    url: "/:messageId",
    preHandler: authPreHandler,
    handler: async (request, reply) => {
      const validation = await ParamsSchema.safeParseAsync(request.params);
      if (!validation.success)
        return reply.status(400).send({ error: validation.error });

      const params = validation.data;

      const userId = request.user.id;

      const messageExists = await prismaClient.message.findFirst({
        where: {
          id: params.messageId,
          userId,
        },
      });

      if (!messageExists)
        return reply.code(400).send({ error: "Message does not exist" });

      await prismaClient.message.delete({
        where: {
          id: params.messageId,
          userId,
        },
      });

      return reply.code(204).send();
    },
  });
