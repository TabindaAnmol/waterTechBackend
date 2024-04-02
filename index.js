console.log('Water Techonology')
const references = require("./References/customReferences");
const root = require("./rootPath");
const express = references.express();
const userRoutes = require('./Routes/UsersRoutes')
express.use(userRoutes);
express.listen(8000);