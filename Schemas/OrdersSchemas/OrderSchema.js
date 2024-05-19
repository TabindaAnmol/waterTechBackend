const references = require("../../References/customReferences");
const orderSchema = references.mongoose.Schema(
  {
    plumberId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "plumbers",
    },
    totalAmount: { type: Number },
    subtotalAmount: { type: Number },
    shippingAddress: { type: String, default: null },
    status: { type: String, default: "ongoing" },
    isRefunded: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
orderSchema.virtual("cartItems", {
  ref: "carts",
  localField: "_id",
  foreignField: "orderId",
});

orderSchema.set("toObject", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});
orderSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});
module.exports = orderSchema;
