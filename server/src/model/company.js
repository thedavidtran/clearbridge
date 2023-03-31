import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      state: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5,
      },
    },
    founded: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
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

// Indexes
companySchema.index({ name: 1 });

// Hooks
companySchema.pre("deleteOne", async function (next) {
  const companyId = this.getQuery()["_id"];
  await mongoose.models.Founder.deleteMany({
    company: companyId,
  });
  next();
});

const CompanyModel = mongoose.models.Company || model("Company", companySchema);
export default CompanyModel;
