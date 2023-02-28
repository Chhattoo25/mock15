const { Router } = require("express");
const {
  postClassified,
  browseClassified,
} = require("../controllers/ProductController");
const { ProductModel } = require("../models/ProductModel");

const ProductRouter = Router();
ProductRouter.post("/postClassified", postClassified);

ProductRouter.get("/getClassified", browseClassified);

// Delete the product
ProductRouter.delete("/deleteClassified/:id", async (req, res) => {
  const id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  res.send({ message: "Product deleted successfully" });
});



module.exports = { ProductRouter };
