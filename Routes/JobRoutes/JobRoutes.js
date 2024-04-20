const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const jobController = require("../../Controllers/JobControllers/JobController");
app.use(references.cors());

app.post("/postJob", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId } = { ...req.body };
  console.log(propertyId)
  const newLine = await jobController.createJob(req.body);
  console.log(newLine);
  if (newLine) {
    res.send({ added: true, newLine: newLine });
  } else {
    res.send({ added: false });
  }
});
app.post("/singlePropertyOwnerJobsWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId } = req.body;
  const lines = await jobController.viewSinglePropertyOwnerJobsWithStatus(propertyId);
  if (lines.length > 0) {
    res.send({ match: true, lines: lines });
  } else {
    res.send({ match: false, lines: [] });
  }
});

module.exports = app;
