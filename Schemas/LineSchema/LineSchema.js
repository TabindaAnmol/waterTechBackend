const references = require("../../References/customReferences.js");
const lineSchema = references.mongoose.Schema(
  {
    propertyId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
    status: {
      //0 waiting for Approval/requested ,1 Approved,2 not Approved
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: null,
    },
    unitSize: {
      type: String,
      default: null,
    },
    bp: {
      type: String,
      default: null,
    },
    originalFee: {
      type: String,
      default: null,
    },
    newFee: {
      type: String,
      default: null,
    },
    savings: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    leaseRate: {
      type: String,
      default: null,
    },
    retainedSaving: {
      type: String,
      default: null,
    },
    comulativeSaving: {
      type: String,
      default: null,
    },
    payback: {
      type: String,
      default: null,
    },
    paybackInflowCash: {
      type: String,
      default: null,
    },

    solutions: [{ type: String, default: "" }], // array of objects containing solution
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = lineSchema;
