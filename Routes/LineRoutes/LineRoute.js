const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const lineController = require("../../Controllers/LineControllers/LineController");
app.use(references.cors());

app.post("/singlePropertyLines", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId } = req.body;
  const lines = await lineController.viewSinglePropertyLines(propertyOwnerId);
  if (properties.length > 0) {
    res.send({ match: true, lines: lines });
  } else {
    res.send({ match: false, lines: [] });
  }
});
app.post("/addNewLine", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId } = { ...req.body };
  console.log(propertyId)
  const newLine = await lineController.addNewLine(req.body);
  console.log(newLine);
  if (newLine) {
    res.send({ added: true, newLine: newLine });
  } else {
    res.send({ added: false });
  }
});

module.exports = app;
