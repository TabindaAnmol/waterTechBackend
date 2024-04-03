const references=require("../../References/customReferences")
const app=references.express()
const formdata=references.formdata.none()
const {createPlumber} = require("../../Controllers/UserControllers/PlumberController");
app.use(references.cors())
app.post("/createPlumber",formdata,createPlumber)
module.exports=app;