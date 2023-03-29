import CompanyService from "../services/company.js";
import CompanyModel from "../model/company.js";

const companyService = CompanyService(CompanyModel);

const companySchema = {
  $id: "company",
  type: "object",
  required: ["name", "location", "description"],
  properties: {
    id: {
      type: "string",
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
    founded: {
      type: "string",
    },
  },
};

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
      let companies = await companyService.find();
      reply.send(companies);
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
                type: "string",
              },
              name: {
                type: "string",
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const company = { ...request.body };
      const result = await companyService.insert(company);
      reply.send(result);
    }
  );
  fastify.get(
    "/:id",
    {
      schema: {
        response: {
          "2xx": {
            type: "object",
            $ref: "company",
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const company = await companyService.findOne(id);
      if (!company) {
        const error = new Error(`Company not found: ${id}`);
        error.status = 404;
        reply.send(error);
      }
      reply.send(company);
    }
  );
  fastify.delete("/:companyId", async (request, reply) => {
    const { companyId } = request.params;
    if (!companyId) {
      const error = new Error(`Invalid company id: ${companyId}`);
      error.status = 400;
      reply.send(error);
    }
    try {
      const company = await companyService.deleteOne(companyId);
      reply.send(company);
    } catch (err) {
      const error = new Error(`Error removing company id: ${companyId}`);
      error.status = 404;
      reply.send(error);
    }
  });
  fastify.patch(
    "/:companyId",
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
                type: "string",
              },
              name: {
                type: "string",
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { companyId } = request.params;
      if (!companyId) {
        const error = new Error(`Invalid company id: ${companyId}`);
        error.status = 400;
        reply.send(error);
      }
      const company = { ...request.body };
      try {
        const previous = await companyService.update(companyId, company);
        reply.send(previous);
      } catch (err) {
        const error = new Error(`Failed to update company id: ${companyId}`);
        error.status = 500;
        reply.send(error);
      }
    }
  );
};

export const autoPrefix = "/companies";
