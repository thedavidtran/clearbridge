import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
    },
    founded: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: Date,
  },
  { collection: "company" }
);

companySchema.pre("deleteOne", async function (next) {
  const companyId = this.getQuery()["_id"];
  await mongoose.models.Founder.deleteMany({
    company: companyId,
  });
  next();
});

const CompanyModel = mongoose.models.Company || model("Company", companySchema);
export default CompanyModel;
