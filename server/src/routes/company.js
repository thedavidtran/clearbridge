export default async (fastify) => {
  fastify.get("/", async (request, reply) => {
    reply.send([
      { name: "Company A", id: 1 },
      { name: "Company B", id: 2 },
    ]);
  });
};

export const autoPrefix = "/companies";
