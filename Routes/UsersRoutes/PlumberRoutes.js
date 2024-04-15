const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const plumberController = require("../../Controllers/UserControllers/PlumberController");
const profileImageUpload = require("../../Middlewares/profileImageUpload");
app.use(references.cors());

app.post("/viewProfile", formdata, async (req, res) => {
  console.log("//////////////////////////////////");
  console.log(req.body);
  console.log("//////////////////////////////////");

  const plumber = await plumberController.viewPlumberProfile(req.body._id);
  if (plumber) {
    res.send({ plumber: plumber, match: true });
  } else {
    res.send({ match: false });
  }
});
app.post("/updateProfile", formdata, async (req, res) => {
  const isUpdated = await plumberController.updatePlumberProfile(req.body);
  console.log(isUpdated);
  if (isUpdated.modifiedCount >= 1) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});
app.post(
  "/updateProfileImage",
  profileImageUpload("Plumbers").single("profileImage"),
  async (req, res) => {
    console.log("body");
    console.log(req.body);
    console.log("file");
    console.log(req.file);
    console.log("file name");
    console.log(req.file.filename);
    console.log("field name");
    console.log(req.file.fieldname);
    const isUpdated = await plumberController.updatePlumberProfile({
      id: req.body._id,
      profileImage: "/Profiles/Plumbers/" + req.file.filename,
    });
    console.log(isUpdated.modifiedCount>=1);
    if (isUpdated) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  }
);

module.exports = app;
