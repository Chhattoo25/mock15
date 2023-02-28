const mongoose = require("mongoose");
require("dotenv").config();
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedAt: {
      type: String,
    },
    price: {

      type: String,
    },
  },
  { timestamps: true }
);

const ProductModel = new mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
