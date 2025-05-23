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
  console.log(req.body);
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
    if (isUpdated.modifiedCount >= 1) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  }
);
app.get("/viewAllPlumbers", formdata, async (req, res) => {
  console.log("//////////////////////////////////");
  const plumbers = await plumberController.viewAllPlumbers();
  console.log("/////////plumbers/////////");
  console.log(plumbers);
  if (plumbers.length > 0) {
    res.send({ plumbers: plumbers });
  } else {
    res.send({ plumbers: [] });
  }
});
app.post("/viewAllPlumbersWithStatus", formdata, async (req, res) => {
  const { status } = req.body;
  console.log("//////////////////////////////////");
  const plumbers = await plumberController.viewAllPlumbersWithStatus(status);
  console.log("/////////plumbers/////////");
  console.log(plumbers);
  if (plumbers.length > 0) {
    res.send({ plumbers: plumbers });
  } else {
    res.send({ plumbers: [] });
  }
});
app.post(
  "/viewSearchedPlumbers",
  formdata,
  async (req, res) => {
    const {searchValue} = req.body;
    console.log(searchValue);
    const searchPlumbers = await plumberController.viewSearchedPlumber({
      searchValue: searchValue,
    });
    console.log(searchPlumbers);
    if (searchPlumbers.length > 0) {
      res.send({ searchPlumbers: searchPlumbers });
    } else {
      res.send({ searchPlumbers: [] });
    }
  }
);

module.exports = app;
