const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const lineController = require("../../Controllers/LineControllers/LineController");
app.use(references.cors());

app.post("/addNewLine", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId } = { ...req.body };
  console.log(propertyId);
  const newLine = await lineController.addNewLine(req.body);
  console.log(newLine);
  if (newLine) {
    res.send({ added: true, newLine: newLine });
  } else {
    res.send({ added: false });
  }
});
app.post("/singlePropertyLines", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId } = req.body;
  const lines = await lineController.viewSinglePropertyLines(propertyId);
  if (lines.length > 0) {
    res.send({ match: true, lines: lines });
  } else {
    res.send({ match: false, lines: [] });
  }
});
app.post("/propertyOwnerLines", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId } = req.body;
  const lines = await lineController.viewPropertyOwnerLines(propertyOwnerId);
  if (lines.length > 0) {
    res.send({ match: true, lines: lines });
  } else {
    res.send({ match: false, lines: [] });
  }
});
app.post("/lineDetail", formdata, async (req, res) => {
  console.log(req.body);
  const { lineId } = req.body;
  const line = await lineController.lineDetail(lineId);
  if (line) {
    res.send({ match: true, line: line });
  } else {
    res.send({ match: false, line: {} });
  }
});
app.post("/viewLinesWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { status } = req.body;
  const line = await lineController.viewLinesWithStatus(status);
  console.log(line);
  if (line.length > 0) {
    res.send({ match: true, line: line });
  } else {
    res.send({ match: false, line: [] });
  }
});
app.post("/assignSolutionToLine", formdata, async (req, res) => {
  req.body.solutions = JSON.parse(req.body.solutions);
  console.log(req.body);
  const line = await lineController.assignSolutionToLine(req.body);
  console.log(line);
  if (line.modifiedCount > 0) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});

module.exports = app;
