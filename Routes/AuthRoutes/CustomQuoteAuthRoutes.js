const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
app.use(references.cors());
const subscriberController = require("../../Controllers/UserControllers/SubscriberController");
const customQuoteController = require("../../Controllers/CustomQuoteControllers/CustomQuoteController");
const certificateUpload = require("../../Middlewares/certificateUpload");
const { json } = require("express");

app.post("/signup", formdata, async (req, res) => {
  console.log("//////////////////// createSubscriber /////////////////////");
  console.log(req.body);
  const { firstName, email, phoneNumber, lastName, message } = req.body;
  const alreadyExist = await customQuoteController.isCustomQuoteLoggedin({
    email: email,
  });
  console.log(alreadyExist);
  if (
    alreadyExist &&
    typeof alreadyExist === "object" &&
    Object.keys(alreadyExist).length > 0
  ) {
    return res.send({ message: "This email already in use" });
  } else {
    const customQuote = await customQuoteController.createCustomQuote(req.body);
    if (customQuote) {
      res.send({ newCustomQuote: customQuote, save: true });
    } else {
      res.send({ save: false });
    }
  }
});
app.post("/login", formdata, async (req, res) => {
  console.log("/////////////// isSubscriberLoggedin ////////////////");
  console.log(req.body);
  const { email, password } = req.body;
  const customQuote = await customQuoteController.isCustomQuoteLoggedin({
    email: email,
  });
  if (customQuote) {
    var isPasswordMatch;
    console.log(password.startsWith("$2a$"));
    if (password.startsWith("$2a$")) {
      isPasswordMatch = password === customQuote.password;
      console.log(isPasswordMatch);
    } else {
      isPasswordMatch = await references.bcrypt.compare(
        password,
        customQuote.password
      );
      console.log(isPasswordMatch);
    }

    if (isPasswordMatch) {
      references.jwt.sign(
        { subscriberId: customQuote._id },
        references.jwtPrivateKey,
        { expiresIn: "10d" },
        function (err, token) {
          if (token) {
            console.log("token");
            console.log(token);
            res.send({
              match: true,
              loggedInCustomQuote: customQuote,
              token: token,
            });
          } else {
            console.log(err);
            res.send({
              match: true,
              loggedInCustomQuote: customQuote,
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
