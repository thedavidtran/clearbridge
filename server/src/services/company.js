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

const insert = (CompanyModel) => async (data) => {
  try {
    await CompanyModel.create(data);
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
    console.log(err);
  }
};

const deleteOne = (CompanyModel) => async (id) => {
  try {
    const company = await CompanyModel.findByIdAndRemove(id);
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
  };
};
