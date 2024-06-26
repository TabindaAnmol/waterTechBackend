const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");
const jobController = require("../../Controllers/JobControllers/JobController");
const propertyController = require("../../Controllers/PropertyControllers/PropertyController");
const lineController = require("../../Controllers/LineControllers/LineController");
const employeeController = require("../../Controllers/UserControllers/EmployeeController");
const profileImageUpload = require("../../Middlewares/profileImageUpload");
app.use(references.cors());


app.post("/updateProfile", formdata, async (req, res) => {
  console.log("/////////////////////");
  console.log(req.body);
  const isUpdated = await employeeController.updateEmployeeProfile(
    req.body
  );
  console.log(isUpdated);
  if (isUpdated) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});
app.post("/viewAllEmployeesWithStatus", formdata, async (req, res) => {
  const { status } = req.body;
  console.log("//////////////////////////////////");
  const employees =
    await employeeController.viewAllEmployeesWithStatus(status);
  console.log("/////////employees/////////");
  console.log(employees);
  if (employees.length > 0) {
    res.send({ employees: employees });
  } else {
    res.send({ employees: [] });
  }
});


module.exports = app;
