const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const jobController = require("../../Controllers/JobControllers/JobController");
app.use(references.cors());

app.post("/postJob", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyId,plumberId,date,time,jobInstructions } = { ...req.body };
  console.log(propertyId)
  const newJob = await jobController.createJob(req.body);
  console.log(newJob);
  if (newJob) {
    res.send({ added: true, newJob: newJob });
  } else {
    res.send({ added: false });
  }
});
app.post("/singlePropertyOwnerJobsWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId } = req.body;
  const jobs = await jobController.viewSinglePropertyOwnerJobsWithStatus(propertyOwnerId);
  if (jobs.length > 0) {
    res.send({ match: true, jobs: lines });
  } else {
    res.send({ match: false, jobs: [] });
  }
});

module.exports = app;
