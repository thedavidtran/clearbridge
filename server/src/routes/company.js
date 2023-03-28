export default async (fastify) => {
  fastify.addSchema({
    $id: "company",
    type: "object",
    required: ["name", "location", "description"],
    properties: {
      name: {
        type: "string",
        maxLength: 30,
      },
      location: {
        type: "object",
        required: ["city", "state"],
        properties: {
          city: {
            type: "string",
            maxLength: 50,
          },
          state: {
            type: "string",
            maxLength: 5,
          },
        },
      },
      description: {
        type: "string",
        maxLength: 500,
      },
    },
  });
  fastify.get(
    "/",
    {
      schema: {
        response: {
          "2xx": {
            type: "array",
            items: { $ref: "company" },
          },
        },
      },
    },
    async (request, reply) => {
      reply.send([
        {
          name: "Company A",
          location: { city: "Denver", state: "CO" },
          description: "description about company a",
          id: 1,
        },
        {
          name: "Company B",
          location: { city: "San Francisco", state: "CA" },
          description: "description about company b",
          id: 2,
        },
      ]);
    }
  );
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          $ref: "company",
        },
      },
    },
    async (request, reply) => {
      console.log(request.body);
    }
  );
};

export const autoPrefix = "/companies";
