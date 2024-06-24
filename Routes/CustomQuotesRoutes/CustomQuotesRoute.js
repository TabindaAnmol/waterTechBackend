const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");
const jobController = require("../../Controllers/JobControllers/JobController");
const propertyController = require("../../Controllers/PropertyControllers/PropertyController");
const lineController = require("../../Controllers/LineControllers/LineController");
const customQuoteController = require("../../Controllers/CustomQuoteControllers/CustomQuoteController");
const subscriberController = require("../../Controllers/UserControllers/SubscriberController");
const profileImageUpload = require("../../Middlewares/profileImageUpload");
app.use(references.cors());



app.post("/viewAllCustomQuotes", formdata, async (req, res) => {

  console.log("//////////////////////////////////");
  const customQuotes =
    await customQuoteController.viewAllCustomQuote();
  console.log("/////////custom quotes/////////");
  console.log(customQuotes);
  if (customQuotes.length > 0) {
    res.send({ customQuotes: customQuotes });
  } else {
    res.send({ customQuotes: [] });
  }
});


module.exports = app;
