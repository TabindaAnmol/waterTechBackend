const references = require("../../References/customReferences.js");
const propertySchema = references.mongoose.Schema(
  {
    status: { type: Number, default: 0 },
    address: String,
    country: String,
    city: String,
    state: String,
    zipcode: String,
    noOfLines: { type: Number, default: 0 },
    approvedDate: { type: Date, default: null },
    certificate: { type: String, default: null },
    propertyOwnerId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "propertyOwners",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
propertySchema.virtual('lines', {
  ref: 'lines',
  localField: '_id',
  foreignField: 'propertyId',
});

propertySchema.set("toObject", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});
propertySchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});
module.exports = propertySchema;
