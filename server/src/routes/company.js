export default async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          "2xx": {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                location: {
                  type: "object",
                  properties: {
                    city: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                  },
                },
              },
            },
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
          required: ["name", "location", "description"],
          properties: {
            name: { type: "string" },
            location: {
              type: "object",
              required: ["city", "state"],
              properties: {
                city: { type: "string" },
                state: { type: "string" },
              },
            },
            description: {
              type: "string",
            },
            founded: {
              type: "string",
            },
          },
        },
      },
    },
    async (request, reply) => {
      console.log(request.body);
    }
  );
};

export const autoPrefix = "/companies";
