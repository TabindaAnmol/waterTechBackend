const references=require("../../References/customReferences")
const propertyOwnerSchema=references.mongoose.Schema({
    "status":{type:Number,default:1},
    "businessName":String,
    "name":String,
    "email":String,
    "password":String,
    "address":String,
    "country":String,
    "city":String,
    "state":String,
    "phone":String,
    "zipcode":String,
    "totalProperties":{type:Number,default:0},
    "type":String, //Property Owner , Property Manager , Agent , Facility Manager ,Cost Savings Company 
    "portfolio":String,
    "profileImage":{type:String,default:null},
    // "fcmToken":{type:String,default:null},
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})
propertyOwnerSchema.virtual('properties', {
  ref: 'properties',
  localField: '_id',
  foreignField: 'propertyOwnerId',
});

propertyOwnerSchema.set("toObject", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});
propertyOwnerSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});
// Hash the password before saving
propertyOwnerSchema.pre('save', async function (next) {
    const user = this;
  
    // Hash the password only if it has been modified or is new
    // if (!user.isModified('password')) return next();
  
    try {
      const salt = await references.bcrypt.genSalt(10);
      const hashedPassword = await references.bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });
module.exports=propertyOwnerSchema;