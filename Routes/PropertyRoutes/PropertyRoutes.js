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
  const { propertyOwnerId } = req.body;
  const properties = await propertyController.viewSingleOwnerProperties(
    propertyOwnerId
  );
  console.log(properties);
  if (properties.length > 0) {
    res.send({ match: true, properties: properties });
  } else {
    res.send({ match: false, properties: [] });
  }
});
app.post("/singleOwnerPropertiesWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId, status } = req.body;
  const properties =
    await propertyController.viewSingleOwnerPropertiesWithStatus(
      propertyOwnerId,
      status
    );
  console.log(properties);
  if (properties.length > 0) {
    res.send({ match: true, properties: properties });
  } else {
    res.send({ match: false, properties: [] });
  }
});
app.post("/singlePropertyDetail", formdata, async (req, res) => {
  console.log(req.body);
  const { _id } = req.body;
  const singlePropertyDetail =
    await propertyController.viewSinglePropertyDetail(_id);
  console.log(singlePropertyDetail);
  if (singlePropertyDetail) {
    res.send({ match: true, singlePropertyDetail: singlePropertyDetail });
  } else {
    res.send({ match: false });
  }
});
app.post("/viewAllPropertiesWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { status } = req.body;
  const properties = await propertyController.viewPropertiesWithStatus(status);
  console.log(properties);
  if (properties.length > 0) {
    res.send({ match: true, properties: properties });
  } else {
    res.send({ match: false, properties: [] });
  }
});
app.post("/updatePropertiesStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId, status } = req.body;
  let properties;
  if (status == 1) {
    properties = await propertyController.updatePropertiesStatus({
      _id: propertyId,
      status: status,
      approvedDate: req.body.approvedDate,
    });
  } else if (status == 2) {
    properties = await propertyController.updatePropertiesStatus({
      _id: propertyId,
      status: status,
    });
  }
  console.log(properties);
  if (properties.modifiedCount == 1) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});
app.get("/viewPropertiesWithNewLine", formdata, async (req, res) => {
  const properties = await propertyController.viewPropertiesWithNewLine();
  console.log(properties);
  if (properties.length > 0) {
    res.send({ match: true, properties: properties });
  } else {
    res.send({ match: false, properties: [] });
  }
});
app.get("/viewPropertiesWithSolutionLine", formdata, async (req, res) => {
  const properties = await propertyController.viewPropertiesWithSolutionLine();
  console.log(properties);
  if (properties.length > 0) {
    res.send({ match: true, properties: properties });
  } else {
    res.send({ match: false, properties: [] });
  }
});
app.post(
  "/viewSearchedPropertiesForPropertyOwner",
  formdata,
  async (req, res) => {
    const { searchValue, propertyOwnerId ,status} = req.body;
    console.log(searchValue, propertyOwnerId);
    const searchProperties = await propertyController.viewSearchedPropertiesForPropertyOwner({
      searchValue: searchValue,
      propertyOwnerId: propertyOwnerId,
      status:status
    });
    console.log(searchProperties);
    if (searchProperties.length > 0) {
      res.send({ searchProperties: searchProperties });
    } else {
      res.send({ searchProperties: [] });
    }
  }
);

module.exports = app;
