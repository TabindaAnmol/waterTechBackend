console.log('Water Techonology')
const references = require("./References/customReferences");
const root = require("./rootPath");
const express = references.express();
const propertyOwnerAuthRoutes = require("./Routes/AuthRoutes/PropertyOwnerAuthRoutes");
const plumberAuthRoutes = require("./Routes/AuthRoutes/PlumberAuthRoutes");
const adminAuthRoutes = require("./Routes/AuthRoutes/AdminAuthRoutes");
const propertyOwnerRoutes=require('./Routes/UsersRoutes/PropertyOwnerRoutes')
const plumberRoutes=require('./Routes/UsersRoutes/PlumberRoutes')
const categoryRoute=require('./Routes/CategoryRoutes/CategoryRoute')
const productRoute=require('./Routes/ProductRoutes/ProductRoute')
const propertyRoutes=require('./Routes/PropertyRoutes/PropertyRoutes')
const lineRoutes=require('./Routes/LineRoutes/LineRoutes')
const jobRoutes=require('./Routes/JobRoutes/JobRoutes')
const cartRoute=require('./Routes/CartRoutes/CartRoute')
const orderRoute=require('./Routes/OrderRoutes/OrderRoute')
const paymentRoute=require('./Routes/PaymentRoutes/PaymentRoute')
const notificationRoutes=require('./Routes/NotificationRoutes/NotificationRoutes')

express.use(references.express.static(root + "/Public/Assets/Images"));
express.use(references.express.static(root + "/Public/Assets/Pdfs"));
express.use("/Profiles/PropertyOwners", references.express.static("PropertyOwners"));
express.use("/Profiles/Plumbers", references.express.static("Plumbers"));
express.use("/Categories", references.express.static("Categories"));
express.use("/Products", references.express.static("Products"));
express.use("/PropertiesCertificates", references.express.static("PropertiesCertificates"));

express.use('/propertyOwner/auth',propertyOwnerAuthRoutes);
express.use('/plumber/auth',plumberAuthRoutes);
express.use('/admin/auth',adminAuthRoutes);
express.use('/propertyOwner',propertyOwnerRoutes);
express.use('/plumber',plumberRoutes);

express.use('/categories',categoryRoute);
express.use('/products',productRoute);
express.use('/cart',cartRoute);
express.use('/orders',orderRoute);

express.use('/properties',propertyRoutes);
express.use('/lines',lineRoutes);
express.use('/jobs',jobRoutes);

express.use('/notifications',notificationRoutes);

express.use('/payment',paymentRoute);

express.listen(8000);
// placeholder if run in browser
// express.get('/', function (req, res) {
//     // res.write("<div style='text-align:center;margin-top: 100px;'><img src='https://bestanimations.com/media/loading-gears/2074796765loading-gears-animation-3.gif' width='150'/></div>\n");
//     res.write("<h1 style='display: flex;align-items: center;justify-content: center;height: 100%;'>__Application is Up and Running__</h1>\n");
//     // res.write("<h2 style='text-align:center;'>Developed by <a href='https://www.linkedin.com/in/m-azhar-m/' target='_blank'>Azhar-M</a></h2>");
//     res.end()
// });