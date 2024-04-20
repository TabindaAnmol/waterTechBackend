const references = require("../../References/customReferences");
const cartSchema = references.mongoose.Schema(
  {
    productId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    plumberId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "plumbers",
    },
    orderId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      default:null,
    },
    totalPrice: { type: Number},
    quantity: { type: Number, default: 1 },
    isPurchased: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = cartSchema;
