const references = require("../../References/customReferences.js");
const lineSchema = references.mongoose.Schema(
  {
    type: String,
    unitSize: String,
    bp: String,
    originalFee: String,
    newFee: String,
    savings: String,
    solutions: [{ type: String, default: '' }], // array of Strings containing solution 
    propertyId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = lineSchema;
