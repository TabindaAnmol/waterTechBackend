const references = require("../../References/customReferences");
const plumberSchema = references.mongoose.Schema(
  {
    status: { type: Number, default: 0 },
    businessName: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    licencesNo: { type: String, default: null },
    masterPlumber: { type: String, default: 'No' },
    number: String,
    address: { type: String, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
    zipCode: { type: String, default: null },
    country: { type: String, default: null },
    noOfTrucks: { type: Number, default: 0 },
    residentalWorkEffort: { type: Number, default: 0 },
    commercialWorkEffort: { type: Number, default: 0 },
    profileImage: { type: String, default: null },
    countiesCovered: { type: Number, default: null },
    referalName: { type: String, default: null },
    licences: { type: String, default: null },
    // "fcmToken":{type:String,default:null},
    // "walletBalance":{type:Number,default:0},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
plumberSchema.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it has been modified or is new
  // if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await references.bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await references.bcrypt.hash(user.password, salt);

    // Replace the plain password with the hashed password
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
module.exports = plumberSchema;
