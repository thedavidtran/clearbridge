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
  console.log(companyDocument);
  const c = {
    name: companyDocument.name,
    location: companyDocument.location,
    description: companyDocument.description,
    id: companyDocument._id.toHexString(),
    founded: companyDocument.founded,
  };
  return c;
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

export default (CompanyModel) => {
  return {
    find: find(CompanyModel),
    findOne: findOne(CompanyModel),
    insert: insert(CompanyModel),
  };
};
