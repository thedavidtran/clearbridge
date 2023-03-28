const companySchema = {
  $id: "company",
  type: "object",
  required: ["name", "location", "description"],
  properties: {
    id: {
      type: "number",
    },
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
};

// TODO: Remove once persistence implemented
const mockData = [
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
];

export default async (fastify) => {
  fastify.addSchema(companySchema);
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
      reply.send(mockData);
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
        response: {
          "2xx": {
            type: "object",
            properties: {
              id: {
                type: "number",
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const company = { ...request.body };
      company.id = mockData.length + 1;
      mockData.push(company);
      reply.send({ id: company.id, name: company.name });
    }
  );
};

export const autoPrefix = "/companies";
