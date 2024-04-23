const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const notificationsController = require("../../Controllers/NotificationControllers/NotificationsController");
app.use(references.cors());

app.post("/createPropertyOwnerNotification", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId, plumberId, title, body } = { ...req.body };
  console.log(title, body);
  const newNotification = await notificationsController.createPropertyOwnerNotification(req.body);
  console.log(newNotification);
  if (newNotification) {
    res.send({ added: true, newNotification: newNotification });
  } else {
    res.send({ added: false });
  }
});
app.post("/createPlumberNotification", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId, plumberId, title, body } = { ...req.body };
  console.log(title, body);
  const newNotification = await notificationsController.createPlumberNotification(req.body);
  console.log(newNotification);
  if (newNotification) {
    res.send({ added: true, newNotification: newNotification });
  } else {
    res.send({ added: false });
  }
});


module.exports = app;
