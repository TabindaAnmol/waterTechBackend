const references = require("../../References/customReferences.js");
const jobSchema = references.mongoose.Schema(
  {
    jobStatus: { type: String, default: "requested" }, //(requested,accepted,completed,cancelled)
    date: String,
    time: String,
    jobInstructions: String,
    jobImages: { type: Array, default: [] },
    propertyId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
    plumberId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "plumbers",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = jobSchema;
