const { ProductModel } = require("../models/ProductModel");
require("dotenv").config();

// Post Product
const postClassified = async (req, res) => {
  const { name,description,category, image,location, postedAt,price } = req.body;
  const isProduct = await ProductModel.findOne({ name });
  if (isProduct) {
    res.send({ msg: "Product already exist,try another one" });
  }
      const new_product = new ProductModel({
        name,
        description,
        category,
        image,
        location,
        postedAt,
        price
      });

      await new_product.save();

      res.send({ new_product });  
};


const browseClassified = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const category = req.query.category || "All";
  const search = req.query.search || "";
  const sort = req.query.sort || "-postedAt";
  const filter = {};
  if (category !== "All") {
    filter.category = category;
  }
  if (search !== "") {
    filter.name = { $regex: search, $options: "i" };
  }

  const count = await ProductModel.countDocuments(filter);
  const data = await ProductModel.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  res.send({ data, count });
};




module.exports = {
  browseClassified,
  postClassified,

};
