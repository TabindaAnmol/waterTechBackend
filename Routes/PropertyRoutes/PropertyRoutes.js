const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const PropertyController = require("../../Controllers/PropertyControllers/PropertyController");
const certificateUpload=require('../../Middlewares/certificateUpload')
app.use(references.cors());


// app.post("/viewProfile", formdata, async (req, res) => {
//   console.log(req.body);
//   const {_id}=req.body
//   const propertyOwner = await propertyOwnerController.viewPropertyOwnerProfile(_id);
//   if (propertyOwner) {
//     res.send({ match: true ,propertyOwner: propertyOwner});
//   } else {
//     res.send({ match: false });
//   }
// });
app.post("/addProperty", certificateUpload('PropertiesCertificates').single('certificate'), async (req, res) => {
  console.log('/////////////////////');
  console.log("body");
  console.log(req.body);
  console.log("file");
  console.log(req.file);
  const {propertyOwnerId,address,city}=req.body;
  const newProperty = await PropertyController.addProperty(req.body);
  console.log(newProperty);
  if (newProperty) {
    res.send({ added: true,newProperty:newProperty });
  } else {
    res.send({ added: false });
  }
});


module.exports = app;
