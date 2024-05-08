const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const adminController = require("../../Controllers/UserControllers/AdminController");
app.use(references.cors());


app.post("/signup", formdata, async (req, res) => {
  console.log('/////////////////////////////')
  console.log(req.body)
  console.log('/////////////////////////////')

  const alreadyExist = await adminController.login(req.body.email);
  console.log(alreadyExist);
  if (
    alreadyExist &&
    typeof alreadyExist === "object" &&
    Object.keys(alreadyExist).length > 0
  ) {
    return res.status(429).send({ error: "This Email Id Already exist" });
  } else {
    const admin = await adminController.createadmin(req.body);
    if (admin) {
      res.send({ admin: admin, save: true });
    } else {
      res.send({ save: false });
    }
  }
});


app.post("/login", formdata, async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const admin = await adminController.login(email);
  console.log(admin)
  if (admin) {
    var isPasswordMatch;
    if (password.startsWith("$2a$")) {
      isPasswordMatch = password === admin.password;
    } else {
      isPasswordMatch = await references.bcrypt.compare(
        password,
        admin.password
      );
    }
    if (isPasswordMatch) {
      references.jwt.sign(
        { adminId: admin._id },
        references.jwtPrivateKey,
        { expiresIn: "10d" },
        function (err, token) {
          if (token) {
            res.send({
              match: true,
              loggedInAdmin: admin,
              token: token,
            });
          } else {
            console.log(err);
            res.send({ match: true, loggedInAdmin: admin, token: "" });
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
