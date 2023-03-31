import mongoose from "mongoose";

const { ObjectId } = mongoose.mongo;
const sanitizeFounderObject = (founder) => {
  return {
    name: founder.name,
    title: founder.title,
    company: new ObjectId(founder.companyId),
  };
};

const toFounderObject = (founderDocument) => {
  return {
    id: founderDocument._id.toHexString(),
    name: founderDocument.name,
    title: founderDocument.title,
  };
};

const find = (FounderModel) => {
  /**
   * @param {string} [companyId] Filter founders that are associated to the company.
   * @returns {Founder[]}
   */
  return async (companyId) => {
    try {
      const query = {};
      if (companyId) query.company = new ObjectId(companyId);
      return (await FounderModel.find(query).sort({ name: 1 }).exec()).map(
        toFounderObject
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};
const insert = (FounderModel) => async (data) => {
  try {
    const result = await FounderModel.create(sanitizeFounderObject(data));
    return toFounderObject(result);
  } catch (err) {
    switch (err.code) {
      case 11000:
        throw new Error("Founder already exists");
      default:
        throw err;
    }
  }
};

export default (FounderModel) => {
  return {
    find: find(FounderModel),
    insert: insert(FounderModel),
  };
};
