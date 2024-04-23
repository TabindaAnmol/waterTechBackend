const references = require("../../References/customReferences.js");
const notificationSchema = references.mongoose.Schema(
  {
    title: String,
    message: String,
    plumberId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "plumbers",
      required: false,
    },
    propertyOwnerId: {
      type: references.mongoose.Schema.Types.ObjectId,
      ref: "propertyOwners",
      required: false,
    },
  },
  {
    // timestamps: true ,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = notificationSchema;
