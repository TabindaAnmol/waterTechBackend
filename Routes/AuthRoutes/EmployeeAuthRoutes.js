const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
app.use(references.cors());
const employeeController = require("../../Controllers/UserControllers/EmployeeController");
const certificateUpload = require("../../Middlewares/certificateUpload");

app.post(
  "/signup",
  certificateUpload("EmployeesCVs").single("cv"),
  async (req, res) => {
    console.log("//////////////////// createEmployee /////////////////////");
    console.log(req.body);

    const { name, email, phoneNumber, role } = req.body;
    const alreadyExist = await employeeController.isEmployeeLoggedin({
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
      const employee = await employeeController.createEmployee({
        name: name,
        phoneNumber: phoneNumber,
        role: role,
        email: email,
        cv: "/EmployeesCVs/" + req.file.filename,
      });
      if (employee) {
        res.send({ newEmployee: employee, save: true });
      } else {
        res.send({ save: false });
      }
    }
  }
);
app.post("/login", formdata, async (req, res) => {
  console.log("/////////////// isEmployeeLoggedin ////////////////");
  console.log(req.body);
  const { email, password } = req.body;
  const employee = await employeeController.isEmployeeLoggedin({
    email: email,
  });
  if (employee) {
    var isPasswordMatch;
    console.log(password.startsWith("$2a$"));
    if (password.startsWith("$2a$")) {
      isPasswordMatch = password === employee.password;
      console.log(isPasswordMatch);
    } else {
      isPasswordMatch = await references.bcrypt.compare(
        password,
        employee.password
      );
      console.log(isPasswordMatch);
    }

    if (isPasswordMatch) {
      references.jwt.sign(
        { employeeId: employee._id },
        references.jwtPrivateKey,
        { expiresIn: "10d" },
        function (err, token) {
          if (token) {
            console.log("token");
            console.log(token);
            res.send({
              match: true,
              loggedInEmployee: employee,
              token: token,
            });
          } else {
            console.log(err);
            res.send({
              match: true,
              loggedInEmployee: employee,
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
