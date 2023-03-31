import mongoose from "mongoose";

const { Schema, model } = mongoose;

const founderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
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

// Indexes
founderSchema.index({ name: 1 });
founderSchema.index({ company: 1, name: 1 });

const FounderModel = mongoose.models.Founder || model("Founder", founderSchema);
export default FounderModel;
