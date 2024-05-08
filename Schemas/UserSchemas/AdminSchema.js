const references = require("../../References/customReferences");
const adminSchema = references.mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    isSuperAdmin: { type: Boolean,default:false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = adminSchema;
