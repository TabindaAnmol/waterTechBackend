console.log('Water Techonology')
const references = require("./References/customReferences");
const root = require("./rootPath");
const express = references.express();
const propertyOwnerAuthRoutes = require("./Routes/AuthRoutes/PropertyOwnerAuthRoutes");
const plumberAuthRoutes = require("./Routes/AuthRoutes/PlumberAuthRoutes");
const propertyOwnerRoutes=require('./Routes/UsersRoutes/PropertyOwnerRoutes')
const plumberRoutes=require('./Routes/UsersRoutes/PlumberRoutes')
const categoryRoute=require('./Routes/CategoryRoutes/CategoryRoute')
const productRoute=require('./Routes/ProductRoutes/ProductRoute')
const propertyRoutes=require('./Routes/PropertyRoutes/PropertyRoutes')

express.use(references.express.static(root + "/Public/Assets/Images"));
express.use(references.express.static(root + "/Public/Assets/Pdfs"));
express.use("/Profiles/PropertyOwners", references.express.static("PropertyOwners"));
express.use("/Profiles/Plumbers", references.express.static("Plumbers"));
express.use("/Categories", references.express.static("Categories"));
express.use("/Products", references.express.static("Products"));
express.use("/PropertiesCertificates", references.express.static("PropertiesCertificates"));

express.use('/propertyOwner/auth',propertyOwnerAuthRoutes);
express.use('/plumber/auth',plumberAuthRoutes);
express.use('/propertyOwner',propertyOwnerRoutes);
express.use('/plumber',plumberRoutes);
express.use('/categories',categoryRoute);
express.use('/products',productRoute);
express.use('/properties',propertyRoutes);

express.listen(8000);