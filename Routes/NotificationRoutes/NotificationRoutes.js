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
app.post("/fetchPropertyOwnerNotification", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId } = req.body;
  console.log(title, body);
  const notifications = await notificationsController.propertyOwnerNotifications(propertyOwnerId);
  console.log(notifications);
  if (notifications.length>0) {
    res.send({ match: true, notifications: notifications });
  } else {
    res.send({ match: false,notifications: [] });
  }
});
app.post("/fetchPlumberNotification", formdata, async (req, res) => {
  console.log(req.body);
  const { plumberId } = req.body;
  const notifications = await notificationsController.plumberNotifications(plumberId);
  console.log(notifications);
  if (notifications.length>0) {
    res.send({ match: true, notifications: notifications });
  } else {
    res.send({ match: false,notifications: [] });
  }
});


module.exports = app;
