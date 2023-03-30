import mongoose from "mongoose";

const { Schema, model } = mongoose;

const founderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: Date,
  },
  { collection: "founder" }
);

const FounderModel = mongoose.models.Founder || model("Founder", founderSchema);
export default FounderModel;
