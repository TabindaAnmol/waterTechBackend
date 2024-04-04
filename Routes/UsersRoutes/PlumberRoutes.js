const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const plumberController = require("../../Controllers/UserControllers/PlumberController");
const profileImageUpload=require('../../Middlewares/profileImageUpload')
app.use(references.cors());


app.post("/viewProviderProfile", formdata, async (req, res) => {
  console.log(req.body);
  const provider = await providerController.viewProviderProfile(req.body._id);
  console.log(provider.orders);
  if (provider) {
    res.send({ provider: provider, match: true });
  } else {
    res.send({ match: false });
  }
});
app.post("/updateProviderProfile", formdata, async (req, res) => {
  console.log(req.body);
  const isUpdated = await providerController.updateProviderProfile({
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
  "/updateProviderProfileImage",
  profileImageUpload("Profiles").single("profileImage"),
  async (req, res) => {
    console.log("body");
    console.log(req.body);
    console.log("file");
    console.log(req.file);
    console.log("file name");
    console.log(req.file.filename);
    console.log("field name");
    console.log(req.file.fieldname);
    const isUpdated = await providerController.updateProviderProfile({
      id: req.body._id,
      profileImage: "/Profiles/" + req.file.filename,
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
