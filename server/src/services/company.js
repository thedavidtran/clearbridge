import mongoose from "mongoose";

const { ObjectId } = mongoose.mongo;
const find = (CompanyModel) => async () => {
  try {
    let companies = await CompanyModel.find();
    // Transform document to objects containing only fields we want to expose.
    companies = companies.map(toCompanyObject);
    return companies;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const toCompanyObject = (companyDocument) => {
  return {
    name: companyDocument.name,
    location: companyDocument.location,
    description: companyDocument.description,
    id: companyDocument._id.toHexString(),
    founded: companyDocument.founded,
  };
};

const sanitizeCompanyObject = (company) => {
  return {
    name: company.name,
    location: company.location,
    description: company.description,
    founded: company.founded,
  };
};

const insert = (CompanyModel) => async (data) => {
  try {
    const result = await CompanyModel.create(sanitizeCompanyObject(data));
    return toCompanyObject(result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const findOne = (CompanyModel) => async (id) => {
  try {
    const company = await CompanyModel.findById(id);
    if (!company) return null;
    return toCompanyObject(company);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteOne = (CompanyModel) => async (id) => {
  try {
    const result = await CompanyModel.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) throw new Error("Company does not exist");
    return { id };
  } catch (err) {
    throw err;
  }
};

const update = (CompanyModel) => async (id, data) => {
  try {
    const company = await CompanyModel.findByIdAndUpdate(
      id,
      sanitizeCompanyObject(data)
    );
    if (!company) throw new Error("Company does not exist");
    return toCompanyObject(company);
  } catch (err) {
    throw err;
  }
};
export default (CompanyModel) => {
  return {
    find: find(CompanyModel),
    findOne: findOne(CompanyModel),
    insert: insert(CompanyModel),
    deleteOne: deleteOne(CompanyModel),
    update: update(CompanyModel),
  };
};
