const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const plumberController = require("../../Controllers/UserControllers/PlumberController");
const certificateUpload = require("../../Middlewares/certificateUpload");
app.use(references.cors());

app.post(
  "/signup",
  certificateUpload("PlumberLicences").single("licences"),
  async (req, res) => {
    console.log("/////////////////////////////");
    console.log(req.body);
    console.log("/////////////////////////////");

    const alreadyExist = await plumberController.plumberLogin(req.body.email);
    console.log(alreadyExist);
    if (
      alreadyExist &&
      typeof alreadyExist === "object" &&
      Object.keys(alreadyExist).length > 0
    ) {
      return res.status(429).send({ error: "This Email Id Already exist" });
    } else {
      req.body.licences = "/PlumberLicences/" + req.file.filename;
      const plumber = await plumberController.createPlumber(req.body);
      if (plumber) {
        res.send({ plumber: plumber, save: true });
      } else {
        res.send({ save: false });
      }
    }
  }
);

app.post("/login", formdata, async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const plumber = await plumberController.plumberLogin(email);
  console.log(plumber);
  if (plumber) {
    var isPasswordMatch;
    if (password.startsWith("$2a$")) {
      isPasswordMatch = password === plumber.password;
    } else {
      isPasswordMatch = await references.bcrypt.compare(
        password,
        plumber.password
      );
    }
    if (isPasswordMatch) {
      references.jwt.sign(
        { plumberId: plumber._id },
        references.jwtPrivateKey,
        { expiresIn: "10d" },
        function (err, token) {
          if (token) {
            res.send({
              match: true,
              loggedInPlumber: plumber,
              token: token,
            });
          } else {
            console.log(err);
            res.send({ match: true, loggedInPlumber: plumber, token: "" });
          }
        }
      );
    } else {
      res.send({ match: false, error: "Invalid Password!" });
    }
  } else {
    res.send({ match: false, error: "Invalid Credentials!" });
  }
});

module.exports = app;
