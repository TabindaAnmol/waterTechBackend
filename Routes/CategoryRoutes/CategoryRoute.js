const references = require("../../References/customReferences");
const categoriesController = require("../../Controllers/CategoriesControllers/CategoryController");
const app = references.express();
const formdata = references.formdata.none();
const imageUpload = require("../../Middlewares/imageUpload");
app.use(references.cors());

app.post(
  "/addCategories",
  imageUpload("Categories").single("categoryImage"),
  async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const newCategory = await categoriesController.addCategories({
      title: req.body.title,
      categoryImage: "/Categories/" + req.file.filename,
    });
    console.log(newCategory);
    if (newCategory) {
      res.send({ added: true });
    } else {
      res.send({ added: false });
    }
  }
);
app.post(
  "/updateCategory",
  imageUpload("Categories").any("categoryImage"),
  async (req, res) => {
    console.log(req.files);
    // let imageParts=req.body.categoryImage.split('/');
    // let image=`/${imageParts[1]}/${imageParts[2]}`
    let obj = {};
    if (req.files.length > 0) {
      obj = {
        _id: req.body.categoryId,
        title: req.body.title,
        categoryImage: (image = "/Categories/" + req.files[0].filename),
      };
    } else {
      obj = {
        _id: req.body.categoryId,
        title: req.body.title,
      };
    }
    console.log(req.body);
    const updateCategory = await categoriesController.updateCategories(obj);
    if (updateCategory.modifiedCount == 1) {
      res.send({ update: true });
    } else {
      res.send({ update: false });
    }
  }
);
app.get("/viewAllCategories", formdata, async (req, res) => {
  const allCategories = await categoriesController.viewAllCategories();
  console.log(allCategories);
  if (allCategories.length > 0) {
    res.send({ allCategories: allCategories });
  } else {
    res.send({ allCategories: [] });
  }
});
app.post("/deleteCategory", formdata, async (req, res) => {
  // var counter=0
//   console.log(req.body)
//   const {_id}=req.body
//   console.log(_id)
//   const providers=await providerController.viewAllProviders()
//   console.log(providers)
//   for (let provider of providers) {
//     if(provider.categoryId._id==_id){
//       counter=counter+1;
//       break;
//     }
//   }
//   if(counter>0){
//     console.log('not be able')
//     res.send({ update: false,message:"You can't able to delete category because " })
//   }
//   else{
//  const delCategory = await categoriesController.deleteCategories(req.body);
//   console.log(delCategory);
//   if (delCategory.deletedCount == 1) {
//     res.send({ update: true });
//   }else{
//     res.send({ update: false ,message: 'Something went wrong'})
//   }
//   }


const delCategory = await categoriesController.deleteCategories(req.body);
console.log(delCategory);
if (delCategory.deletedCount == 1) {
  res.send({ update: true });
}else{
  res.send({ update: false ,message: 'Something went wrong'})
}
});

module.exports = app;
