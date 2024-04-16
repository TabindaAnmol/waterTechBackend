const references = require("../../References/customReferences");
const productSchema = references.mongoose.Schema(
  {
    categoryId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    title: String,
    description: String,
    price: { type: Number, default: 0 },
    productImage: { type: String, default: null },
    status: { type: String, default: "available" }, // available,notAvailable
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = productSchema;
