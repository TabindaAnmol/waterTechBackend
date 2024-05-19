const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const profileImageUpload = require("../../Middlewares/profileImageUpload");
const adminController = require("../../Controllers/UserControllers/AdminController");
const plumberController = require("../../Controllers/UserControllers/PlumberController");
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");
const employeeController = require("../../Controllers/UserControllers/EmployeeController");
const subscriberController = require("../../Controllers/UserControllers/SubscriberController");
app.use(references.cors());

app.post("/updateProfile", formdata, async (req, res) => {
  const updated = await adminController.updateAdminProfile(req.body);
  console.log(updated);
  if (updated) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});

app.get("/viewAdminDashboardStats", formdata, async (req, res) => {
  console.log("/////////Admin stats/////////");
  const plumbers = await plumberController.activePlumbers();
  const propertyOwners = await propertyOwnerController.activePropertyOwners();
  const employees = await employeeController.activeEmployees();
  const subscribers = await subscriberController.activeSubscribers();
   const stats =  {
    plumbers: plumbers || 0,
    propertyOwners: propertyOwners || 0,
    employees: employees || 0,
    subscribers: subscribers || 0,
  };
 res.send(stats);
});

module.exports = app;
