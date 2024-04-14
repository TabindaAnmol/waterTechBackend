const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");
const profileImageUpload=require('../../Middlewares/profileImageUpload')
app.use(references.cors());


app.post("/viewProfile", formdata, async (req, res) => {
  console.log(req.body);
  const {_id}=req.body
  const propertyOwner = await propertyOwnerController.viewPropertyOwnerProfile(_id);
  if (propertyOwner) {
    res.send({ match: true ,propertyOwner: propertyOwner});
  } else {
    res.send({ match: false });
  }
});
app.post("/updateProfile", formdata, async (req, res) => {
  console.log(req.body);
  const isUpdated = await propertyOwnerController.updatePropertyOwnerProfile({
    id: req.body._id,
    name: req.body.name,
    societiesId: JSON.parse(req.body.societiesId),
    address: req.body.address,
  });
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
    const isUpdated = await propertyOwnerController.updatePropertyOwnerProfile({
      id: req.body._id,
      profileImage: "/Profiles/PropertyOwner" + req.file.filename,
    });
    console.log(isUpdated);
    if (isUpdated) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  }
);

module.exports = app;
