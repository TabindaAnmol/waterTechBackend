const references = require("../../References/customReferences.js");
const notificationSchema = references.mongoose.Schema({
  "title": String,
  "body": String,
  plumberId: {
    type: references.mongoose.Schema.Types.ObjectId,
    ref: "plumbers",
  },
  propertyOwnerId: {
    type: references.mongoose.Schema.Types.ObjectId,
    ref: "propertyOwners",
  },
  
}, {
  // timestamps: true ,
  timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
});
module.exports = notificationSchema;
