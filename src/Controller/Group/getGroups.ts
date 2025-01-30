import { RouteHandler } from "fastify";
import z from "zod";
import { prismaClient } from "../../Service/prismaClient";

export const getGroups: RouteHandler = async (request, reply) => {
  const groups = await prismaClient.group.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return { groups };
};
