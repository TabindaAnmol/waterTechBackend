const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
app.use(references.cors());
const propertyOwnerController = require("../../Controllers/UserControllers/PropertyOwnerController");

app.post("/signup", formdata, async (req, res) => {
  console.log("//////////////////// createPropertyOwner /////////////////////");
  console.log(req.body);
  const { name, email, password } = req.body;
  const alreadyExist = await propertyOwnerController.isPropertyOwnerLoggedin({
    email: email,
  });
  console.log(alreadyExist);
  if (
    alreadyExist &&
    typeof alreadyExist === "object" &&
    Object.keys(alreadyExist).length > 0
  ) {
    return res.status(429).send({ message: "This email already in use" });
  } else {
    const propertyOwner = await propertyOwnerController.createPropertyOwner(
      req.body
    );
    if (propertyOwner) {
      res.send({ newPropertyOwner: propertyOwner, save: true });
    } else {
      res.send({ save: false });
    }
  }
});
app.post("/login", formdata, async (req, res) => {
  console.log("/////////////// isPropertyOwnerLoggedin ////////////////");
  console.log(req.body);
  const { email, password } = req.body;
  const propertyOwner = await propertyOwnerController.isPropertyOwnerLoggedin({
    email: email,
  });
  if (propertyOwner) {
    var isPasswordMatch;
    console.log(password.startsWith("$2a$"));
    if (password.startsWith("$2a$")) {
      isPasswordMatch = password === propertyOwner.password;
      console.log(isPasswordMatch);
    } else {
      isPasswordMatch = await references.bcrypt.compare(
        password,
        propertyOwner.password
      );
      console.log(isPasswordMatch);
    }

    if (isPasswordMatch) {
      references.jwt.sign(
        { propertyOwnerId: propertyOwner._id },
        references.jwtPrivateKey,
        { expiresIn: "10d" },
        function (err, token) {
          if (token) {
            console.log("token");
            console.log(token);
            res.send({
              match: true,
              loggedInPropertyOwner: propertyOwner,
              token: token,
            });
          } else {
            console.log(err);
            res.send({
              match: true,
              loggedInPropertyOwner: propertyOwner,
              token: "",
            });
          }
        }
      );
    } else {
      res.send({ match: false, message: "invalid Password" });
    }
  } else {
    res.send({ match: false, message: "invalid credentails" });
  }
});
module.exports = app;
