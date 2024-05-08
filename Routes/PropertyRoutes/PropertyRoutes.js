const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const propertyController = require("../../Controllers/PropertyControllers/PropertyController");
const certificateUpload = require("../../Middlewares/certificateUpload");
app.use(references.cors());

app.post(
  "/addProperty",
  certificateUpload("PropertiesCertificates").single("certificate"),
  async (req, res) => {
    console.log("body");
    console.log(req.body);
    console.log("file");
    console.log(req.file);
    const {
      propertyOwnerId,
      address,
      city,
      state,
      country,
      zipcode,
      noOfLines,
    } = { ...req.body };
    const newProperty = await propertyController.addProperty({
      country: country,
      city: city,
      state: state,
      zipcode: zipcode,
      noOfLines: noOfLines,
      address: address,
      propertyOwnerId: propertyOwnerId,
      certificate: "/PropertiesCertificates/" + req.file.filename,
    });
    console.log(newProperty);
    if (newProperty) {
      res.send({ added: true, newProperty: newProperty });
    } else {
      res.send({ added: false });
    }
  }
);
app.post("/singleOwnerProperties", formdata, async (req, res) => {
  console.log(req.body);
  const {propertyOwnerId}=req.body
  const properties = await propertyController.viewSingleOwnerProperties(propertyOwnerId);
  console.log(properties)
  if (properties.length>0) {
    res.send({ match: true ,properties: properties});
  } else {
    res.send({ match: false,properties:[] });
  }
});
app.post("/singleOwnerPropertiesWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const {propertyOwnerId,status}=req.body
  const properties = await propertyController.viewSingleOwnerPropertiesWithStatus(propertyOwnerId,status);
  console.log(properties)
  if (properties.length>0) {
    res.send({ match: true ,properties: properties});
  } else {
    res.send({ match: false,properties:[] });
  }
});
app.post("/singlePropertyDetail", formdata, async (req, res) => {
  console.log(req.body);
  const {_id}=req.body
  const singlePropertyDetail = await propertyController.viewSinglePropertyDetail(_id);
  console.log(singlePropertyDetail)
  if (singlePropertyDetail) {
    res.send({ match: true ,singlePropertyDetail: singlePropertyDetail});
  } else {
    res.send({ match: false });
  }
});

module.exports = app;
