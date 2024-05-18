const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
app.use(references.cors());
const subscriberController = require("../../Controllers/UserControllers/SubscriberController");
const certificateUpload = require("../../Middlewares/certificateUpload");
const { json } = require("express");

app.post("/signup", formdata, async (req, res) => {
  console.log("//////////////////// createSubscriber /////////////////////");
  console.log(req.body);
  const { name, email, phoneNumber, portfolio, message } = req.body;
  req.body.portfolio=JSON.parse(req.body.portfolio)
  const alreadyExist = await subscriberController.isSubscriberLoggedin({
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
    const subscriber = await subscriberController.createSubscriber(req.body);
    if (subscriber) {
      res.send({ newSubscriber: subscriber, save: true });
    } else {
      res.send({ save: false });
    }
  }
});
app.post("/login", formdata, async (req, res) => {
  console.log("/////////////// isSubscriberLoggedin ////////////////");
  console.log(req.body);
  const { email, password } = req.body;
  const subscriber = await subscriberController.isSubscriberLoggedin({
    email: email,
  });
  if (subscriber) {
    var isPasswordMatch;
    console.log(password.startsWith("$2a$"));
    if (password.startsWith("$2a$")) {
      isPasswordMatch = password === subscriber.password;
      console.log(isPasswordMatch);
    } else {
      isPasswordMatch = await references.bcrypt.compare(
        password,
        subscriber.password
      );
      console.log(isPasswordMatch);
    }

    if (isPasswordMatch) {
      references.jwt.sign(
        { subscriberId: subscriber._id },
        references.jwtPrivateKey,
        { expiresIn: "10d" },
        function (err, token) {
          if (token) {
            console.log("token");
            console.log(token);
            res.send({
              match: true,
              loggedInSubscriber: subscriber,
              token: token,
            });
          } else {
            console.log(err);
            res.send({
              match: true,
              loggedInSubscriber: subscriber,
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
