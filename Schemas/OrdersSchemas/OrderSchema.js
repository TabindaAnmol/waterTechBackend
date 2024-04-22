const references = require("../../References/customReferences");
const orderSchema = references.mongoose.Schema(
  {
    plumberId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "plumbers",
    },
    totalAmount: { type: Number},
    subtotalAmount: { type: Number},
    shippingAddress: { type: String, default: null },
    status: { type: String, default: 'ongoing' },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = orderSchema;
