import FounderService from "../services/founder.js";
import FounderModel from "../model/founder.js";

const founderService = FounderService(FounderModel);

const founderSchema = {
  $id: "founder",
  type: "object",
  required: ["name", "title"],
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
      maxLength: 50,
    },
    title: {
      type: "string",
      maxLength: 20,
    },
    companyId: {
      type: "string",
      minLength: 24, // Must be able to convert to a mongoose.mongo.ObjectId from a hex string.
      maxLength: 24,
    },
  },
};

export default async (fastify) => {
  fastify.addSchema(founderSchema);

  fastify.get(
    "/",
    {
      schema: {
        querystring: {
          companyId: { type: "string" },
        },
        response: {
          "2xx": {
            type: "array",
            items: { $ref: "founder" },
          },
        },
      },
    },
    async (request, reply) => {
      const { companyId } = request.query;
      let companies = await founderService.find(companyId);
      console.log(companies);
      reply.send(companies);
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          $ref: "founder",
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
      const founder = { ...request.body };
      console.log(founder);
      const result = await founderService.insert(founder);
      console.log("result after insertion:", result);
      // reply.send(result);
    }
  );
};

export const autoPrefix = "/founders";
