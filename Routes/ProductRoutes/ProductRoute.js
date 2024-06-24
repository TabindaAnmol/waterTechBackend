const references = require("../../References/customReferences");
const rootPath = require("../../rootPath");
const ProductsController = require("../../Controllers/ProductControllers/ProductController");
const app = references.express();
const formdata = references.formdata.none();
const imageUpload = require("../../Middlewares/imageUpload");
app.use(references.cors());

app.post(
  "/addProduct",
  imageUpload("Products").single("ProductImage"),
  async (req, res) => {
    console.log("files");
    console.log(req.file);
    console.log("body");
    console.log(req.body);
    const newProduct = await ProductsController.addProduct({
      categoryId: req.body.categoryId,
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      productImage: "/Products/" + req.file.filename,
    });
    console.log(newProduct);
    if (newProduct) {
      res.send({ added: true });
    } else {
      res.send({ added: false });
    }
  }
);
app.post(
  "/updateProduct",
  imageUpload("Products").any("ProductImage"),
  async (req, res) => {
    var ProductImage = "";
    console.log("files");
    console.log(req.files);
    console.log("body");
    console.log(req.body);
    if (req.files.length > 0) {
      ProductImage = "/Products/" + req.files[0].filename;
    } else {
      ProductImage = req.body.ProductImageForUpdate;
    }
    console.log(ProductImage);
    const updateProduct = await ProductsController.updateProduct({
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
      productImage: ProductImage,
    });
    console.log(updateProduct);
    if (updateProduct) {
      res.send({ update: true });
    } else {
      res.send({ update: false });
    }
  }
);
// app.post("/deleteProduct", formdata, async (req, res) => {
//   console.log(JSON.parse(req.body.Product)._id);
//   const viewOrdersAgainstThisProduct =
//     await ordersController.viewOrdersForDeleteProduct(
//       JSON.parse(req.body.Product)._id
//     );
//   console.log(viewOrdersAgainstThisProduct);
//   if (viewOrdersAgainstThisProduct.length > 0) {
//     res.send({
//       error: "You can't delete this Product because it has some orders",
//     });
//   } else {
//     const delProduct = await ProductsController.deleteProduct(
//       JSON.parse(req.body.Product)._id
//     );
//     console.log(delProduct);
//     if (delProduct.modifiedCount == 1) {
//       const fileName = JSON.parse(req.body.Product).ProductImage;
//       console.log("//////////////////////////////////////////////////////");
//       console.log(rootPath);
//       console.log(fileName);
//       console.log("//////////////////////////////////////////////////////");
//       try {
//         references.fs.unlinkSync(`${rootPath}/Public/Assets/Images${fileName}`);
//         res.send({ delete: true });
//       } catch (err) {
//         console.log(err);
//       }
//     } else {
//       res.send({ delete: false });
//     }
//   }
// });
app.get("/viewAllProducts", formdata, async (req, res) => {
  const page = parseInt(req.query.page);
  const pageLimit = 10;
  const allProducts = await ProductsController.viewAllProducts(page, pageLimit);
  const totalPages = Math.ceil(allProducts.count / pageLimit);
  if (allProducts.result.length > 0) {
    res.send({
      allProducts: allProducts.result,
      totalPages: totalPages,
      pageLimit: pageLimit,
    });
  } else {
    res.send({ allProducts: [] });
  }
});

app.post("/viewSingleCategoryProducts", formdata, async (req, res) => {
  const { categoryId, page } = req.body;
  const pageLimit = 4;
  const singleCategoryProducts =
    await ProductsController.viewSingleCategoryProducts(
      categoryId,
      Number(page),
      pageLimit
    );
  const totalPages = Math.ceil(singleCategoryProducts.count / pageLimit);
  console.log(totalPages);

  if (singleCategoryProducts.result.length > 0) {
    res.send({
      singleCategoryProducts: singleCategoryProducts.result,
      totalPages: totalPages,
    });
  } else {
    res.send({ singleCategoryProducts: [] });
  }
});

app.post("/viewSingleProductDetail", formdata, async (req, res) => {
  const { productId } = req.body;
  const singleProductDetail = await ProductsController.viewSingleProductDetail(
    productId
  );
  if (singleProductDetail) {
    res.send({ match: true, singleProductDetail: singleProductDetail });
  } else {
    res.send({ match: false });
  }
});

app.post("/viewSearchedProducts", formdata, async (req, res) => {
  const { searchQuery } = req.body;
  const searchProducts = await ProductsController.viewSearchedProducts(
    searchQuery
  );
  if (searchProducts.length > 0) {
    res.send({ searchProducts: searchProducts });
  } else {
    res.send({ searchProducts: [] });
  }
});

module.exports = app;
