const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");
const jobController = require("../../Controllers/JobControllers/JobController");
const propertyController = require("../../Controllers/PropertyControllers/PropertyController");
const lineController = require("../../Controllers/LineControllers/LineController");
const profileImageUpload = require("../../Middlewares/profileImageUpload");
app.use(references.cors());

app.post("/viewProfile", formdata, async (req, res) => {
  console.log(req.body);
  const { _id } = req.body;
  const propertyOwner = await propertyOwnerController.viewPropertyOwnerProfile(
    _id
  );
  if (propertyOwner) {
    res.send({ match: true, propertyOwner: propertyOwner });
  } else {
    res.send({ match: false });
  }
});
app.post("/updateProfile", formdata, async (req, res) => {
  console.log("/////////////////////");
  console.log(req.body);
  const isUpdated = await propertyOwnerController.updatePropertyOwnerProfile(
    req.body
  );
  console.log(isUpdated);
  if (isUpdated) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});
app.post(
  "/updateProfileImage",
  profileImageUpload("PropertyOwners").single("profileImage"),
  async (req, res) => {
    console.log("body");
    console.log(req.body);
    console.log("file");
    console.log(req.file);
    console.log("file name");
    console.log(req.file.filename);
    console.log("field name");
    console.log(req.file.fieldname);
    const { _id } = req.body;
    const isUpdated = await propertyOwnerController.updatePropertyOwnerProfile({
      _id: _id,
      profileImage: "/Profiles/PropertyOwners/" + req.file.filename,
    });
    console.log(isUpdated);
    if (isUpdated) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  }
);
app.get("/viewAllPropertyOwner", formdata, async (req, res) => {
  console.log("//////////////////////////////////");
  const propertyOwner = await propertyOwnerController.viewAllPropertyOwner();
  console.log("/////////propertyOwner/////////");
  console.log(propertyOwner);
  if (propertyOwner.length > 0) {
    res.send({ propertyOwner: propertyOwner });
  } else {
    res.send({ propertyOwner: [] });
  }
});
app.post("/propertyOwnerStats", formdata, async (req, res) => {
  const { propertyOwnerId } = req.body;
  let stats = await jobController.propertyOwnerJobStats(propertyOwnerId);
  const propertyCount = await propertyController.viewSingleOwnerPropertiesCount(
    propertyOwnerId
  );
  const lineCount = await lineController.viewPropertyOwnerLinesCount(
    propertyOwnerId
  );
  stats.properties = propertyCount;
  stats.lines = lineCount;
  res.send(stats);
});

module.exports = app;
