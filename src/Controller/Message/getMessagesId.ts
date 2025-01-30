import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";
import { authPreHandler } from "../../Server/authPreHandler";

const ParamsSchema = z.object({
  messageId: z.string().uuid(),
});

export const getMessagesId = (app: FastifyInstance) =>
  app.route({
    method: "GET",
    url: "/:messageId",
    preHandler: authPreHandler,
    handler: async (request, reply) => {
      const paramsValidation = await ParamsSchema.safeParseAsync(
        request.params
      );
      if (!paramsValidation.success)
        return reply.status(400).send({ error: paramsValidation.error });

      const params = paramsValidation.data;

      const userId = request.user.id;

      const message = await prismaClient.message.findFirst({
        where: {
          id: params.messageId,
          userId: userId,
        },
      });

      if (!message)
        return reply.status(404).send({ error: "Message not found" });

      return { message };
    },
  });
