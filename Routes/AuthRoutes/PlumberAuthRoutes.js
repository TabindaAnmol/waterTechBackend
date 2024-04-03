const references=require("../../References/customReferences")
const app=references.express()
const formdata=references.formdata.none()
const {createUser} = require("../../Controllers/UserController");
app.use(references.cors())
app.post("/createUser",formdata,createUser)
module.exports=app;