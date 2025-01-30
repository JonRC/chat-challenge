import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";
import { authPreHandler } from "../../Server/authPreHandler";

const BodySchema = z.object({
  content: z.string().min(1),
});

const ParamsSchema = z.object({
  messageId: z.string().uuid(),
});

export const putMessagesId = (app: FastifyInstance) =>
  app.route({
    method: "PUT",
    url: "/:messageId",
    preHandler: authPreHandler,
    handler: async (request, reply) => {
      const bodyValidation = await BodySchema.safeParseAsync(request.body);
      const paramsValidation = await ParamsSchema.safeParseAsync(
        request.params
      );
      if (!bodyValidation.success || !paramsValidation.success)
        return reply
          .status(400)
          .send(
            bodyValidation.error
              ? { error: bodyValidation.error }
              : { error: paramsValidation.error }
          );

      const body = bodyValidation.data;
      const params = paramsValidation.data;

      const userId = request.user.id;

      const messageExists = await prismaClient.message.findFirst({
        where: {
          id: params.messageId,
        },
      });

      if (!messageExists)
        return reply.status(404).send({ error: "Message not found" });

      const message = await prismaClient.message.update({
        where: {
          id: params.messageId,
          userId: userId,
        },
        data: {
          content: body.content,
        },
      });

      return { message };
    },
  });
