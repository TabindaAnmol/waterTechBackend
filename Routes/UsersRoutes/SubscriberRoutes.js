const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");
const jobController = require("../../Controllers/JobControllers/JobController");
const propertyController = require("../../Controllers/PropertyControllers/PropertyController");
const lineController = require("../../Controllers/LineControllers/LineController");
const employeeController = require("../../Controllers/UserControllers/EmployeeController");
const subscriberController = require("../../Controllers/UserControllers/SubscriberController");
const profileImageUpload = require("../../Middlewares/profileImageUpload");
app.use(references.cors());


app.post("/updateProfile", formdata, async (req, res) => {
  console.log("/////////////////////");
  console.log(req.body);
  const isUpdated = await subscriberController.updateSubscriberProfile(
    req.body
  );
  console.log(isUpdated);
  if (isUpdated) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});
app.post("/viewAllSubscribersWithStatus", formdata, async (req, res) => {
  const { status } = req.body;
  console.log("//////////////////////////////////");
  const subscribers =
    await subscriberController.viewAllSubscriberWithStatus(status);
  console.log("/////////subscribers/////////");
  console.log(subscribers);
  if (subscribers.length > 0) {
    res.send({ subscribers: subscribers });
  } else {
    res.send({ subscribers: [] });
  }
});


module.exports = app;
